export function deBounce(fn, time) {
  let timeId = null;
  return function () {
    clearTimeout(timeId);
    timeId = setTimeout(() => {
      fn();
    }, time);
  }
}

export function attachImageUrl(imgUrl) {
  if(imgUrl !== undefined){
    return imgUrl.replace(/http:\/\//, 'https://images.weserv.nl/?url=');
  }
}
