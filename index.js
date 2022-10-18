//character declared here
let character = document.getElementById('character');

//defining the parameters of said character 
let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));

let characterRight = parseInt(window.getComputedStyle(character).getPropertyValue('right'));

let characterWidth = parseInt(window.getComputedStyle(character).getPropertyValue('width'));

// the ground parameters
let floor = document.getElementById('floor');

let floorBottom = parseInt(window.getComputedStyle(floor).getPropertyValue('bottom'));

let floorHeight = parseInt(window.getComputedStyle(floor).getPropertyValue('height'));

// game default start
let isJumping = false;

let upTime;

let downTime;

let displayScore = document.getElementById('score');

let score = 0;

let displayHighScore = document.getElementById('highScore')

let highScore = 0;
// the infamous "jump" function 
function jump(){
  // allows jumping to re occur
  if(isJumping) return;
  //jump parameters
   upTime = setInterval(() => {
   // the height the lil guy will jump
    if(characterBottom >= floorHeight + 750){
      
      clearInterval(upTime);

       downTime = setInterval(() => {

        if(characterBottom <= floorHeight + 20){

          clearInterval(downTime);

          isJumping = false;
        }

        characterBottom -= 35;

        character.style.bottom = characterBottom + 'px';

       }, 20);

    }
     characterBottom += 40;

      character.style.bottom = characterBottom + 'px';

       isJumping = true;
     
   }, 20);

  }
  // score function
  function theScore(){

    score++;

    displayScore.innerText = score;

    if(score++) return;
  }
  console.log(theScore);


  setInterval(theScore, 100)
// highest score function
  function keepScore () {
  if(score  > highScore) highScore = score;
   displayHighScore.innerText = highScore;
  console.log(keepScore)
  }
  
  keepScore();

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

    let obstacleHeight = Math.floor(Math.random() * 120) + 120;

    function moveObstacle(){
      obstacleRight += 15;

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



