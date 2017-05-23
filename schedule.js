Date.prototype.getWeekNumber = function () {
    var d = new Date(+this);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};

Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};

function getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}

// function showTime() {
//     var week = new Date().getWeekNumber();
//     var year = new Date().getFullYear();
//     var startDate = getDateOfISOWeek(week, year);
//     var endDate = getDateOfISOWeek(week, year).addDays(7);
//     console.log(startDate);
//     console.log(endDate);
//     console.log(startDate.getTime());
//     console.log(endDate.getTime());
//     // console.log()
// };
// showTime();

var getWeekNumber = function () {
    return weeknumber = new Date().getWeekNumber();
};

module.exports = {
    getWeekNumber
};

// var startDate = new Date("May 12, 2017 00:00:00"); // Your timezone!
// var startEpoch = startDate.getTime();
// console.log(startEpoch);

// var endDate = new Date("May 19, 2017 00:00:00"); // Your timezone!
// var endEpoch = endDate.getTime();
// console.log(endEpoch);