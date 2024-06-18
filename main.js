const health=100

let centreX=400
let centreY=300
click=false
let pos=[0,0]
let blockArray=[]
const canvas = document.getElementById("gameboardCanvas");
const ctx = canvas.getContext("2d");

function baseLine(){
    ctx.moveTo(0,450)
    ctx.lineTo(800,450)
    ctx.lineTo(800,600)
    ctx.lineTo(0,600)
    ctx.lineTo(0,450)
    ctx.fillStyle = "black";
    ctx.fill()


    
}






function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log("Coordinate x: " + x,"Coordinate y: " + y);
    console.log(ctx)
    pos[0]=x
    pos[1]=y

}


class Block{
    constructor(x,y,size,color){
        this.x=x
        this.y=y
        this.size=size
        this.color=color
        
    }
    
    show(){

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    
    
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




}
const player=new Player(centreX,centreY,150,'red')

function animate(){
    requestAnimationFrame(animate)  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    baseLine()
    if(click){
        blockArray.forEach((block)=>block.show())

    }
    

    player.draw()
    

    
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
    });


    let canvasElem = document.querySelector("canvas");
    canvasElem.addEventListener("mousedown", function (e) {
        click=true
        getMousePosition(canvasElem, e);
        const block=new Block(pos[0],pos[1],50,'blue')
        blockArray.push(block)

        
        

    }
); 



        



 



            
        
        
        

    
}




    

    
      



      




