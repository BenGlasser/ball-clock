var Clock = require('../lib/clock');

let run = (balls, minutes) => {
    let clock = new Clock(balls),
        startDate,
        endDate;

    if (!balls || (balls < 27 || balls > 127)) {
        console.log ('please enter a valid number of balls in the range of 27 - 127 ')
        process.exit()
    }
    else if (!minutes) {
        startDate = new Date();
        clock.cycleBalls();
        endDate = new Date();
    }
    else {
        startDate = new Date();
        clock.cycleBallsForXMin(minutes);
        endDate = new Date();
    }
    let diffInMillis = endDate.getTime() - startDate.getTime();
    console.log(`Completed in ${diffInMillis} milliseconds (${diffInMillis/1000} seconds)`);
};

module.exports = {
    run: run
}
