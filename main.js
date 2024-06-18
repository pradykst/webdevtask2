const health=100




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


    function draw(x,y) {
        const canvas = document.getElementById("canvas");
        if (canvas.getContext) {
          const ctx = canvas.getContext("2d");

          ctx.fillStyle = "rgb(255, 0, 0)";
          ctx.fillRect(x, y, 100, 150);

          
        }
      }

    const centreX=400
    const centreY=300


    draw(400,300);

    window.addEventListener("keydown", checkKeyPressed, false);

    function checkKeyPressed(evt) {
        if (evt.keyCode == "13") {
            alert("You pressed 'enter'.");
        }
    }
      



      
}