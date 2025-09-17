const imageContainer = document.querySelector(".image-container");

const waldoCoordinates = {
    x1: 1859 / 2560,
    x2: 1917 / 2560,
    y1: 723 / 1440,
    y2: 790 / 1440
}

function getCoordinates(event) {
    const rect = event.target.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const pctX = clickX / rect.width;
    const pctY = clickY / rect.height;

    console.log(`Mouse click coordinates: X(${clickX}), Y(${clickY})`);

    if (
        pctX >= waldoCoordinates.x1 && pctX <= waldoCoordinates.x2 &&
        pctY >= waldoCoordinates.y1 && pctY <= waldoCoordinates.y2
    ) {
        console.log("You found Waldo!");
    } else {
        console.log("Try again!");
    }
}