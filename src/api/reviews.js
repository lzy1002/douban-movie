import {request} from "./request.js";

const apikey = "0b2bdeda43b5688921839c8ecb20399b";

export function getReviewsData(movieId, start, count) {
  return request({
    url: `/v2/movie/subject/${movieId}/reviews`,
    params: {
      apikey: apikey,
      start: start,
      count: count
    }
  })
}
