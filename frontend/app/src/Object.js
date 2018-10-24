import React from 'react';
import {
  YOUTUBE_TYPE,
  DEEZER_TYPE,
} from './constants/constant';


const RetObject = (props) => {
  const Title = props.name;
  const RenderType = props.rType;
  const MClick = props.handleMClick;
  switch (RenderType) {
    case YOUTUBE_TYPE:
      return (
        <div>
          <button
            id={RenderType}
            key={props.key}
            value="Youtube"
            onClick={MClick}
          >
            {Title}
          </button>
        </div>

      );
    case DEEZER_TYPE:
      return (
        <button key={props.key} value="Deezer" onClick={props.handleMClick}>
					Deezer

        </button>
      );
    default:
      return null;
  }
};

export default RetObject;

/*
{
			"kind": "youtube#searchListResponse",
			"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/PaiEDiVxOyCWelLPuuwa9LKz3Gk\"",
			"nextPageToken": "CAUQAA",
			"regionCode": "KE",
			"pageInfo": {
				"totalResults": 4249,
				"resultsPerPage": 5
			},
			"items": [
				{
					"kind": "youtube#searchResult",
					"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/QpOIr3QKlV5EUlzfFcVvDiJT0hw\"",
					"id": {
						"kind": "youtube#channel",
						"channelId": "UCJowOS1R0FnhipXVqEnYU1A"
					}
				},
				{
					"kind": "youtube#searchResult",
					"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/AWutzVOt_5p1iLVifyBdfoSTf9E\"",
					"id": {
						"kind": "youtube#video",
						"videoId": "Eqa2nAAhHN0"
					}
				},
				{
					"kind": "youtube#searchResult",
					"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/2dIR9BTfr7QphpBuY3hPU-h5u-4\"",
					"id": {
						"kind": "youtube#video",
						"videoId": "IirngItQuVs"
					}
				}
			]
		}
		*/
