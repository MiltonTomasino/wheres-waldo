const imageContainer = document.querySelector(".image-container");
const gameStart = document.querySelector(".start-game");

const waldoCoordinates = {
    x1: 1859 / 2560,
    x2: 1917 / 2560,
    y1: 723 / 1440,
    y2: 790 / 1440
}

const file = JSON.parse(imageContainer.dataset.file);

async function getCoordinates(event) {
    const rect = event.target.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const pctX = clickX / rect.width;
    const pctY = clickY / rect.height;

    console.log(`Mouse click coordinates: X(${clickX}), Y(${clickY})`);

    if (
        pctX >= file.coords.x1 && pctX <= file.coords.x2 &&
        pctY >= file.coords.y1 && pctY <= file.coords.y2
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
}

gameStart.addEventListener("click", async (e) => {
    e.preventDefault();
    await fetch("/game/start", {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        });
    imageContainer.style.display = "block";
})