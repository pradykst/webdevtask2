const health=100
const playerSpeed=50
const playerJump=1
let centreX=400
let centreY=300

const canvas = document.getElementById("gameboardCanvas");
const ctx = canvas.getContext("2d");


class Player{
    constructor(x,y,size,color){
        this.x=x
        this.y=y
        this.size=size
        this.color=color
        this.jumpHeight=10
        this.shouldJump=false
        this.jumpCounter=0

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

    draw(){
        this.jump()
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.size/2,this.size);


    
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

    const player=new Player(centreX,centreY,150,'red')

    function animate(){
        requestAnimationFrame(animate)  
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        player.draw()

        
    }
    animate()


    
    addEventListener("keydown", e => {
        if(e.code === 'Space'){
            if(!player.shouldJump){
                player.jumpCounter = 0;
                player.shouldJump = true;

            }
        }
    });



        

        // if (evt.keyCode == "68") {
        //     centreX+=playerSpeed
        //     // alert(centreX)
        //     ctx.clearRect(0, 0, canvas.width, canvas.height);
        //     draw();

        
        // }

        // if (evt.keyCode=='65'){
        //     centreX-=playerSpeed 
        //     ctx.clearRect(0, 0, canvas.width, canvas.height);
        //     draw();

        // }

 



            
        
        
        

    
}




    

    
      



      




