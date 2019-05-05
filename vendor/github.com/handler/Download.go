package handler

import (
	"bytes"
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
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Headers", "access-control-allow-origin")
	w.Header().Set("Access-Control-Expose-Headers", "Content-Length")
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
	var wg sync.WaitGroup

	wg.Add(1)
	go YouExe(q, w, r, &wg)
	wg.Wait()
	fmt.Fprintf(w, "Done %s", q)
}

// YouExe go routine for youtube-dl execution
func YouExe(q string, w http.ResponseWriter, r *http.Request, wg *sync.WaitGroup) {
	fmt.Printf("Fetching %s \n", q) // ./youtube-dl for linux
	cmd := exec.Command("youtube-dl.exe", "-f", "140", "-o", "-", "https://www.youtube.com/watch?v="+q)
	cmd.Stdout = w // streaming occurs here
	err := cmd.Start()
	if err != nil {
		render.JSON(w, r, ErrDuringStream(err))
	}
	err = cmd.Wait()
	if err != nil {
		render.JSON(w, r, ErrDuringWait(err))
	}
	wg.Done()
}

// DownloadDeez handle the deezer audio download
func DownloadDeez(w http.ResponseWriter, r *http.Request) {
	fmt.Println("DownLoad Deez")
	queryValues := r.URL.Query()
	query := queryValues.Get("q")
	usrToken := queryValues.Get("ut")
	q := url.QueryEscape(query)
	usertoken := url.QueryEscape(usrToken)
	var wg sync.WaitGroup

	wg.Add(2) // can be anything other than 'getsize' since doesnt matter when getting size
	go DeezExe(q, "getsize", w, r, &wg)
	go DeezExe(q, usertoken, w, r, &wg)
	wg.Wait()
	fmt.Fprintf(w, "Done")
}

// DeezExe go routine for Deezer decrypt execution
func DeezExe(q, usertoken string, w http.ResponseWriter, r *http.Request, wg *sync.WaitGroup) {
	var cmd *exec.Cmd

	if len(usertoken) < 192 {
		buf := new(bytes.Buffer)
		cmd = exec.Command(
			// REMEMBER ./deezer-downloader for linux
			"deezer-downloader.exe",
			"--id", q,
			"--getsize",
			"--usertoken", usertoken)

		cmd.Stdout = buf
		w.Header().Set("Content-Length", buf.String())
		fmt.Println("Buffer Length: ", buf.String())
	} else {
		cmd = exec.Command(
			// REMEMBER ./deezer-downloader for linux
			"deezer-downloader.exe",
			"--id", q,
			"--usertoken", usertoken)
		cmd.Stdout = w
	}
	err := cmd.Start()
	if err != nil {
		render.JSON(w, r, ErrDuringStream(err))
	}
	err = cmd.Wait()
	if err != nil {
		render.JSON(w, r, ErrDuringWait(err))
	}
	wg.Done()
}
