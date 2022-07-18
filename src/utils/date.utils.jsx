
import opt from "./dates-data";
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
  return String("01-" + m + `-${dateObj.getFullYear()}`);
}


export function getDateIndexInSelector(date, dateData){
  let dateIndex = 0;
  dateData.map((dateObject, index)=>{
    if(date == dateObject.value){
      dateIndex = index;
    }
  });
  return dateIndex;
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

export function getMinAndMax(data) {
  let min = data[0];
  let max = data[0];
  for (let i = 0; i < data.length; i++) {
    if (data[i] < min) {
      min = data[i];
    }
    if (data[i] > max) {
      max = data[i];
    }
  }
  return { Min: min, Max: max };
}

export function compare(
  primaryData,
  secondaryData,
  primaryAverage,
  secondaryAverage
) {
  let primaryMin = getMinAndMax(primaryData).Min;
  let primaryMax = getMinAndMax(primaryData).Max;
  let secondaryMin = getMinAndMax(secondaryData).Min;
  let secondaryMax = getMinAndMax(secondaryData).Max;

  let minEvolution = Math.floor(
    ((primaryMin - secondaryMin) / secondaryMin) * 100
  );
  let maxEvolution = Math.floor(
    ((primaryMax - secondaryMax) / secondaryMax) * 100
  );
  let avgEvolution = Math.floor(
    ((primaryAverage - secondaryAverage) / secondaryAverage) * 100
  );

  return {
    minEvolution,
    maxEvolution,
    avgEvolution,
    primaryMin,
    primaryMax,
    secondaryMin,
    secondaryMax,
  };
}
