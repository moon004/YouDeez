package main

import (
	"net/http"
	"testing"
)

func TestGetYtube(t *testing.T) {
	req, err := http.NewRequest("GET", "localhost:8888")
	if err != nil {
		t.Fatalf("Error During Request:%v", err)
	}
}
