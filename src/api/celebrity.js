import {request} from "./request.js";

const apikey = "0b2bdeda43b5688921839c8ecb20399b";

export function getCelebrityData(celebrityId) {
  return request({
    url: `/v2/movie/celebrity/${celebrityId}`,
    params: {
      apikey: apikey
    }
  })
}
