package main_test

import (
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	. "github.com/hopesanddreams/app/src/handler"
)

func TestGetDeezer(t *testing.T) {
	var Deez DeezResource
	tt := []struct {
		name   string //Test name
		value  string // Pass in value
		output string
		status int
		err    string
	}{
		{name: "test /deezer", value: "api/deez?q=sad", status: 200},
		{name: "test /deezer", value: "api/deez?q=goose house", status: 200},
		{name: "Should error", value: "api/deez?q=2343424", err: "{}\n"}, //Empty cuz no result
	}
	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			req, err := http.NewRequest("GET", "localhost:8888/"+tc.value, nil)
			if err != nil {
				t.Fatalf("Error Request:%v", err)
			}

			rec := httptest.NewRecorder()

			Deez.GetDeezTrack(rec, req)
			res := rec.Result()
			defer res.Body.Close()

			body, err := ioutil.ReadAll(res.Body)
			if err != nil {
				t.Fatalf("Cant Read response:%v", err)
			}
			bodyString := string(body)
			//if tc is an error test
			if tc.err != "" {

				// if given err msg is wrong
				if msg := bodyString; msg != tc.err {
					t.Errorf("expected Message %q, but got %q", tc.err, msg)
				}
				return //stop testing below's code
			}

		})
	}
}
