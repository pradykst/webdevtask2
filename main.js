


// controls W A D to move up left and right
// click on the screen to build defense blocks
//click go to start zombies
//click again to get direction for bullet shoot

const numBlocks=2
let centreX=400
let centreY=300
let click=false
let pos=[0,0]
let blockArray=[]
const canvas = document.getElementById("gameboardCanvas");
const ctx = canvas.getContext("2d");
let canvasElem = document.querySelector("canvas");
let goBut=false
let zomXLeft=0
let zomXRight=800
let zombieArrayL=[]
let zombieArrayR=[]
const maxZombies=5
let allblocks=false
let tan=null
let angle=null
let zombieTimerid=null
let lifeDec=0
let gameover=false
let frames
let blockTouch=false
let aX=0
let aY=0
let sX=0
let sY=0

//for the projectile bomb
// Tower position
const towerX = 50;
const towerY = canvas.height - 100;

// Target position
let targetX = canvas.width - 100;
let targetY = canvas.height - 50;

// Bomb position and velocity
let bombX = towerX + 20;
let bombY = towerY;
let bombVX = 0;
let bombVY = 0;

// Flag to indicate if bomb is fired
let bombFired = false;

function initialiseGame(){
    
    centreX=400
    centreY=300
    click=true
    pos=[0,0]
    blockArray=[]
    goBut=false
    zomXLeft=0
    zomXRight=800
    zombieArrayL=[]
    zombieArrayR=[]
    allblocks=false
    tan=null
    zombieTimerid=null
    lifeDec=0
    gameover=false
    frames
    blockTouch=false
    aX=0
    aY=0
    sX=0
    sY=0

    canvasElem.removeEventListener("mousemove",mouseMoveHandler)
    canvasElem.removeEventListener("mousedown",mouseDownHandler)

    resetBomb()

    startGame()


}




function baseLine(){
    ctx.moveTo(0,450)
    ctx.lineTo(800,450)
    ctx.lineTo(800,600)
    ctx.lineTo(0,600)
    ctx.lineTo(0,450)
    ctx.fillStyle = "black";
    ctx.fill()


    
}






function getMousePosition(event) {
    let rect = canvasElem.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log("Coordinate x: " + x,"Coordinate y: " + y);
    console.log(ctx)
    pos[0]=x
    pos[1]=y

}

function mouseMoveHandler(event) {
    let rect = canvasElem.getBoundingClientRect();
    aX = event.clientX - rect.left;
    aY = event.clientY - rect.top;
    sX=player.x+player.size/4
    sY=player.y+5
    console.log(aX,aY)
    tan=(aY-sY)/(aX-sX)
    console.log(tan)

    // angle = Math.atan2(mouseY - towerY, mouseX - towerX);
    angle = Math.atan(tan);
    



 
}

function mouseDownHandler(e){
    click=true
    getMousePosition(e);

    if(blockArray.length<numBlocks){
        const block=new Block(pos[0],pos[1],50,'blue')
        blockArray.push(block)

    }
    else{
        allblocks=true
        console.log('uefa')
    }
    document.getElementById('startzombies').style.display='block'
}

class Block{
    
    constructor(x,y,size,color){
        this.x=x
        this.y=y
        this.size=size
        this.color=color
        this.active=true
        
    }
    
    show(){

        if(this.active){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);

        }
        


        


    
    
    }
    
}



class Zombie{
    constructor(x,y,size,color){
        this.x=x
        this.y=y
        this.size=size
        this.color=color
    }

    spawn(){
        ctx.fillStyle=this.color
        ctx.fillRect(this.x,this.y,this.size/3,this.size)

        blockArray.forEach((block)=>{
            if(block.y>300){
                if(this.x+15==block.x+25){
                    block.active=false
                }
                

            }

        })
    }

}






class Player{
    constructor(x,y,size,color){
        this.x=x
        this.y=y
        this.size=size
        this.color=color
        this.jumpHeight=10
        this.shouldJump=false
        this.jumpCounter=0
        this.moveRight=false
        this.moveLeft=false
        this.playerSpeed=5
        this.leftcounter=0
        this.rightcounter=0

    }

    jump(){
        if(this.shouldJump){
            this.jumpCounter++
            if(this.jumpCounter<15){
                this.y-=this.jumpHeight
            }
            else if(this.jumpCounter>14 && this.jumpCounter<19){
                this.y+=0
            }
            else if(this.jumpCounter<33){
                this.y+=this.jumpHeight
            }

            if (this.jumpCounter>=32){
                this.shouldJump=false
            }

        }
    }

    fmoveleft(){
        if(this.moveLeft){
            this.leftcounter++
            if(this.leftcounter<11){
                this.x-=this.playerSpeed

            }
            if(this.leftcounter>=10){
                this.moveLeft=false
            }
            
            
        }



    }

    fmoveright(){
        if(this.moveRight){
            this.rightcounter++
            if(this.rightcounter<11){
                this.x+=this.playerSpeed
    
            }
            if(this.rightcounter>=10){
                this.moveRight=false
            }

        }


    }

    draw(){
        this.jump()
        this.fmoveleft()
        this.fmoveright()
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.size/2,this.size);




    
    }

    life(){
        ctx.fillStyle="#8ED6FF"
        ctx.fillRect(this.x-10,this.y-15,95,10)
        ctx.clearRect(this.x-9.5, this.y-14.5,lifeDec, 9)
    }

    line(){
        ctx.setLineDash([5, 3])
        ctx.beginPath();
        ctx.moveTo(sX, sY);
        ctx.lineTo(aX, aY);
        // ctx.lineWidth = 10;
        // ctx.lineCap = "round"
        ctx.strokeStyle = "white";
        ctx.stroke();
    }

    




}
const player=new Player(centreX,centreY,150,'red')





function spawnZombies(){
    if(zombieArrayR.length<=maxZombies){
        const zombieLeft=new Zombie(zomXLeft,350,100,'white')
        zombieArrayL.push(zombieLeft)
        const zombieRight=new Zombie(zomXRight,350,100,'white')
        zombieArrayR.push(zombieRight)

    }

    else{
        clearInterval(zombieTimerid)
    }


        


}




function zombies(){
    if(goBut){

        zombieArrayL.forEach((zombie)=>{
            zombie.spawn()

            if(zombie.x+33==player.x){
                zombie.x+=0
                
                // console.log(lifeDec)
                if(lifeDec<94){
                    lifeDec+=0.1
            
            
                }
                else{
                    gameover=true
                }

            }
            else{
                zombie.x+=0.25
            }
            
        }
          

    )
        
        
        
        zombieArrayR.forEach((zombie)=>{
            zombie.spawn()

            if(zombie.x==player.x+75){
                zombie.x+=0

                // console.log(lifeDec)
                if(lifeDec<94){
                    lifeDec+=0.1
            
            
                }
                else{
                    gameover=true
                }
            }
            else{
                zombie.x-=0.25


            }


            
        }
        

    )

        



    }

    

}

function animate(){
    if(!gameover){
        frames=requestAnimationFrame(animate)  
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        baseLine()
        if(click){
            blockArray.forEach((block)=>block.show())
    
        }
    
        if(allblocks){
            
            canvasElem.addEventListener("mousemove", mouseMoveHandler)
            
        }
        
    
        player.draw()
        player.life() //should call only when zombies hit
        player.line()
        zombies()

        bombProjectile()

    }
    else{
        alert("GAME OVER !!")
        cancelAnimationFrame(frames)
        initialiseGame()
    }


    

    
}



function startGame(){
    document.getElementById('startGame').style.display='none'
    // create 2d world
    //spawn character
    //spawn defense blocks with adjustable pos (base)

    //startgame...
    //zombies attack(move) from both sides
    //if zombie hit base block it should get destroyed
    //zombie move until character is touched and health of character should decrease
        //if char health =0
            //game end
    //character
        //addeventlistener wad  jump left right 
        //shoot bullet projectile
            // bullet hit zombie destroyed
        //add a scoringsystem how many zombies killed 
        //leaderboard
    
    //pause and play features

    
    animate()





    
    
    



    
    
    addEventListener("keydown", e => {
        if(e.code === 'KeyW'){
            if(!player.shouldJump){
                player.jumpCounter = 0;
                player.shouldJump = true;

            }
        }
        if(e.code=== 'KeyA'){
            if(!player.moveLeft){
                player.leftcounter = 0;
                player.moveLeft = true;

            }

        }
        if(e.code=== 'KeyD'){
            if(!player.moveRight){
                player.rightcounter = 0;
                player.moveRight = true;

            }
            
            
            
        }
        if(e.code === 'Space'){
            handleFire(e);
        }
    });


    canvasElem.addEventListener("mousedown", mouseDownHandler); 

    
}

        // Function to update the game state
        function bombProjectile() {
            // Draw the tower
            ctx.fillStyle = 'gray';
            ctx.fillRect(towerX, towerY, 40, 100);

            // Draw the target
            ctx.fillStyle = 'red';
            ctx.fillRect(targetX, targetY, 50, 50);

            // Draw the bomb if fired
            if (bombFired) {
                // Update bomb position
                bombX += bombVX;
                bombY += bombVY;

                // Apply gravity to the bomb
                bombVY += 0.1;

                // Draw the bomb
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(bombX, bombY, 10, 0, Math.PI * 2);
                ctx.fill();

                // Check if the bomb hits the target
                if (bombY >= targetY && bombX >= targetX && bombX <= targetX + 50) {
                    resetBomb()
                    // Bomb hit the target
                    // alert('Target hit!');
                    // resetGame();
                }

                // Check if the bomb goes out of bounds
                if (bombY > canvas.height) {
                    resetBomb();
                    // Bomb missed the target
                    // alert('Missed!');
                    // resetGame();
                }
            }
        }

        // Function to handle mouse click event
        function handleFire(event) {
            if (!bombFired) {
                // Calculate the velocity based on mouse position
                // const mouseX = event.clientX - canvas.offsetLeft;
                // const mouseY = event.clientY - canvas.offsetTop;
                // const angle = Math.atan2(mouseY - towerY, mouseX - towerX);
                const speed = 8;
                bombVX = Math.cos(angle) * speed;
                bombVY = Math.sin(angle) * speed;

                // Set the bomb as fired
                bombFired = true;
            }
        }

        function resetBomb(){
            bombFired = false;
            bombX = towerX + 20;
            bombY = towerY;
            bombVX = 0;
            bombVY = 0;
        }
