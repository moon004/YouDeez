package handler

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
	"sync"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/render"
	"github.com/joho/godotenv"
)

type YResources struct{}

func (Yres YResources) Routes() chi.Router {
	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Get("/autoComplete", Yres.GetAutoComplete)
	r.Options("/autoComplete", Yres.GetAutoComplete)
	r.Get("/", Yres.GetYtube)
	r.Options("/", Yres.GetYtube)

	return r
}

func CorsHandler(w http.ResponseWriter) {
	// Handle CORS, RMB wildcard needs to change in production
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "access-control-allow-origin")
}

// GetYtube API respond, beware of the DevKey, os.Getenv is for CI,
// LoadEnv is for developing stage
func (Yres *YResources) GetYtube(w http.ResponseWriter, r *http.Request) {
	CorsHandler(w)
	var wg sync.WaitGroup
	var youtubeId []string
	queryValues := r.URL.Query()
	query := queryValues.Get("q")
	mr := queryValues.Get("mr")
	q := url.QueryEscape(query)
	DevKey := LoadEnv("DeveloperKey")
	URL := fmt.Sprintf(
		"https://www.googleapis.com/youtube/v3/search?part=id&maxResults=%v&q=%s&type=video&key=%v",
		mr, q, DevKey)

	payload := YPayload(URL, w, r)
	for _, item := range payload.Items {
		youtubeId = append(youtubeId, item.ID.VideoId)
	}
	IDList := url.QueryEscape(strings.Join(youtubeId, ","))
	urlStr := "https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics,snippet&id=%s&key=%v"
	ConStatsURL := fmt.Sprintf(urlStr, IDList, DevKey)
	wg.Add(1)
	RetObjects := GoGrab(ConStatsURL, &wg) // concurrent grab
	RetObject := <-RetObjects

	wg.Wait()
	render.JSON(w, r, RetObject)

}

// GetAutoComplete is the suggestion array of items for the searchbar
func (Yres *YResources) GetAutoComplete(w http.ResponseWriter, r *http.Request) {
	CorsHandler(w)
	queryValue := r.URL.Query()
	query := queryValue.Get("q")
	q := url.QueryEscape(query)
	ApiKey1 := LoadEnv("API_KEY1")
	URL := "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt"
	reqURL := fmt.Sprintf("%s&key=%s&q=%s", URL, ApiKey1, q)
	fmt.Println(reqURL)

	res, err := http.Get(reqURL)
	if err != nil {
		render.JSON(w, r, ErrDuringReq(err))
	}
	defer res.Body.Close()

	body, _ := ioutil.ReadAll(res.Body)
	if err != nil {
		render.JSON(w, r, ErrReadingJson(err))
	}

	w.Write(body)
}

// GoGrab deploys a asynch worker to grab the youtube search payloads
func GoGrab(url string, wg *sync.WaitGroup) <-chan *YConStatsItems {
	defer wg.Done()
	YConStatsItemsRes := &YConStatsItems{}
	ch := make(chan *YConStatsItems)

	go func(url string) {
		resp, err := http.Get(url)
		if err != nil {
			log.Fatal(err)
		}
		defer resp.Body.Close()
		body, _ := ioutil.ReadAll(resp.Body)
		err = json.Unmarshal(body, &YConStatsItemsRes)
		if err != nil {
			log.Fatal(err)
		}
		ch <- YConStatsItemsRes
	}(url)

	return ch
}

// YPayload Put Request into the payload struct
func YPayload(url string, w http.ResponseWriter, r *http.Request) *YRespond {
	Yres := &YRespond{}
	res, err := http.Get(url)
	if err != nil {
		render.JSON(w, r, ErrDuringReq(err))
	}
	defer res.Body.Close()

	body, _ := ioutil.ReadAll(res.Body)
	err = json.Unmarshal(body, &Yres)
	if err != nil {
		render.JSON(w, r, ErrReadingJson(err))
	}

	return Yres
}

// LoadEnv just loads Devkey from env
func LoadEnv(str string) (value string) {
	// Comment out the godotenv for CI to work
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}
	value = os.Getenv(str)
	return
}
