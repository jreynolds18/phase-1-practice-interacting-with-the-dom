
// Grab the counter
const counter = document.getElementById("counter");
let currentCount = 0;
let clicksOnCurrentNumber = {}
let counterInterval = setInterval(addOneToCounter, 1000);

// Increase the counter by 1 every second
function addOneToCounter() {
    currentCount++;
    counter.textContent = currentCount;
}

// Make + button increment and - button decrement
const plusButton = document.getElementById("plus");
plusButton.addEventListener("click", () => {
    currentCount++;
    counter.textContent = currentCount;
});
const minusButton = document.getElementById("minus");
minusButton.addEventListener("click", () => {
    currentCount--;
    counter.textContent = currentCount;
});

// Allow the pause button to stop the counter or resume it, and change the text in the button accordingly
const pauseButton = document.getElementById("pause");
pauseButton.addEventListener("click", () => {
    if (pauseButton.textContent === " resume ") {
        counterInterval = setInterval(addOneToCounter, 1000);
        pauseButton.textContent = " pause ";
        enableButtons(true); 
    } else if (pauseButton.textContent === " pause ") {
        clearInterval(counterInterval);
        pauseButton.textContent = " resume ";
        enableButtons(false);
    }
});

// Make the heart button like a number. It should like the currentCount the number of times clicked on that current number
const heartButton = document.getElementById("heart");
heartButton.addEventListener("click", () => {
    // The below code makes clicksOnCurrentNumber hold a number that represents how many times it has been clicked on that specific counter number
    clicksOnCurrentNumber[currentCount] = (clicksOnCurrentNumber[currentCount] || 0) + 1;
    const grabList = document.querySelector(".likes");
    const alreadyLikedNumber = grabList.querySelector(`li[data-count="${currentCount}"]`);

    // If the number already has likes, this updates the text. If it does not, it creates a new li to make a new count of likes on a number
    if (alreadyLikedNumber) {
        alreadyLikedNumber.textContent = `${currentCount} has been liked ${clicksOnCurrentNumber[currentCount]} times`;
    } else {
        const createLi = grabList.appendChild(document.createElement("li"));
        createLi.setAttribute("data-count", currentCount);
        createLi.textContent = `${currentCount} has been liked ${clicksOnCurrentNumber[currentCount]} time`;
    }
});

// This function is to enable or dsable the buttons. It is used in the pause button. It is below the other buttons because it needs every button's code to run before this.
function enableButtons(boolean) {
    plusButton.disabled = !boolean;
    minusButton.disabled = !boolean;
    heartButton.disabled = !boolean;
}
enableButtons(true);

// Allow comments to be posted and submitted. Listens after DOM loaded, adds a listener onto the submit, prevents refresh, then gets the comment list, makes commentText equal the text typed in, passes it to the list handler along with the list, then makes a new paragraph element and puts the comment text into it, showing up on the page.
document.addEventListener("DOMContentLoaded", () => {
    const submitForm = document.getElementById("comment-form");
    submitForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const grabCommentsList = document.getElementById("list");
        const commentText = event.target['comment-input'].value;
        listHandler(grabCommentsList, commentText);
    });
});
function listHandler (grabCommentsList, commentText) {
    const createParagraph = document.createElement("p");
    createParagraph.textContent = commentText; 
    grabCommentsList.appendChild(createParagraph);
}