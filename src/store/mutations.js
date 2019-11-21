export default {
  addToWanted(state, infoData){
    const obj = {
      id: infoData.id,
      title: infoData.title,
      images: infoData.images,
      directors: infoData.directors,
      casts: infoData.casts
    };
    state.wantedArr.push(obj);
  },
  deleteToWanted(state, infoData){
    const index = state.wantedArr.findIndex((item) => {
      return item.id === infoData.id;
    });
    state.wantedArr.splice(index, 1);
  },
  addToWatched(state, infoData){
    const obj = {
      id: infoData.id,
      title: infoData.title,
      images: infoData.images,
      directors: infoData.directors,
      casts: infoData.casts
    };
    state.watchedArr.push(obj);
  },
  deleteToWatched(state, infoData){
    const index = state.watchedArr.findIndex((item) => {
      return item.id === infoData.id;
    });
    state.watchedArr.splice(index, 1);
  },
  addToThumb(state, commentId){
    state.thumbArr.push(commentId);
  },
  deleteToThumb(state, index){
    state.thumbArr.splice(index, 1);
  },
  addToCelebrity(state, celebrityData){
    const obj = {
      id: celebrityData.id,
      avatars: celebrityData.avatars,
      name: celebrityData.name,
      name_en: celebrityData.name_en,
      works: celebrityData.works
    };
    state.celebrityArr.push(obj);
  },
  deleteToCelebrity(state, index){
    state.celebrityArr.splice(index, 1);
  }
}

