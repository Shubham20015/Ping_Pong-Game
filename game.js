const ball = document.querySelector('.ball');
const board = document.querySelector('.board');
const leftPaddle = document.querySelector('.left');
const rightPaddle = document.querySelector('.right');
let boardCords = board.getBoundingClientRect();
let leftPlayerLives=3;
let rightPlayerLives=3;
let x = true,y = true;

// User Input
document.addEventListener("keydown", (e)=> {
    if(e.key == "w"){
        movePaddle(leftPaddle,-window.innerHeight*0.05);
    }
    else if(e.key == "s"){
        movePaddle(leftPaddle,window.innerHeight*0.05);
    }
    else if(e.key == "ArrowUp"){
        movePaddle(rightPaddle,-window.innerHeight*0.05);
    }
    else if(e.key == "ArrowDown"){
        movePaddle(rightPaddle,window.innerHeight*0.05);
    }
})

function movePaddle(currPaddle,change){
    let currPaddleCords = currPaddle.getBoundingClientRect();
    if(currPaddleCords.top +change >= boardCords.top && currPaddleCords.bottom +change <= boardCords.bottom){
        currPaddle.style.top = currPaddleCords.top+change+"px"
    }
}

function resetGame(){
    ball.style.top = innerHeight*0.46+"px";
    ball.style.left = innerWidth*0.49+"px";
    requestAnimationFrame(moveBall);
}

function setColor(idx){
    let allicons = document.querySelectorAll(".fas.fa-circle");
    allicons[idx].style.color = "#686de0"
}

function moveBall(){
    let ballCords = ball.getBoundingClientRect();
    let ballTop = ballCords.top;
    let ballBottom = ballCords.bottom;
    let ballLeft = ballCords.left;
    let ballRight = ballCords.right;

    // Check if collide with any players horizontal boundary
    let hasTouchedLeft = ballLeft<boardCords.left; 
    let hasTouchedright = ballRight>boardCords.right; 

    if(hasTouchedLeft || hasTouchedright){
        if(hasTouchedright){
            leftPlayerLives--;
            setColor(3+leftPlayerLives);
            if(leftPlayerLives == 0){
             alert("Game over Player 🅰️ won");
             document.location.reload();
            }  
            else return resetGame();
        }else{
            rightPlayerLives--;
            setColor(rightPlayerLives);
            if(rightPlayerLives == 0){
                alert("Game over Player 🅱️ won");
                document.location.reload();
            }  
            else return resetGame();
        }
    }

    // HandleVerticalBound
    if(ballTop <= boardCords.top || ballBottom >= boardCords.bottom){
        x = !x;
    }
    // HandleHorizontalBound
    // if(ballLeft <= boardCords.left || ballRight >= boardCords.right){
    //     y = !y;
    // }

    // Collision between paddle and ball
    let leftPaddleBounds = leftPaddle.getBoundingClientRect(); 
    let rightPaddleBounds = rightPaddle.getBoundingClientRect(); 
    // For left paddle
    if(ballLeft <= leftPaddleBounds.right && ballRight >= leftPaddleBounds.left && ballTop+30 >= leftPaddleBounds.top && ballBottom+30 <= leftPaddleBounds.bottom){
        y = !y;
    }
    // For right paddle
    if(ballLeft <= rightPaddleBounds.right && ballRight >= rightPaddleBounds.left && ballTop+30 >= rightPaddleBounds.top && ballBottom+30 <= rightPaddleBounds.bottom){
        y = !y;
    }

    ball.style.top = x == true?ballTop+4+"px":ballTop-4+"px";
    ball.style.left = y == true?ballLeft+4+"px":ballLeft-4+"px";
    requestAnimationFrame(moveBall);
}

requestAnimationFrame(moveBall);