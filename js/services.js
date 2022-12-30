const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

const generateRandom = (columns, rows) => {
    let tempArray = [...items];
    let cardValues = [];

    if (((columns * rows) / 2) % 2 === 0) {
        const cardsNumber = (columns * rows) / 2;

        for (let i = 0; i < cardsNumber; i++) {
            const randomIndex = Math.floor(Math.random() * tempArray.length);
            cardValues.push(tempArray[randomIndex]);
            tempArray.splice(randomIndex, 1);
        }

        return cardValues;
    } else {
        alert('You need to enter correct values in rows and columns params. Not even numbers of cards!');
    }
};

const matrixGenerator = (cardValues, columns, rows, gameContainer) => {
    let firstCard = false;
    let secondCard = false;
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    cardValues.sort(() => Math.random() - 0.5);

    for (let i = 0; i < columns * rows; i++) {
        gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i]}">
        <div class="card-before">?</div>
        <div class="card-after">${cardValues[i]}</div>
     </div>
     `;
    }

    gameContainer.style.gridTemplateColumns = `repeat(${columns}, auto)`;
    gameContainer.style.gridTemplateRows = `repeat(${rows}, auto)`;

    const cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (!card.classList.contains("matched")) {
                card.classList.add("flipped");

                if (!firstCard) {
                    firstCard = card;
                    firstCard.classList.add("first-pick");
                    firstCardValue = card.getAttribute("data-card-value");
                } else {
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");

                    if (+firstCardValue === +secondCardValue && !secondCard.classList.contains("first-pick")) {
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
                        firstCard = false;
                    } else {
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard.classList.remove("first-pick");
                        firstCard = false;
                        secondCard = false;

                        setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                        }, 900);
                    }
                }
            }
        });
    });
};
