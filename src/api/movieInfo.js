import {request} from "./request.js";

const apikey = "0b2bdeda43b5688921839c8ecb20399b";

export function getMovieInfoData(movieId) {
  return request({
    url: `/v2/movie/subject/${movieId}`,
    params: {
      apikey: apikey
    }
  })
}
