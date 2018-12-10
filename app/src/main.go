package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/sirupsen/logrus"

	. "github.com/handler"
)

// Y - Related to Youtube
// rq - request, rp - respond

func Routes() *chi.Mux {
	logger := logrus.New()
	logger.Formatter = &logrus.JSONFormatter{
		DisableTimestamp: false,
		PrettyPrint:      true,
	}
	Route := chi.NewRouter()
	Route.Use(middleware.RequestID)
	Route.Use(NewStructuredLogger(logger))
	Route.Use(middleware.Recoverer)

	Route.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hopes And Dreams, Home"))
	})
	Route.Route("/api", func(r chi.Router) {
		r.Mount("/youtube", YResources{}.Routes())
		r.Mount("/deez", DeezResource{}.Routes())
		r.Mount("/download", DownloadRoute())
	})

	return Route
}

func main() {
	router := Routes()

	walkFunc := func(method string, route string, handler http.Handler,
		middlewares ...func(http.Handler) http.Handler) error {
		log.Printf("%s %s\n", method, route)
		return nil
	}
	if err := chi.Walk(router, walkFunc); err != nil {
		log.Panicf("Logging err:%s\n", err.Error())
	}

	http.ListenAndServe(":8888", router)
}

func NewStructuredLogger(logger *logrus.Logger) func(next http.Handler) http.Handler {
	return middleware.RequestLogger(&StructuredLogger{logger})
}

type StructuredLogger struct {
	Logger *logrus.Logger //*Logger
}

func (l *StructuredLogger) NewLogEntry(r *http.Request) middleware.LogEntry {
	entry := &StructuredLoggerEntry{Logger: logrus.NewEntry(l.Logger)}
	logFields := logrus.Fields{}
	headerList := ""

	logFields["ts"] = time.Now().UTC().Format(time.RFC1123)

	if reqID := middleware.GetReqID(r.Context()); reqID != "" {
		logFields["req_id"] = reqID
	}
	scheme := "http"
	if r.TLS != nil {
		scheme = "https"
	}
	for k, v := range r.Header {
		headerList += fmt.Sprintf("H: %q, V: %q ", k, v)
	}
	logFields["req_headers"] = headerList
	logFields["http_method"] = r.Method
	logFields["uri"] = fmt.Sprintf("%s://%s%s", scheme, r.Host, r.RequestURI)

	entry.Logger = entry.Logger.WithFields(logFields)

	entry.Logger.Infoln("request started")

	// f, err := os.OpenFile("testlogfile", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	// if err != nil {
	// 	log.Fatalf("error opening file: %v", err)
	// }
	// defer f.Close()
	// fmt.Fprintf(f, "-------------\n")
	// for tag, v := range logFields {
	// 	fmt.Fprintf(f, "[%s]:%s  ", tag, v)
	// }
	// fmt.Fprintf(f, "\n")

	return entry
}

type StructuredLoggerEntry struct {
	Logger logrus.FieldLogger
}

func (l *StructuredLoggerEntry) Write(status, bytes int, elapsed time.Duration) {
	l.Logger = l.Logger.WithFields(logrus.Fields{
		"resp_status": status, "resp_bytes_length": bytes,
		"resp_elapsed_ms": float64(elapsed.Nanoseconds()) / 1000000.0,
	})

	l.Logger.Infoln("request complete")
}

func (l *StructuredLoggerEntry) Panic(v interface{}, stack []byte) {
	l.Logger = l.Logger.WithFields(logrus.Fields{
		"stack": string(stack),
		"panic": fmt.Sprintf("%+v", v),
	})
}

// Helper methods used by the application to get the request-scoped
// logger entry and set additional fields between handlers.
//
// This is a useful pattern to use to set state on the entry as it
// passes through the handler chain, which at any point can be logged
// with a call to .Print(), .Info(), etc.

func GetLogEntry(r *http.Request) logrus.FieldLogger {
	entry := middleware.GetLogEntry(r).(*StructuredLoggerEntry)
	return entry.Logger
}

func LogEntrySetField(r *http.Request, key string, value interface{}) {
	if entry, ok := r.Context().Value(middleware.LogEntryCtxKey).(*StructuredLoggerEntry); ok {
		entry.Logger = entry.Logger.WithField(key, value)
	}
}

func LogEntrySetFields(r *http.Request, fields map[string]interface{}) {
	if entry, ok := r.Context().Value(middleware.LogEntryCtxKey).(*StructuredLoggerEntry); ok {
		entry.Logger = entry.Logger.WithFields(fields)
	}
}
