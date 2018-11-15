package handler

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"

	"Errhandler"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/render"
)

type DeezResource struct{}

func (d DeezResource) Routes() chi.Router {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Get("/", d.GetDeezTrack)
	r.Options("/", d.GetDeezTrack)

	return r
}

func (d *DeezResource) GetDeezTrack(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "access-control-allow-origin")
	DeezAPI := &GetDeezItem{}
	queryValues := r.URL.Query()
	query := queryValues.Get("q")
	q := url.QueryEscape(query)
	res, err := http.Get(fmt.Sprintf("https://api.deezer.com/search/track?q=%s", q))
	if err != nil {
		render.Render(w, r, ErrH.ErrDuringReq(err))
	}
	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		render.Render(w, r, ErrH.ErrDuringReq(err))
	}
	err = json.Unmarshal(body, DeezAPI)
	if err != nil {
		render.Render(w, r, ErrH.ErrReadingJson(err))
	}
	render.JSON(w, r, DeezAPI)
}

func (d *GetDeezItem) Render(w http.ResponseWriter, r *http.Request) error {
	return errors.New("Return Testing Error")
}
