const ship = document.querySelector('.hero')
const playArea = document.querySelector('.game-area')

function moveShip(event) {
    if(event.key === 'ArrowUp'|| event.key === 'w') {
        // event.preventDefault();
        moveUp();
    } else if(event.key === 'ArrowDown' || event.key === 's') {
        // event.preventDefault();
        moveDown();
    } else if(event.key === " " || event.key === 'd') {
        // event.preventDefault();
        fireLaser();
    }
}

function moveUp() {
    let topPosition = getComputedStyle(ship).getPropertyValue('top')
    if(topPosition === "0px") {
        return
    } else {
        let position = parseInt(topPosition)
        position -= 50
        ship.style.top = `${position}px`
    }
}

function moveDown() {
    let topPosition = getComputedStyle(ship).getPropertyValue('top')
    if(topPosition === "510px"){
        return
    } else {
        let position = parseInt(topPosition)
        position += 50
        ship.style.top = `${position}px`
    }
}

window.addEventListener("keydown", moveShip)