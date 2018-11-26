package handler

import (
	"net/http"

	"github.com/go-chi/render"
)

type ErrReqStruct struct {
	Err            error `json:"-"` // low-level runtime error
	HTTPStatusCode int   `json:"-"` // http response status code

	StatusText string `json:"status"`          // user-level status message
	AppCode    int64  `json:"code,omitempty"`  // application-specific error code
	ErrorText  string `json:"error,omitempty"` // application-level error message, for debugging
}

func (e *ErrReqStruct) Render(w http.ResponseWriter, r *http.Request) error {
	render.Status(r, e.HTTPStatusCode)
	return nil
}

func ErrDuringReq(err error) render.Renderer {
	return &ErrReqStruct{
		Err:            err,
		HTTPStatusCode: 400,
		StatusText:     "Error During Request",
		ErrorText:      err.Error(),
	}
}

func ErrDuringBind(err error) render.Renderer {
	return &ErrReqStruct{
		Err:            err,
		HTTPStatusCode: 406,
		StatusText:     "Error During Bind",
		ErrorText:      err.Error(),
	}
}

func ErrReadingJson(err error) render.Renderer {
	return &ErrReqStruct{
		Err:            err,
		HTTPStatusCode: 422,
		StatusText:     "Error During Reading Body",
		ErrorText:      err.Error(),
	}
}

func ErrDuringStream(err error) render.Renderer {
	return &ErrReqStruct{
		Err:            err,
		HTTPStatusCode: 500,
		StatusText:     "Error While Streaming audio file",
		ErrorText:      err.Error(),
	}
}

func ErrDuringRender(err error) render.Renderer {
	return &ErrReqStruct{
		Err:            err,
		HTTPStatusCode: 422,
		StatusText:     "Error Rendering Response.",
		ErrorText:      err.Error(),
	}
}

func ErrDuringWait(err error) render.Renderer {
	return &ErrReqStruct{
		Err:            err,
		HTTPStatusCode: 409,
		StatusText:     "Error During Wait",
		ErrorText:      err.Error(),
	}
}
