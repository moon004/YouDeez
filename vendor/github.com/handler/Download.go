package handler

import (
	"fmt"
	"net/http"
	"net/url"
	"os/exec"
	"regexp"
	"sync"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/render"
)

func DownloadRoute() chi.Router {

	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Get("/", route)
	r.Options("/", route)

	return r
}

func route(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Download YouDeez")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "access-control-allow-origin")
	DeezReg := regexp.MustCompile(`^\d+$`)
	YouReg := regexp.MustCompile(`[\w-]{11}`)
	queryValues := r.URL.Query()
	query := queryValues.Get("q")
	q := url.QueryEscape(query)
	switch {
	case DeezReg.MatchString(q):
		DownloadDeez(w, r)
	case YouReg.MatchString(q):
		DownloadYou(w, r)
	default:
		w.Write([]byte("Unknown Media ID"))
	}

}

// DownloadYou handles the youtube audio downloader.
func DownloadYou(w http.ResponseWriter, r *http.Request) {
	fmt.Println("DownLoad You")
	queryValue := r.URL.Query()
	query := queryValue.Get("q")
	q := url.QueryEscape(query)
	YouExe(q, w, r)
	fmt.Fprintf(w, "Done %s", q)
}

// YouExe go routine for youtube-dl execution
func YouExe(q string, w http.ResponseWriter, r *http.Request) {
	fmt.Printf("Fetching %s \n", q)
	cmd := exec.Command("./youtube-dl", "-f", "140", "-o", "-", "https://www.youtube.com/watch?v="+q)
	cmd.Stdout = w // streaming occurs here
	//cmd.Stdout = os.Stdout
	err := cmd.Start()
	if err != nil {
		render.JSON(w, r, ErrDuringStream(err))
	}
	err = cmd.Wait()
	if err != nil {
		render.JSON(w, r, ErrDuringWait(err))
	}
}

// DownloadDeez handle the deezer audio download
func DownloadDeez(w http.ResponseWriter, r *http.Request) {
	fmt.Println("DownLoad Deez")
	queryValues := r.URL.Query()
	query := queryValues.Get("q")
	q := url.QueryEscape(query)
	var wg sync.WaitGroup

	wg.Add(1)
	go DeezExe(q, w, r)
	wg.Wait()
	fmt.Fprintf(w, "Done")
}

// DeezExe go routine for Deezer decrypt execution
func DeezExe(q string, w http.ResponseWriter, r *http.Request) {
	cmd := exec.Command(
		"./deezer-dl",
		"--id", q)
	cmd.Stdout = w
	err := cmd.Start()
	if err != nil {
		render.JSON(w, r, ErrDuringStream(err))
	}
	err = cmd.Wait()
	if err != nil {
		render.JSON(w, r, ErrDuringWait(err))
	}
}
