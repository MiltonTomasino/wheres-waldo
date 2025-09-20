const imageContainer = document.querySelector(".image-container");
const gameStart = document.querySelector(".start-game");
const menu = document.querySelector(".options-menu");
const circle = document.querySelector(".selection-circle");

const waldoCoordinates = {
    x1: 1859 / 2560,
    x2: 1917 / 2560,
    y1: 723 / 1440,
    y2: 790 / 1440
}

const file = JSON.parse(imageContainer.dataset.file);
let pctX = 0;
let pctY = 0;

async function getCoordinates(event) {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;
    const clickX = x- rect.left;
    const clickY = y - rect.top;

    pctX = clickX / rect.width;
    pctY = clickY / rect.height;

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    menu.style.left = `${x + 40}px`;
    menu.style.top = `${y}px`;
    menu.style.display = "block";

    circle.style.display = "block";

    console.log(`Mouse click coordinates: X(${x}), Y(${y})`);
}

gameStart.addEventListener("click", async (e) => {
    e.preventDefault();
    await fetch("/game/start", {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        });
    imageContainer.style.display = "block";
})

menu.addEventListener("click", async (e) => {
    e.stopPropagation();
    if (!e.target.dataset.choice) return;

    if (
        pctX >= file.coords.x1 && pctX <= file.coords.x2 &&
        pctY >= file.coords.y1 && pctY <= file.coords.y2
        && e.target.dataset.choice === "waldo"
    ) {
        console.log("You found Waldo!");
        const end = await fetch("/game/end", {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json());
    } else {
        console.log("Try again!");
    }

})