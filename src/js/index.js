const ship = document.querySelector('.hero')
const playArea = document.querySelector('.game-area')
const aliensImage = ['src/images/monster-1.png', 'src/images/monster-2.png', 'src/images/monster-3.png']
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');
let alienInterval;

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
    let xPosition = parseInt(window.getComputedStyle(ship).getPropertyValue('left'))
    let yPosition = parseInt(window.getComputedStyle(ship).getPropertyValue('top'))
    let newLaser = document.createElement('img')

    newLaser.src = 'src/images/laser.png'
    newLaser.classList.add('laser')
    newLaser.style.left = `${xPosition}px`
    newLaser.style.top = `${yPosition - 10}px`
    return newLaser
}

function moveLaser(laser){
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left)
        let aliens = document.querySelectorAll('.alien')

        aliens.forEach((alien) => { 
            if(checkLaserCollision(laser, alien)) {
                alien.src = 'src/images/explosion.png'
                alien.classList.remove('alien')
                alien.classList.add('dead-alien')
            }
        })

        if(xPosition === 340) {
            laser.remove()
        } else {
            laser.style.left = `${xPosition + 8}px`
        }
    }, 10)
}

function createAliens() {
    let newAlien = document.createElement('img')
    let alienSprite = aliensImage[Math.floor(Math.random() * aliensImage.length)]

    newAlien.src = alienSprite
    newAlien.classList.add('alien')
    newAlien.classList.add('alien-transition')
    newAlien.style.left = '370px'
    newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`
    playArea.appendChild(newAlien)
    moveAlien(newAlien)
}

function moveAlien(alien) {
    let moveAlienInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'))
        if(xPosition <= 50) {
            if(Array.from(alien.classList).includes('dead-alien')) {
                alien.remove()
            } else {
                gameOver()
            }
        } else {
            alien.style.left = `${xPosition - 4}px`
        }
    }, 30)
}

function checkLaserCollision(laser, alien) {
    let laserTop = parseInt(laser.style.top)
    let laserLeft = parseInt(laser.style.left)
    let laserBottom = laserTop - 20
    let alienTop = parseInt(alien.style.top)
    let alienLeft = parseInt(alien.style.left)
    let alienBottom = alienTop - 30
    if(laserLeft != 340 && laserLeft + 40 >= alienLeft) {
        if(laserTop <= alienTop && laserTop >= alienBottom) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

startButton.addEventListener('click', (event) => {
    playGame()
})

function playGame() {
    startButton.style.display = 'none'
    instructionsText.style.display = 'none'
    window.addEventListener('keydown', moveShip)
    alienInterval = setInterval(() => {
        createAliens()
    }, 2000)
}

function gameOver() {
    window.removeEventListener('keydown', moveShip)
    clearInterval(alienInterval)
    let aliens = document.querySelectorAll('.alien')
    aliens.forEach((alien) => alien.remove())
    let lasers = document.querySelectorAll('.laser')
    lasers.forEach((laser) => laser.remove())
    setTimeout(() => {
        alert('game over!');
        ship.style.top = "250px"
        startButton.style.display = "block"
        instructionsText.style.display = "block"
    })
}