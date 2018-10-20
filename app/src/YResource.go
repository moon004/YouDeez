package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/Errhandler"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/render"
)

type YResources struct{}

//People is for the json `people` object
type People struct {
	Name  string `json:"name"`
	Craft string `json:"craft"`
}

//Yrespond is the struct for the youtube API respond
type Yrespond struct {
	People  []*People `json:"people"`
	Message string    `json:"message"`
	Number  int       `json:"number"`
}

func (YSrc YResources) Routes() chi.Router {
	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)

	r.Get("/", YSrc.GetYtube)

	return r
}

//GetYtube API respond
func (YSrc *YResources) GetYtube(w http.ResponseWriter, r *http.Request) {

	if err := render.Render(w, r, NewYResp("http://api.open-notify.org/astros.json")); err != nil {
		render.Render(w, r, ErrH.ErrDuringRender(err))
	}

}

func NewYResp(rqLink string) *Yrespond {
	resp := &Yrespond{}
	res, err := http.Get(rqLink)
	if err != nil {
		panic(err)
	}
	data, _ := ioutil.ReadAll(res.Body)
	json.Unmarshal(data, resp)
	return resp
}

// implements render so it can use render.Render
func (Yresp *Yrespond) Render(w http.ResponseWriter, r *http.Request) error {

	return nil
}

func (Yresp *Yrespond) Bind(r *http.Request) error {
	return nil
}
