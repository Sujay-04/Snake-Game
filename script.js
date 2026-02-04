const board = document.querySelector(".board");
const blockHeight=10;
const blockWidth=10;
const modal =document.querySelector('.modal');
const StartBtn = document.querySelector('.btn-start');
const RestartBtn = document.querySelector('.btn-restart');
const gameOver =document.querySelector('.game-over');
const startgame =document.querySelector('.start-game')


let cols = Math.floor(board.clientWidth/blockWidth);
let rows = Math.floor(board.clientHeight/blockHeight);
let IntervalId=null;
let food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
const blocks=[];
const snakeLength = 3;

// random starting point
let startX = Math.floor(Math.random() * rows);
let startY = Math.floor(Math.random() * (cols - snakeLength));

// snake generate
let snake = [];

for (let i = 0; i < snakeLength; i++) {
    snake.push({
        x: startX,
        y: startY + i
    });
}


// const snake=[
//   {x:1,y:3},
//   {x:1,y:4},
//   {x:1,y:5},
// ];
let direction ='right';
for (let row = 0; row < rows; row++) {
    
  for (let col = 0; col < cols; col++) {
    
    const box = document.createElement('div');
    box.classList.add('box');
    board.appendChild(box);
    blocks [`${row}-${col}`]=box;
    
    
  }}

function render(){
  let head=null;
  blocks[`${food.x}-${food.y}`].classList.add('food')
  if(direction=='left'){
    head={x:snake[0].x,y:snake[0].y-1}
  }
  else if(direction=='right'){
    head={x:snake[0].x,y:snake[0].y+1}
  }
  else if(direction=='down'){
    head={x:snake[0].x+1,y:snake[0].y}
  }
  else if(direction=='up'){
    
    head={x:snake[0].x-1,y:snake[0].y}
    
  }
  if(head.x<0 || head.y<0 ||head.x>=rows||head.y>=cols){
    
    clearInterval(IntervalId);
    modal.style.display='flex';
    startgame.style.display='none';
    gameOver.style.display='flex';
    return;

  }
  if(head.x==food.x && head.y==food.y){
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
    blocks[`${food.x}-${food.y}`].classList.add("food");
    snake.unshift(head);
  }
  
  snake.forEach((seagment)=>{
    blocks[`${seagment.x}-${seagment.y}`].classList.remove('fill');
  })
  snake.unshift(head);
  snake.pop()
  snake.forEach((seagment)=>{
    blocks[`${seagment.x}-${seagment.y}`].classList.add('fill')
  })
}
StartBtn.addEventListener('click',()=>{
  modal.style.display='none';
  IntervalId= setInterval(() => {
  render()
}, 100);
})
RestartBtn.addEventListener('click',Restartgame)
function Restartgame(){
  modal.style.display='none';
   blocks[`${food.x}-${food.y}`].classList.remove("food");
  snake.forEach((seagment)=>{
    
    
    blocks[`${seagment.x}-${seagment.y}`].classList.remove('fill');
  })
  
    snake=[];

  for (let i = 0; i < snakeLength; i++) {
    snake.push({
        x: startX,
        y: startY + i
    });
}
  
  food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
  IntervalId= setInterval(() => {
  render()
}, 100);
  
  

}

addEventListener('keydown',(event)=>{
  if(event.key=="ArrowUp"){
    direction="up";
  }
  else if(event.key=='ArrowDown'){
    direction="down"
  }
  else if(event.key=='ArrowRight'){
    direction="right"
  }
  else if(event.key=='ArrowLeft'){
    direction="left"
  }
  
})