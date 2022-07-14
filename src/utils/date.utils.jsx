const monthInMillis = 1000 * 60 * 60 * 24 * 30;

export function getStringDate(dateInMilliseconds) {
  const dateObj = new Date(dateInMilliseconds);
  let m =
    dateObj.getMonth() + 1 >= 10
      ? String(dateObj.getMonth() + 1)
      : String(`0${dateObj.getMonth() + 1}`);
  return String(`${dateObj.getFullYear()}-` + m + "-01");
}

export function getStringDateInverted(dateInMilliseconds) {
  const dateObj = new Date(dateInMilliseconds);
  let m =
    dateObj.getMonth() + 1 >= 10
      ? String(dateObj.getMonth() + 1)
      : String(`0${dateObj.getMonth() + 1}`);
  return String("01-" + m + `-${dateObj.getFullYear()}` );
}

export function getNumberOfRecords(startingDate, endingDate) {
  return Number(Math.floor((endingDate - startingDate) / monthInMillis));
}

export function getIndexOfStartingDate(startingDate, categoryData) {
  let index = 0;
  for (let i = 0; i < categoryData.length; i++) {
    if (categoryData[i].date == getStringDate(startingDate)) {
      index = i;
    }
  }
  return index;
}

export function getVolumeForCustomPeriod(data, startingDate, numberOfMonths) {
  let searchVolume = new Array();
  let startingIndex = getIndexOfStartingDate(startingDate, data);
  for (let i = startingIndex; i < startingIndex + numberOfMonths + 1; i++) {
    searchVolume.push(data[i].volume);
  }
  return searchVolume;
}

export function getAverageData(data) {
  let average = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
  average /= data.length;
  let averageData = new Array();
  for (let i = 0; i < data.length; i++) {
    averageData.push(average);
  }
  return averageData;
}

export function oneYearBeforeDate(date) {
  let newDate = Number(date - 12 * monthInMillis);
  newDate = newDate > Date.UTC(2018, 6, 1) ? newDate : Date.UTC(2018, 6, 1);
  return newDate;
}
