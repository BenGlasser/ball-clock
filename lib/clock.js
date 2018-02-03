'use strict';

class Clock {
    constructor(balls) {
        this._numBalls = balls;
        this._originalPostion = '';
        this._queue = [];
        this._minStack = [];
        this._fiveMinStack = [];
        this._hourStack = [];
        this._am = true;
        this._days = 0;
    }
    get numBalls () {
        return this._numBalls;
    }
    get days () {
        return this._days;
    }
    get millis () {
        return ((this._days * 24) + this._hourStack.length + (this._am ? 12 : 0)) * 60 * 60 * 1000;
    }
    get seconds () {
        return this.millis / 1000
    }
    _init() {
        this._queue = [];
        for (let i = 1; i <= this._numBalls; i++) {
            this._queue.push(i);
        }
        this._originalPostion = this._queue.toString();
        return this._queue.toString();
    };

    _loadBall() {
        let ball = this._queue.shift();

        this._minStack.push(ball);

        //load minute track
        if(this._minStack.length === 5) {
            this._fiveMinStack.push(this._minStack.pop());
            this._queue = this._queue.concat(this._minStack.reverse());
            this._minStack = []
        }

        //roll over and load five minute track
        if(this._fiveMinStack.length === 12) {
            this._hourStack.push(this._fiveMinStack.pop());
            this._queue = this._queue.concat(this._fiveMinStack.reverse());
            this._fiveMinStack = []
        }

        //roll over and load hour track
        if(this._hourStack.length === 12) {
            let lastBall = this._hourStack.pop();
            this._queue = this._queue.concat(this._hourStack.reverse());
            this._queue.push(lastBall);
            this._hourStack = [];
            if (!this._am) {
                this._days++;
                this._am = !this._am;
                //only check for cycle after all balls have returned to queue
                return this._hasCycled(this._queue.toString());
            }
            this._am = !this._am;
        }
        return false;
    };

    _hasCycled(currentPosition) {
        return this._originalPostion === currentPosition;
    }

    cycleBalls(){
        this._init();
        let hasCycled = false;
        while (!hasCycled) {
            hasCycled = this._loadBall();
        }
        console.log(`${this.numBalls} balls cycle after ${this.days} days`);
    }


    cycleBallsForXMin(minutes){
        this._init();
        while (minutes > 0) {
            this._loadBall();
            minutes--;
        }

        console.log(JSON.stringify({
            Min: this._minStack,
            FiveMin: this._fiveMinStack,
            Hour: this._hourStack,
            Main: this._queue
        }));
    }
}

module.exports = Clock;