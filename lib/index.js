var Clock = require('../lib/clock');
var usage = `usage: ball-clock n1 [n2]
       n1: number of balls to load the clock with (26 < n1 < 128)
       n2: number of minutes to run the simulation`;
let run = (balls, minutes) => {
    let clock = new Clock(balls),
        startDate,
        endDate;

    if (!balls || (balls < 27 || balls > 127)) {
        console.log (usage);
        process.exit();
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
