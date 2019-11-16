import {request} from "./request.js";

const apikey = "0b2bdeda43b5688921839c8ecb20399b";

export function getNowData(start, count) {
  return request({
    url: "/v2/movie/in_theaters",
    params: {
      apikey: apikey,
      start: start,
      count: count
    }
  })
}

export function getSoonData(start, count) {
  return request({
    url: "/v2/movie/coming_soon",
    params: {
      apikey: apikey,
      start: start,
      count: count
    }
  })
}
