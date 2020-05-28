const score = document.getElementById('score')
const startScreen = document.querySelector('.start-screen')
const gameScreen = document.querySelector('.game-screen')
let hotKey = {ArrowUp:false,ArrowDown:false,ArrowRight:false,ArrowLeft:false}
let player = {speed:5}
document.addEventListener('keydown',keydown)
document.addEventListener('keyup',keyup)

startScreen.addEventListener('click', start)

function gamePlay(){
  let mainCar = document.querySelector('.car-main')
  let road = gameScreen.getBoundingClientRect()

  if (player.start){
    if (hotKey.ArrowUp && player.y >road.top + 100) {
      player.y -=player.speed;
    }
    if (hotKey.ArrowDown && player.y < (road.bottom - 90)) {
      player.y +=player.speed;
    }
    if (hotKey.ArrowRight && player.x <(road.width - 60)) {
      player.x +=player.speed;
    }
    if (hotKey.ArrowLeft && player.x > 0 ) {
      player.x -=player.speed;
    }
    mainCar.style.top = player.y + "px"
    mainCar.style.left = player.x + "px"
    window.requestAnimationFrame(gamePlay)
  }
}

function start(){
  player.start = true
  startScreen.classList.add('hide')
  gameScreen.classList.remove('hide')
  window.requestAnimationFrame(gamePlay)

  for(x=0; x<5; x++){
    let roadLine = document.createElement('div')
    roadLine.setAttribute('class','lines')
    roadLine.style.top =(x*150) + "px"
    gameScreen.appendChild(roadLine)
  }

  let mainCar = document.createElement('div')
  mainCar.setAttribute('class','car-main')
  gameScreen.appendChild(mainCar)

  player.x = mainCar.offsetLeft
  player.y = mainCar.offsetTop



}

function keydown(e){
  e.preventDefault()
  hotKey[e.key] = true
  }

function keyup(e){
  e.preventDefault()
  hotKey[e.key] = false
  }
