package handler

// Import the Required Data From Deezer Track Api

type ArtistResources struct {
	ID      int    `json:"id,omitempty"`
	Name    string `json:"name,omitempty"`
	Link    string `json:"link,omitempty"`
	Picture string `json:"picture,omitempty"`
}

type AlbumResources struct {
	ID    int    `json:"id,omitempty"`
	Title string `json:"title,omitempty"`
	Cover string `json:"cover,omitempty"`
}

type DeezTrackResources struct {
	ID       int              `json:"id,omitempty"`
	Title    string           `json:"title,omitempty"`
	Duration int              `json:"duration,omitempty"`
	Artist   *ArtistResources `json:"artist,omitempty"`
	Album    *AlbumResources  `json:"album,omitempty"`
}

type GetDeezItem struct {
	Data []*DeezTrackResources `json:"data,omitempty"`
}
