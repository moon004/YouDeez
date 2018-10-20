package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"strconv"
	"testing"
)

func TestSadder(t *testing.T) {
	tt := []struct {
		name   string
		value  string
		double int
		status int
		err    string
	}{
		{name: "double of two", value: "2", double: 4},
		{name: "mssing value", value: "", err: "missing value"},
		{name: "not a number", value: "x", err: "not a number: x"},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			req, err := http.NewRequest("GET", "localhost:8080/sadder?v="+tc.value, nil)
			if err != nil {
				t.Fatalf("could not created the request:%v", err)
			}

			rec := httptest.NewRecorder()

			Sadder(rec, req)

			res := rec.Result() // rec.Result() returns what client would get into res
			defer res.Body.Close()

			b, err := ioutil.ReadAll(res.Body)

			if err != nil {
				t.Fatalf("Could not read response:%v", err)
			}
			if tc.err != "" {
				// do something
				if res.StatusCode != http.StatusBadRequest {
					t.Errorf("Expected status bad Request: got %v", res.StatusCode)
				}

				if msg := string(bytes.TrimSpace(b)); msg != tc.err {
					t.Errorf("expected Message %q, got %q", tc.err, msg)
				}
				return
			}

			if res.StatusCode != http.StatusOK {
				t.Errorf("expected statusOK but got %v", res.StatusCode)
			}
			//read all body, then parse the content

			d, err := strconv.Atoi(string(bytes.TrimSpace(b)))
			if err != nil {
				t.Fatalf("expected interger but get:%s", b)
			}
			if d != tc.double {
				t.Fatalf("expected put in 2 we'll get %v, but we get%v", tc.double, d)
			}
		})
	}
}

func TestRouting(t *testing.T) {
	srv := httptest.NewServer(handler())
	defer srv.Close()

	res, err := http.Get(fmt.Sprintf("%s/sadder?v=2", srv.URL))
	if err != nil {
		t.Fatalf("could not send GET request: %v", err)
	}
	if res.StatusCode != http.StatusOK {
		t.Errorf("expected statusOK but got %v", res.StatusCode)
	}
	//read all body, then parse the content
	b, err := ioutil.ReadAll(res.Body)
	d, err := strconv.Atoi(string(bytes.TrimSpace(b)))
	if err != nil {
		t.Fatalf("expected interger but get:%s", b)
	}
	if d != 4 {
		t.Fatalf("expected put in 2 we'll get 4, but we get%v", d)
	}
}
