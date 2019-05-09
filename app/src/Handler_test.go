package main_test

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	. "github.com/handler"
)

var (
	ServerURL = os.Getenv("amazonDNS")
)

func ErrChecker(t *testing.T, ErrMsg string, err error) {
	if err != nil {
		t.Fatalf("%s: %v", ErrMsg, err)
	}
}

func Equals(t *testing.T, myanswer, expected string) {
	if myanswer != expected {
		t.Errorf("Expected %s but I get %s", expected, myanswer)
	}
}

func TestGetDeezer(t *testing.T) {
	var Deez DeezResource
	DeezAPI := &GetDeezItem{}
	tt := []struct {
		name   string //Test name
		value  string // Pass in value
		output string
		status int
		err    string
	}{
		{name: "test /deezer", value: "api/deez?q=sad", status: 200, output: "SAD!"},
		{name: "test with space",
			value:  "api/deez?q=goose house",
			status: 200,
			output: "Goose",
		}, //		unknown ID
		{name: "Empty Response", value: "api/deez?q=f439904f3f213", err: "{}\n"}, //Empty cuz no result
	}
	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			req, err := http.NewRequest("GET", ServerURL+tc.value, nil)
			if err != nil {
				t.Fatalf("Error Request:%v", err)
			}
			rec := httptest.NewRecorder()
			//	GetDeezTrack will extract q from req.
			Deez.GetDeezTrack(rec, req)
			res := rec.Result()
			defer res.Body.Close()

			body, err := ioutil.ReadAll(res.Body)
			ErrChecker(t, "Error Reading Response Body", err)
			//if tc is an error test
			err = json.Unmarshal(body, DeezAPI)
			ErrChecker(t, "Error Unmarshalling", err)
			if tc.err == "" {
				Equals(t, DeezAPI.Data[0].Title, tc.output)
				return
			}
			// Error test
			Equals(t, string(body), tc.err)
			return
		},
		)
	}
}

func TestGetYResource(t *testing.T) {
	YConStatsItemsRes := &YConStatsItems{}
	var Youtube YResources
	tt := []struct {
		name   string //Test name
		value  string // Pass in value
		output string
		status int
		err    string
	}{
		{name: "test /youtube",
			value:  "api/youtube?mr=15&q=hopes and dreams",
			status: 200,
			output: "Undertale OST - Hopes And Dreams (Intro) & Save The World Extended"},
		{name: "Empty Response", value: "api/youtube?mr=15&q=f439904f3f213", err: "{}\n"}, //Empty cuz no result
	}
	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			req, err := http.NewRequest("GET", ServerURL+tc.value, nil)
			if err != nil {
				t.Fatalf("Error Request:%v", err)
			}
			rec := httptest.NewRecorder()
			//	GetDeezTrack will extract q from req.
			Youtube.GetYtube(rec, req)
			res := rec.Result()
			defer res.Body.Close()

			body, err := ioutil.ReadAll(res.Body)
			ErrChecker(t, "Error Reading Response Body", err)
			err = json.Unmarshal(body, YConStatsItemsRes)
			ErrChecker(t, "Error Unmarshalling", err)
			//if tc is NOT an error test
			if tc.err == "" {
				Equals(t, YConStatsItemsRes.Items[0].Snippet.Title, tc.output)
				return
			}
			// Error test
			Equals(t, string(body), tc.err)
		},
		)
	}
}
