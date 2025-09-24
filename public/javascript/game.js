const imageContainer = document.querySelector(".image-container");
const gameStart = document.querySelector(".start-game");
const menu = document.querySelector(".options-menu");
const circle = document.querySelector(".selection-circle");
const background = document.querySelector(".form-background");

const waldoCoordinates = {
    x1: 1859 / 2560,
    x2: 1917 / 2560,
    y1: 723 / 1440,
    y2: 790 / 1440
}

const file = JSON.parse(imageContainer.dataset.file);
let pctX = 0;
let pctY = 0;
let roundCount = file.coords.length;
let foundSet = new Set();


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
    menu.style.left = `${x + 20}px`;
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
    imageContainer.style.pointerEvents = "auto";
})

menu.addEventListener("click", async (e) => {
    e.stopPropagation();
    const choice = e.target.dataset.choice?.toLowerCase();
    if (!choice) return;

    if (foundSet.has(choice)) return console.log(`Already found ${choice}`);
    

    const target = file.coords.find(c => c.name.toLowerCase() === choice);
    if (!target) return console.log("Character not found in db");
    
    const { x1 ,x2, y1, y2 } = target.axis; 
    if (
        pctX >= x1 && pctX <= x2 &&
        pctY >= y1 && pctY <= y2
    ) {
        console.log(`You found ${choice}!`);
        foundSet.add(choice);
        if (foundSet.size === roundCount) {
            imageContainer.style.pointerEvents = "none";
            const res = await fetch("/game/end", {
                method: "POST",
                headers: {"Content-Type": "application/json"}
            })

            const { time } = await res.json();
            document.querySelector(".totalTime").innerHTML = time;
            background.style.display = "block";
        }
        circle.style.display = "none";
        menu.style.display = "none"; 
        
    } else {
        console.log("Try again!");
        circle.style.display = "none";
        menu.style.display = "none";  
    }

})