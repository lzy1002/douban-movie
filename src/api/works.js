import {request} from "./request.js";

const apikey = "0b2bdeda43b5688921839c8ecb20399b";

export function getWorksData(celebrityId, start, count) {
  return request({
    url: `/v2/movie/celebrity/${celebrityId}/works`,
    params: {
      apikey: apikey,
      start: start,
      count: count
    }
  })
}
