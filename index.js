//character declared here
let character = document.getElementById('character');

//defining the parameters of said character 
let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));

let characterRight = parseInt(window.getComputedStyle(character).getPropertyValue('right'));

let characterWidth = parseInt(window.getComputedStyle(character).getPropertyValue('width'));

// the ground parameters
let ground = document.getElementById('ground');

let groundBottom = parseInt(window.getComputedStyle(ground).getPropertyValue('bottom'));

let groundHeight = parseInt(window.getComputedStyle(ground).getPropertyValue('height'));

// game default start
let isJumping = false;

let upTime;

let downTime;

// the infamous "jump" function 
function jump(){

  if(isJumping) return;

   upTime = setInterval(() => {

    if(characterBottom >= groundHeight + 350){

      clearInterval(upTime);

       downTime = setInterval(() => {

        if(characterBottom <= groundHeight + 20){

          clearInterval(downTime);

          isJumping = false;
        }

        characterBottom -= 20;

        character.style.bottom = characterBottom + 'px';

       }, 20);

    }
     characterBottom += 20;

      character.style.bottom = characterBottom + 'px';

       isJumping = true;
     
   }, 20);

  }

   // obstacles
   function generateObstacle(){

    let obstacles = document.querySelector('.obstacles');

    let obstacle = document.createElement('div');

    obstacle.setAttribute('class', 'obstacle');

    obstacles.appendChild(obstacle);


    let randomTimeout = Math.floor(Math.random() * 1000) + 1000; 

    let obstacleRight = -30;

    let obstacleBottom = 100;

    let obstacleWidth = 30;

    let obstacleHeight = Math.floor(Math.random() * 150) + 150;

    function moveObstacle(){
      obstacleRight += 5;

      obstacle.style.right = obstacleRight + 'px';

      obstacle.style.bottom = obstacleBottom + 'px';

      obstacle.style.width = obstacleWidth + 'px';

      obstacle.style.height = obstacleHeight + 'px';

      if(characterRight >= obstacleRight - characterWidth && characterRight <= obstacleRight + obstacleWidth && characterBottom <= obstacleBottom + obstacleHeight){

        alert('Game Over !');

        clearInterval(obstacleInterval);

        clearTimeout(obstacleTimeout);
        
        location.reload();
      }
    }
    let obstacleInterval = setInterval(moveObstacle, 20);

    let obstacleTimeout = setTimeout(generateObstacle, randomTimeout);

   }
   generateObstacle();


function control(e){
  if (e.key == 'ArrowUp' || e.key == ' '){
    jump();
  }
}

document.addEventListener('keydown', control);



