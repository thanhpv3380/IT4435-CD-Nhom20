const getDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return { day, month, year };
};

const getTime = (date) => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return { hour, minute, second };
};

export function setTime(date, dateSet) {
  const { hour, minute, second } = getTime(dateSet);
  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(second);
  return date;
}

export function setDate(date, dateSet) {
  const { day, month, year } = getDate(dateSet);
  date.setDate(day);
  date.setMonth(month);
  date.setYear(year);
  return date;
}

export function renderDate(date) {
  const newDate = new Date(date);
  const { hour, minute, second } = getTime(newDate);
  const { day, month, year } = getDate(newDate);

  return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
}
