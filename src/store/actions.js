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
  changeWanted(context, infoData){
    const index = context.state.wantedArr.findIndex((item) => {
      return item.id === infoData.id;
    });
    if(index <= -1){
      context.commit(ADD_TO_WANTED, infoData);
    }else {
      context.commit(DELETE_TO_WANTED, index);
    }
  },
  changeWatched(context, infoData){
    const index = context.state.watchedArr.findIndex((item) => {
      return item.id === infoData.id;
    });
    if(index <= -1){
      context.commit(ADD_TO_WATCHED, infoData);
    }else {
      context.commit(DELETE_TO_WATCHED, index);
    }
  },
  changeThumb(context, commentId){
    const index = context.state.thumbArr.findIndex((item) => {
      return commentId === item;
    });
    if(index < 0){
      context.commit(ADD_TO_THUMB, commentId);
    }else {
      context.commit(DELETE_TO_THUMB, index);
    }
  },
  changeCollection(context,celebrityData){
    const index = context.state.celebrityArr.findIndex((item) => {
      return item.id === celebrityData.id;
    });
    if(index < 0){
      context.commit(ADD_TO_CELEBRITY, celebrityData);
    }else {
      context.commit(DELETE_TO_CELEBRITY, index);
    }
  }
}
