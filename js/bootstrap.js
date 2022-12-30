const match = new MatchGrid();

anime({
    targets: '#start',
    width: {
        value: '-=0px',
        duration: 1800,
        easing: 'easeInOutSine'
    },
    rotate: {
        value: '+=2turn',
        duration: 1800,
        easing: 'easeInOutSine'
    },
    direction: 'alternate',
    loop: true,
    delay: 1000
});

defaultSelectors.startButton.addEventListener("click", () => {
    match.startGame();
});

defaultSelectors.stopButton.addEventListener("click", () => {
    match.finishGame();
});

defaultSelectors.restartButton.addEventListener("click", () => {
    match.restartGame();
});

defaultSelectors.wrapper.addEventListener("mouseleave", () => {
    match.pauseGame();
});

defaultSelectors.wrapper.addEventListener("mouseenter", () => {
    match.continueGame();
});