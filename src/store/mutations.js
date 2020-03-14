import {
  ADD_TO_WANTED,
  ADD_TO_WATCHED,
  ADD_TO_THUMB,
  ADD_TO_CELEBRITY,
  DELETE_TO_WANTED,
  DELETE_TO_WATCHED,
  DELETE_TO_THUMB,
  DELETE_TO_CELEBRITY,
  SYNCHRONIZATION_STATE
} from "./mutations-types.js";

export default {
  [ADD_TO_WANTED](state, infoData) {
    const obj = {
      id: infoData.id,
      title: infoData.title,
      images: infoData.images,
      directors: infoData.directors,
      casts: infoData.casts,
      rating: infoData.rating
    };
    let wanted = JSON.parse(window.localStorage.getItem("wantedArr"));
    wanted.push(obj);
    window.localStorage.setItem("wantedArr", JSON.stringify(wanted));
    this.commit("synchronizationState", "wantedArr");

  },
  [DELETE_TO_WANTED](state, index) {
    let wantedArr = JSON.parse(window.localStorage.getItem("wantedArr"));
    wantedArr.splice(index, 1);
    window.localStorage.setItem("wantedArr", JSON.stringify(wantedArr));
    this.commit("synchronizationState", "wantedArr")
  },
  [ADD_TO_WATCHED](state, infoData) {
    const obj = {
      id: infoData.id,
      title: infoData.title,
      images: infoData.images,
      directors: infoData.directors,
      casts: infoData.casts,
      rating: infoData.rating
    };
    let watchedArr = JSON.parse(window.localStorage.getItem("watchedArr"));
    watchedArr.push(obj);
    window.localStorage.setItem("watchedArr", JSON.stringify(watchedArr));
    this.commit("synchronizationState", "watchedArr");
  },
  [DELETE_TO_WATCHED](state, index) {
    let watchedArr = JSON.parse(window.localStorage.getItem("watchedArr"));
    watchedArr.splice(index, 1);
    window.localStorage.setItem("watchedArr", JSON.stringify(watchedArr));
    this.commit("synchronizationState", "watchedArr")
  },
  [ADD_TO_THUMB](state, commentId) {
    let thumbArr = JSON.parse(window.localStorage.getItem("thumbArr"));
    thumbArr.push(commentId);
    window.localStorage.setItem("thumbArr", JSON.stringify(thumbArr));
    this.commit("synchronizationState", "thumbArr");
  },
  [DELETE_TO_THUMB](state, index) {
    let thumbArr = JSON.parse(window.localStorage.getItem("thumbArr"));
    thumbArr.splice(index, 1);
    window.localStorage.setItem("thumbArr", JSON.stringify(thumbArr));
    this.commit("synchronizationState", "thumbArr");
  },
  [ADD_TO_CELEBRITY](state, celebrityData) {
    const obj = {
      id: celebrityData.id,
      avatars: celebrityData.avatars,
      name: celebrityData.name,
      name_en: celebrityData.name_en,
      works: celebrityData.works
    };
    let celebrityArr = JSON.parse(window.localStorage.getItem("celebrityArr"));
    celebrityArr.push(obj);
    window.localStorage.setItem("celebrityArr", JSON.stringify(celebrityArr));
    this.commit("synchronizationState", "celebrityArr");
  },
  [DELETE_TO_CELEBRITY](state, index) {
    let celebrityArr = JSON.parse(window.localStorage.getItem("celebrityArr"));
    celebrityArr.splice(index, 1);
    window.localStorage.setItem("celebrityArr", JSON.stringify(celebrityArr));
    this.commit("synchronizationState", "celebrityArr");
  },
  [SYNCHRONIZATION_STATE](state, key) {
    if(window.localStorage.getItem(key)) {
      state[key] = JSON.parse(window.localStorage.getItem(key));
    }else {
      window.localStorage.setItem(key, "[]");
      state[key] = [];
    }
  }
}
