const ship = document.querySelector('.hero')
const playArea = document.querySelector('.game-area')

function moveShip(event) {
    if(event.key === 'ArrowUp'|| event.key === 'w') {
        event.preventDefault()
        moveUp()
    } else if(event.key === 'ArrowDown' || event.key === 's') {
        event.preventDefault()
        moveDown()
    } else if(event.key === " " || event.key === 'd') {
        event.preventDefault()
        shoot()
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

function shoot(){
    let laser = creatLaser()
    playArea.appendChild(laser)
    moveLaser(laser)
}

function creatLaser(){
    let xPosition = parseInt(window.getComputedStyle(ship).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(ship).getPropertyValue('top'));
    let newLaser = document.createElement('img');

    newLaser.src = 'src/images/laser.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 10}px`;
    return newLaser;
}

function moveLaser(laser){
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach((alien) => { 
            if(checkLaserCollision(laser, alien)) {
                alien.src = 'img/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
            }
        })

        if(xPosition === 340) {
            laser.remove();
        } else {
            laser.style.left = `${xPosition + 8}px`;
        }
    }, 10);
}
window.addEventListener("keydown", moveShip)