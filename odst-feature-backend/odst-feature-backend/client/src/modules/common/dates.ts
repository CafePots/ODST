// Javascript months are zero indexed.
// Typescript enums without explicit values are zero indexed.
// Therefore, these enums line up with the Date#getYear function
// eslint-disable-next-line no-shadow
export enum Month {
  Jan,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sep,
  Oct,
  Nov,
  Dec,
}

function prettifyMonth(month: Month) {
  switch (month) {
    case Month.Jan: return 'JAN';
    case Month.Feb: return 'FEB';
    case Month.Mar: return 'MAR';
    case Month.Apr: return 'APR';
    case Month.May: return 'MAY';
    case Month.Jun: return 'JUN';
    case Month.Jul: return 'JUL';
    case Month.Aug: return 'AUG';
    case Month.Sep: return 'SEP';
    case Month.Oct: return 'OCT';
    case Month.Nov: return 'NOV';
    case Month.Dec: return 'DEC';
    default: return 'Unknown';
  }
}

export function prettifyPublishDate(date?: Date) {
  if (!date) {
    return 'Pending';
  }

  const day = date.getUTCDate() + 1;
  const month = date.getMonth();
  const year = date.getUTCFullYear();

  const prettyDay = day < 10 ? `0${day}` : day; // Turn 3 into 03
  const prettyMonth = prettifyMonth(month);

  return `${prettyDay}${prettyMonth}${year}`;
}
