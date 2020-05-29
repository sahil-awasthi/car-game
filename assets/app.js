const score = document.querySelector('.score')
const startScreen = document.querySelector('.start-screen')
const gameScreen = document.querySelector('.game-screen')
let hotKey = {ArrowUp:false,ArrowDown:false,ArrowRight:false,ArrowLeft:false}
let player = {speed:6, score:0}
document.addEventListener('keydown',keydown)
document.addEventListener('keyup',keyup)

startScreen.addEventListener('click', start)

function isCollide(a,b){
  aRect = a.getBoundingClientRect()
  bRect = b.getBoundingClientRect()

  return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) ||(aRect.right < bRect.left) ||(aRect.left > bRect.right))
}

function moveLines(){
  let lines = document.querySelectorAll('.lines')

  lines.forEach((item) => {
    if(item.y>=900){
      item.y -=960
    }
    item.y += player.speed
    item.style.top =item.y + "px"
  });

}

function moveEnemy(mainCar){
  let enemy = document.querySelectorAll('.enemy')

  enemy.forEach(function(item) {

      if(isCollide(mainCar, item )){
        console.log('you are hit');
        endGame()
      }

    if(item.y>=750){
      item.y = -700
      item.style.left = Math.floor(Math.random()*350)+"px"
    }
    item.y += player.speed
    item.style.top =item.y + "px"
  });

}

function endGame(){
  player.start = false;
  startScreen.classList.remove('hide')
  gameScreen.classList.add('hide')
  gameScreen.innerHTML =""
  startScreen.innerHTML= "Game Over <br> Your final score is "+
  player.score+ " <br> Press here to restart the Game. ";
}



function gamePlay(){
  let mainCar = document.querySelector('.car-main')
  let road = gameScreen.getBoundingClientRect()

  if (player.start){
    moveLines()
    moveEnemy(mainCar)
    if (hotKey.ArrowUp && player.y >road.top + 100) {
      player.y -=player.speed;
    }
    if (hotKey.ArrowDown && player.y < (road.bottom - 130)) {
      player.y +=player.speed*1.5;
    }
    if (hotKey.ArrowRight && player.x <(road.width - 80)) {
      player.x +=player.speed;
    }
    if (hotKey.ArrowLeft && player.x > 0 ) {
      player.x -=player.speed;
    }
    mainCar.style.top = player.y + "px"
    mainCar.style.left = player.x + "px"
    window.requestAnimationFrame(gamePlay)
    player.score++
    let ps = player.score -1
    score.innerText ="Score: " + ps
  }
}

function start(){
  player.start = true
  player.score =0
  startScreen.classList.add('hide')
  gameScreen.classList.remove('hide')
  gameScreen.innerHTML =""
  window.requestAnimationFrame(gamePlay)

  for(x=0; x<6; x++){
    let roadLine = document.createElement('div')
    roadLine.setAttribute('class','lines')
    roadLine.y = (x*160)
    roadLine.style.top =roadLine.y + "px"
    gameScreen.appendChild(roadLine)
  }

  let mainCar = document.createElement('div')
  mainCar.setAttribute('class','car-main')
  gameScreen.appendChild(mainCar)

  player.x = mainCar.offsetLeft
  player.y = mainCar.offsetTop

  for(x=0; x<4; x++){
    let enemyCar = document.createElement('div')
    enemyCar.setAttribute('class','enemy')
    enemyCar.y = ((x+1) * 360) * -1
    enemyCar.style.top =enemyCar.y + "px"
    enemyCar.style.left = Math.floor(Math.random()*350)+"px"
    console.log(enemyCar.style.left)
    gameScreen.appendChild(enemyCar)
  }



}

function keydown(e){
  e.preventDefault()
  hotKey[e.key] = true
  }

function keyup(e){
  e.preventDefault()
  hotKey[e.key] = false
  }
