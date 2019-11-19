export default {
  changeWanted(context, infoData){
    const index = context.state.wantedArr.findIndex((item) => {
      return item.id === infoData.id;
    });
    console.log(index);
    if(index <= -1){
      context.commit("addToWanted", infoData);
    }else {
      context.commit("deleteToWanted", infoData);
    }
  },
  changeWatched(context, infoData){
    const index = context.state.watchedArr.findIndex((item) => {
      return item.id === infoData.id;
    });
    console.log(index);
    if(index <= -1){
      context.commit("addToWatched", infoData);
    }else {
      context.commit("deleteToWatched", infoData);
    }
  },
  changeThumb(context, commentId){
    const index = context.state.thumbArr.findIndex((item) => {
      return commentId === item;
    });
    if(index < 0){
      context.commit("addToThumb", commentId);
    }else {
      context.commit("deleteToThumb", index);
    }
  }
}

