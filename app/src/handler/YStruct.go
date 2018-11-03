package handler

//Just import the REQUIRED data form youtube

type ResourceId struct {
	VideoId string `json:"videoId,omitempty"`
}

type SearchResultSnippet struct {
	ChannelTitle string `json:"channelTitle,omitempty"`
	Description  string `json:"description,omitempty"`
	PublishedAt  string `json:"publishedAt,omitempty"`
	Title        string `json:"title,omitempty"`
}

type SearchRes struct {
	Id *ResourceId `json:"id,omitempty"`
}

type YRespond struct {
	Items []*SearchRes `json:"items,omitempty"`
}

type VideoContentDetails struct {
	Duration string `json:"duration,omitempty"`
}

type VideoStatistics struct {
	ViewCount uint64 `json:"viewCount,omitempty,string"`
}

type YConStats struct {
	Snippet        *SearchResultSnippet `json:"snippet,omitempty"`
	ContentDetails *VideoContentDetails `json:"contentDetails,omitempty"`
	Statistics     *VideoStatistics     `json:"statistics,omitempty"`
}

type YConStatsItems struct {
	Items []*YConStats `json:"items,omitempty"`
}
