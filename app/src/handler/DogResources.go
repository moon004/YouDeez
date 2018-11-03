package handler

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"

	"github.com/Errhandler"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/render"
)

type DogResources struct{}

type GetDoggoApi struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

func (d DogResources) Routes() chi.Router {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Get("/", d.GetDoggo)

	return r
}

func (d *DogResources) GetDoggo(w http.ResponseWriter, r *http.Request) {
	dapi := &GetDoggoApi{}
	res, err := http.Get("https://dog.ceo/api/breeds/image/random")
	if err != nil {
		render.Render(w, r, ErrH.ErrDuringReq(err))
	}
	body, _ := ioutil.ReadAll(res.Body)
	json.Unmarshal(body, dapi)
	render.JSON(w, r, dapi)
}

func (d *GetDoggoApi) Render(w http.ResponseWriter, r *http.Request) error {
	return errors.New("Return Testing Error")
}
