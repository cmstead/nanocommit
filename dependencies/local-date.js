function getLocalDate() {
    const currentDate = new Date();

    const dateTimeStamp = currentDate.getFullYear() + '-'
        + currentDate.getMonth() + '-'
        + currentDate.getDay() + ' '
        + currentDate.getHours() + ':'
        + currentDate.getMinutes() + ':'
        + currentDate.getSeconds();

    return dateTimeStamp;
}

module.exports = {
    getLocalDate: getLocalDate
}