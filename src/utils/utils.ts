export const compareArrays = <T>(array1: ReadonlyArray<T>, array2: ReadonlyArray<T>) => {
    return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
};

export const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

export function createStringOfDate(ISOString: string): string {
  const millisecondsInDay = 86400000;
  const currentDate = new Date();
  const orderDate = new Date(ISOString);
  const beginOfCurrentDate = currentDate.getTime() - currentDate.getTime() % millisecondsInDay;
  const diffInMsc = beginOfCurrentDate - new Date(ISOString).getTime();
  let diffDays = diffInMsc / millisecondsInDay;
  let daysBetween;
  if (diffDays <= 0) {
    daysBetween = "Сегодня";
  } else if (diffDays < 1){
    daysBetween = "Вчера";
  } else {
    daysBetween = `${Math.trunc(diffDays) + 1} дней назад`;
  }
  const hours = orderDate.getHours();
  const minutes = orderDate.getMinutes();
  return `${daysBetween}, ${hours}:${minutes > 9 ? minutes : "0" + minutes} i-GMT+3`;
}

export const calcOrderNum = (num: number, withHash?: boolean) => {
  const numIsString = num.toString();
  const numLength = numIsString.length;
  const beginOfString = withHash ? "#" : "";
  if (numIsString.length < 6) {
    return beginOfString + "0".repeat(6 - numLength) + num;
  }
  return beginOfString + numIsString;
}
