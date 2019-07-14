package handler

import (
	"fmt"
	"net/http"
	"net/url"
	"os/exec"
	"regexp"

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
	w.Header().Set("Access-Control-Expose-Headers", "Content-Length")
	DeezReg := regexp.MustCompile(`^\d+$`)
	YouReg := regexp.MustCompile(`[\w-]{11}`)
	queryValues := r.URL.Query()
	query := queryValues.Get("q")
	usrToken := queryValues.Get("ut")
	q := url.QueryEscape(query)
	usertoken := url.QueryEscape(usrToken)
	switch {
	case DeezReg.MatchString(q):
		DownloadDeez(w, r, q, usertoken)
	case YouReg.MatchString(q):
		DownloadYou(w, r, q, usertoken)
	default:
		w.Write([]byte("Unknown Media ID"))
	}
	fmt.Println("Route Download YouDeez end for: ", q)
}

// DownloadYou handles the youtube audio downloader.
func DownloadYou(w http.ResponseWriter, r *http.Request, q, usertoken string) {
	fmt.Println("DownLoad You")

	YouExe(q, usertoken, w, r)

	fmt.Println("Done %s", q)
}

// YouExe go routine for youtube-dl execution
func YouExe(q, usertoken string, w http.ResponseWriter, r *http.Request) {
	fmt.Printf("Fetching %s \n", q) // ./youtube-dl for linux
	var cmd *exec.Cmd

	if usertoken == "getsize" {
		cmd = exec.Command("./youtube-dl-getsize", "https://www.youtube.com/watch?v="+q)
		cmd.Stdout = w
	} else {
		cmd = exec.Command("./youtube-dl", "-f", "140", "-o", "-", "https://www.youtube.com/watch?v="+q)
		cmd.Stdout = w // streaming occurs here
	}
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
func DownloadDeez(w http.ResponseWriter, r *http.Request, q, usertoken string) {
	fmt.Println("DownLoad Deez")

	DeezExe(q, usertoken, w, r)

	fmt.Println("Done %s", q)
}

// DeezExe go routine for Deezer decrypt execution
func DeezExe(q, usertoken string, w http.ResponseWriter, r *http.Request) {
	var cmd *exec.Cmd

	if usertoken == "getsize" {
		cmd = exec.Command(
			// REMEMBER ./deezer-downloader for linux
			"./deezer-downloader",
			"--id", q,
			"--getsize",
			"--usertoken", usertoken)
		cmd.Stdout = w
	} else {
		cmd = exec.Command(
			// REMEMBER ./deezer-downloader for linux
			"./deezer-downloader",
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
	fmt.Println("End of DeezExe")
}
