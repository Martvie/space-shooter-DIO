const ship = document.querySelector('.hero')
const playArea = document.querySelector('.game-area')

function moveShip(event) {
    if (event.key === 'ArrowUp') {
        event.preventDeafut()
        moveUp()
    } else if (event.key === 'ArrowDown') {
        event.preventDeafut()
        moveDown()
    } else if (event.key === 'KeyD') {
        event.preventDeafut()
        shoot()
    }
}

function moveUp() {
    let topPosition = getComputedStyle(ship).getPropertyValue('top')
    if (topPosition === '0px') {
        return
    } else {
        let position = parseInt(topPosition)
        position -= 50
        ship.style.top = `${position}px`
    }
}

function moveDown() {
    let topPosition = getComputedStyle(ship).getPropertyValue('top')
    if (topPosition === '540px') {
        return
    } else {
        let topPosition = parseInt(position)
        position += 50
        ship.style.top = `${position}px`
    }
}
