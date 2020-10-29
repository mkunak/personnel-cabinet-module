module.exports = (dateStamp) => {
  const date = new Date(Number(dateStamp));

  const month =
    Number(date.getMonth() + 1) < 10
      ? `0${Number(date.getMonth() + 1)}`
      : `0${Number(date.getMonth() + 1)}`;

  const day =
    Number(date.getDate()) < 10
      ? `0${Number(date.getDate())}`
      : `0${Number(date.getDate())}`;

  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};
