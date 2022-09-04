// Game Constants and Variables
let inputDir={x:0,y:0};
const foodSound=new Audio('music/SnakeFood.mp3');
const gameOverSound=new Audio('music/SnakeGameover.mp3');
const backgroundSound=new Audio('music/SnakeBG.mp3');
const moveSound=new Audio('music/SnakeDirectionChange.mp3');
let speed=8;
let score=0;
let lastPaintTime=0;
let snakeArr=[{x:13,y:15}]; // Snake is an array
let food={x:6,y:7}; // Food is an Object

// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snake){ // snake array
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){ // Snake head collide with its body
            return true;
        }
    }
        // If you bump into wall
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
            return true;
        }
        return false;
}
function gameEngine(){
    // Part 1 : Updating the snake array and Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        backgroundSound.pause();
        inputDir={x:0,y:0};
        alert('Game Over . Press any key to play again');
        snakeArr=[{x:13,y:15}];
        backgroundSound.play();
        score=0;
    }
    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        score++;
        if(score>highScoreVal){
            highScoreVal=score;
            localStorage.setItem('highScore',JSON.stringify(highScoreVal));
            highScoreBox.innerHTML="High Score : "+highScoreVal;
        }
        scoreBox.innerHTML="Score : "+score;
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=1; // We have 18X18 Grid
        let b=17; 
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}; // We Want to generate random number between a & b (to add food)
    }

    // Moving the snake
    for (let i = snakeArr.length-2; i >= 0; i--) {
        // const element = array[i];
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    // Part 2 : Display the snake and Food
    // Display the Snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display the food
    snakeArr.forEach((e,index)=>{
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
    });

}


// Main Logic Starts Here
let highScore=localStorage.getItem('highScore');
if(highScore==null){
    highScoreVal=0;
    localStorage.setItem('highScore',JSON.stringify(highScoreVal));
}
else{
    highScoreVal=JSON.parse(localStorage.getItem('highScore'));
    highScoreBox.innerHTML="High Score : "+highScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}; // Start the game
    backgroundSound.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;
            case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;
            case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;
            case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;
    
        default:
            break;
    }
});