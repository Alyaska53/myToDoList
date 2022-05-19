function updateTime(time) {
  return (time < 10) ? '0' + time : time;
}

export function getDate(id) {
  let date = new Date(id);
  let hours = updateTime(date.getHours());
  let minutes = updateTime(date.getMinutes());
  let day = updateTime(date.getDate());
  let month = updateTime(date.getMonth() + 1);
  let year = date.getFullYear();

  return `${hours}:${minutes} ${day}.${month}.${year}`;
}