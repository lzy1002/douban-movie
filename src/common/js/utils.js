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

export function getDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let week = date.getDay();
  let weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  return `${year}年${month}月${day}日, ${weekArr[week]}`;
}

export function decDate(date) {
  let resArr = date.split("-");
  return `${resArr[0]}年${resArr[1]}月${resArr[2]}日`;
}
