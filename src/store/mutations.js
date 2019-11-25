import {
  ADD_TO_WANTED,
  ADD_TO_WATCHED,
  ADD_TO_THUMB,
  ADD_TO_CELEBRITY,
  DELETE_TO_WANTED,
  DELETE_TO_WATCHED,
  DELETE_TO_THUMB,
  DELETE_TO_CELEBRITY
} from "./mutations-types";

export default {
  [ADD_TO_WANTED](state, infoData){
    const obj = {
      id: infoData.id,
      title: infoData.title,
      images: infoData.images,
      directors: infoData.directors,
      casts: infoData.casts,
      rating: infoData.rating
    };
    state.wantedArr.push(obj);
  },
  [DELETE_TO_WANTED](state, index){
    state.wantedArr.splice(index, 1);
  },
  [ADD_TO_WATCHED](state, infoData){
    const obj = {
      id: infoData.id,
      title: infoData.title,
      images: infoData.images,
      directors: infoData.directors,
      casts: infoData.casts,
      rating: infoData.rating
    };
    state.watchedArr.push(obj);
  },
  [DELETE_TO_WATCHED](state, index){
    state.watchedArr.splice(index, 1);
  },
  [ADD_TO_THUMB](state, commentId){
    state.thumbArr.push(commentId);
  },
  [DELETE_TO_THUMB](state, index){
    state.thumbArr.splice(index, 1);
  },
  [ADD_TO_CELEBRITY](state, celebrityData){
    const obj = {
      id: celebrityData.id,
      avatars: celebrityData.avatars,
      name: celebrityData.name,
      name_en: celebrityData.name_en,
      works: celebrityData.works
    };
    state.celebrityArr.push(obj);
  },
  [DELETE_TO_CELEBRITY](state, index){
    state.celebrityArr.splice(index, 1);
  }
}
