import {request} from "./request.js";

const apikey = "0b2bdeda43b5688921839c8ecb20399b";

export function getTop250Data(start, count) {
  return request({
    url: "/v2/movie/top250",
    params: {
      apikey: apikey,
      start: start,
      count: count
    }
  })
}

export function getWeeklyData() {
  return request({
    url: "/v2/movie/weekly",
    params: {
      apikey: apikey
    }
  })
}

export function formatWeeklyData(weeklyData) {
  let arr = [];
  for(let i = 0; i< weeklyData.subjects.length; i++){
    arr.push(weeklyData.subjects[i].subject);
  }
  return arr;
}

export function getNewMovieData() {
  return request({
    url: "/v2/movie/new_movies",
    params: {
      apikey: apikey
    }
  })
}

export function getUsBoxData() {
  return request({
    url: "/v2/movie/us_box",
    params: {
      apikey: apikey
    }
  })
}

export function formatUsBoxData(usBoxData) {
  let arr = [];
  for(let i = 0; i< usBoxData.subjects.length; i++){
    arr.push(usBoxData.subjects[i].subject);
  }
  return arr;
}
