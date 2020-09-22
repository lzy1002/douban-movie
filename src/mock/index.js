import Mock from "mockjs";

import {splitParams} from "../common/js/utils.js";

import inTheaters from "./data/inTheaters.js";
import comingSoon from "./data/comingSoon.js";
import movieInfo from "./data/movieInfo.js";
import allComments from "./data/allComments.js";
import allReviews from "./data/allReviews.js";
import reviewInfo from "./data/reviewInfo.js";
import celebrityInfo from "./data/celebrityInfo.js";
import works from "./data/works.js";
import top250 from "./data/top250.js";
import weekly from "./data/weekly.js";
import newMovies from "./data/newMovies.js";
import usBox from "./data/usBox.js";

Mock.mock(/\/v2\/movie\/in_theaters/, "get", function (opts) {
  const paramsObj = splitParams(opts.url);
  const movieList = inTheaters.subjects.slice(paramsObj["start"], paramsObj["start"] + paramsObj["count"]);

  return {
    subjects: movieList,
    total: inTheaters.total
  };
});

Mock.mock(/\/v2\/movie\/coming_soon/, "get", function (opts) {
  const paramsObj = splitParams(opts.url);
  const movieList = comingSoon.subjects.slice(paramsObj["start"], paramsObj["start"] + paramsObj["count"]);

  return {
    subjects: movieList,
    total: comingSoon.total
  }
});

Mock.mock(/\/v2\/movie\/subject\/(\d+)\/comments/, "get", function (opts) {
  const paramsObj = splitParams(opts.url);
  const commentsList = allComments.comments.slice(paramsObj["start"], paramsObj["start"] + paramsObj["count"]);

  return {
    total: allComments.total,
    subject: {
      title: allComments.subject.title
    },
    comments: commentsList
  };

});

Mock.mock(/\/v2\/movie\/subject\/(\d+)\/reviews/, "get", function (opts) {
  const paramsObj = splitParams(opts.url);
  const reviewsList = allReviews.reviews.slice(paramsObj["start"], paramsObj["start"] + paramsObj["count"]);
  const id = opts.url.split("?")[0].split("/")[4];

  return {
    total: allReviews.total,
    subject: {
      title: allReviews.subject.title,
      id: id
    },
    reviews: reviewsList
  }

});

Mock.mock(/\/v2\/movie\/subject\/(\d+)/, "get", function (opts) {
  return movieInfo;
});

Mock.mock(/\/v2\/movie\/review\/(\d+)/, "get", function (opts) {
  return reviewInfo;
});

Mock.mock(/\/v2\/movie\/celebrity\/(\d+)\/works/, "get", function (opts) {
  const paramsObj = splitParams(opts.url);
  const worksList = works.works.slice(paramsObj["start"], paramsObj["start"] + paramsObj["count"]);
  return {
    total: works.total,
    works: worksList
  }
});

Mock.mock(/\/v2\/movie\/celebrity\/(\d+)/, "get", function (opts) {
  return celebrityInfo;
});

Mock.mock(/\/v2\/movie\/top250/, "get", function (opts) {
  const paramsObj = splitParams(opts.url);
  const topList = top250.subjects.slice(parseInt(paramsObj["start"]), parseInt(paramsObj["start"]) + parseInt(paramsObj["count"]));
  console.log(topList);
  return {
    total: top250.total,
    subjects: topList
  }
});

Mock.mock(/\/v2\/movie\/weekly/, "get", function (opts) {
  return weekly;
});

Mock.mock(/\/v2\/movie\/new_movies/, "get", function (opts) {
  return newMovies;
});

Mock.mock(/\/v2\/movie\/us_box/, "get", function (opts) {
  return usBox;
});
