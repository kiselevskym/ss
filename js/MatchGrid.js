class MatchGrid {
    currentSeconds;
    currentMinutes;
    timer;

    constructor(startParams = defaultStartParams, selectors = defaultSelectors) {
        this.gridColumns = startParams.grid.columns;
        this.gridRows = startParams.grid.rows;

        this.matchMinutes = startParams.timeLimit.minutes;
        this.matchSeconds = startParams.timeLimit.seconds;

        this.selectors = selectors;
        this.selectors.wrapper.style.width = startParams.activitySize.width;
        this.selectors.wrapper.style.height = startParams.activitySize.height;
        this.selectors.wrapper.classList.add(startParams.theme);
    }

    set seconds(sec) {
        this.currentSeconds = sec;
    }

    set minutes(min) {
        this.currentMinutes = min;
    }

    startGame() {
        this.seconds = this.matchSeconds;
        this.minutes = this.matchMinutes;

        this.selectors.controls.classList.add("hide");
        this.selectors.stopButton.classList.remove("hide");
        this.selectors.restartButton.classList.remove("hide");
        this.selectors.startButton.classList.add("hide");

        const cardValues = generateRandom(this.gridColumns, this.gridRows);
        matrixGenerator(
            cardValues,
            this.gridColumns,
            this.gridRows,
            this.selectors.gameContainer
        );
    }

    pauseGame() {
        clearInterval(this.timer);
    }

    continueGame() {
        if (this.currentMinutes || this.currentSeconds) {
            this.timer = setInterval(() => this.timeUpdater(this.currentMinutes, this.currentSeconds), 1000);
        }
    }

    restartGame() {
        this.finishGame();
        this.startGame();
        this.continueGame();
    }

    finishGame() {
        clearInterval(this.timer);
        this.selectors.controls.classList.remove("hide");
        this.selectors.stopButton.classList.add("hide");
        this.selectors.startButton.classList.remove("hide");
    }

    timeUpdater(minutes, seconds) {
        if (seconds >= 1) {
            this.seconds = seconds - 1;
        } else {
            this.seconds = 59;
            this.minutes = minutes - 1;
        }

        if (seconds === 1 && minutes === 0) {
            alert('The time is over!');
            clearInterval(this.timer)
        }

        this.selectors.timeValue.innerHTML =
            `<span>Time:</span>
             ${this.currentMinutes}:${this.currentSeconds >= 10 ? this.currentSeconds : `0${this.currentSeconds}`}`;
    };
}
