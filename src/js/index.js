const ship = document.querySelector('.hero')
const playArea = document.querySelector('.game-area')

function moveShip(event){
    if(event.key === 'ArrowUp'){
event.preventDeafut()
moveUp()
    } else if (event.key ==='ArrowDown'){
        event.preventDeafut()
        moveDown()
    } else if (event.key ==='KeyD'){
        event.preventDeafut()
        shoot()
    }
}