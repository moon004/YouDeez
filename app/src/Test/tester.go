package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
)

func main() {

	err := http.ListenAndServe(":8080", handler()) // nil meaning use DefaultServemux
	if err != nil {
		log.Fatal(err)
	}
}

func handler() http.Handler {
	r := http.NewServeMux()
	r.HandleFunc("/sadder", Sadder)
	return r
}

func Sadder(w http.ResponseWriter, r *http.Request) {
	text := r.FormValue("v")
	if text == "" {
		http.Error(w, "missing value", http.StatusBadRequest)
		return
	}
	v, err := strconv.Atoi(text)
	if err != nil {
		http.Error(w, "not a number: "+text, http.StatusBadRequest)
		return
	}
	fmt.Fprintln(w, v*2)
}
