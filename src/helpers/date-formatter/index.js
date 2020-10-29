class DateFormatter {
  static getStampFromDate(dateString) {
    return Date.parse(dateString);
  }

  static getDayFromStamp(stamp) {
    const date = new Date(Number(stamp));

    return Number(date.getDate());
  }

  static getDateFromStamp(stamp, time = "") {
    const date = new Date(Number(stamp));

    const month =
      Number(date.getMonth() + 1) < 10
        ? `0${Number(date.getMonth() + 1)}`
        : `${Number(date.getMonth() + 1)}`;

    const day =
      Number(date.getDate()) < 10
        ? `0${Number(date.getDate())}`
        : `${Number(date.getDate())}`;

    const year = date.getFullYear();

    const hours = Number(date.getHours()) < 10 ? `0${date.getHours()}` : date.getHours();

    const minutes =
      Number(date.getMinutes()) < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    const seconds =
      Number(date.getSeconds()) < 10 ? `0${date.getSeconds()}` : date.getSeconds();

    return time
      ? `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      : `${year}-${month}-${day}`;
  }
}

module.exports = DateFormatter;
