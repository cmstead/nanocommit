function localDate () {
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
    
    return {
        getLocalDate: getLocalDate
    }
}

module.exports = localDate;