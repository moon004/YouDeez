package main_test

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	. "github.com/HopesAndDreams/app/src/handler"
)

func TestGetYtube(t *testing.T) {
	var DoggoRes DogResources
	tt := []struct {
		name   string //Test name
		value  string // Pass in value
		output string
		status int
		err    string
	}{
		{name: "test /doggo", value: "doggo", status: 200},
		{name: "Should error", value: "hahaha", err: "Unknown Route"},
		{name: "test /youtube", value: "youtube?q=goose house", status: 200},
	}
	dapi := &GetDoggoApi{}
	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			req, err := http.NewRequest("POST", "localhost:8888/"+tc.value, nil)
			if err != nil {
				t.Fatalf("Error Request:%v", err)
			}

			rec := httptest.NewRecorder()

			DoggoRes.GetDoggo(rec, req)
			res := rec.Result()
			defer res.Body.Close()

			body, err := ioutil.ReadAll(res.Body)
			if err != nil {
				t.Fatalf("Cant Read response:%v", err)
			}
			bodyString := string(body)
			//if tc is an error test
			if tc.err != "" {
				if res.StatusCode != http.StatusBadRequest {
					t.Errorf("Expected bad status but got: %v", res.StatusCode)
				}
				// if given err msg is wrong
				if msg := bodyString; msg != tc.err {
					t.Errorf("expected Message %q, but got %q", tc.err, msg)
				}
				return //stop testing below's code
			}

			// if no err, get object from the json

			json.Unmarshal(body, dapi)
			if dapi.Status != "success" {
				t.Errorf("expected Status %v, but got %v",
					tc.status, res.StatusCode)
			}

		})
	}
}
