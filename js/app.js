//Defining global variables
var colWidth = 100;
var rowHeight = 80;
var numOfCol = 5;
var numOfRow = 6;
var pHeight = 80;
var pWidth = 80;

//Spawn of enmies
var maxSpawn = 3;
var disSpawn = colWidth;

// Setting the boundary lemit for canvas
var rightBoundary  = numOfCol * colWidth;
var bottomBoundary = numOfRow * rowHeight;

// Initial position for player
var startCol = 2;
var startRow = 5;

//Variable to dynamically change the values
var lives = document.getElementsByClassName(".fa-heart");


// Randomly creating Enemies
var minEnemies = 3;
var maxEnemies = 6;
var totalEnemies = Math.floor((Math.random() * (maxEnemies-minEnemies))) + minEnemies;


// Creating Enemy class and defining its properties
var Enemy = function(id){
  this.id = id;
  this.width = pWidth;
  this.height = pHeight;
  this.sprite = 'images/enemy-bug.png';
  this.reset();
};


// Creating update function for enemy class
Enemy.prototype.update = function(dt){
      // If enemy is moving then update the coordinates
      if(this.moving){
        this.x = Math.round(this.x + (dt * this.speed));
        //check the x coordinate is not outside the boundary
        if(this.x > rightBoundary){
          this.reset();
        }
        else{
          this.spawn();
        }
      }
      //Make moving true for enemy
      this.moving = true;
};


//Create enemy image for game
Enemy.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Reset enemy for game for start position
Enemy.prototype.reset = function(){
  this.moving=false;
  this.row = Math.floor((Math.random()*3)+1);
  this.x = -colWidth;
  this.y = this.row * rowHeight;
  this.speed = (4-this.row) *150;
}

//Creating more enemies for game
Enemy.prototype.spawn = function(){
  var spawnedOnSameRow = 0;
  for(var i = 0; i <allEnemies.length ;i++){
    if ((allEnemies[i].id != this.id) && (allEnemies[i].row == this.row)
     && allEnemies[i].moving ) {
      if (allEnemies[i].x < disSpawn) {
        return;
      }
      spawnedOnSameRow++;
    }
  }
  // If max enemies are not in the row then create more in the same row
  if (spawnedOnSameRow < maxSpawn) {
    this.moving = true;
  }
}

var win = document.getElementById("win-strike");

var noOfWins = 0;
// Creating Player class
var Player = function(){
  this.reset();
  this.height = pHeight;
  this.width = pWidth;
  this.sprite = 'images/char-boy.png';
  // setTimer();
}


//Cretaing update funtion for player class
Player.prototype.update = function(){
  // var noOfWins = 0;

  if (this.moving) {
    this.x = this.col * colWidth;
    this.y = this.row * rowHeight;
    this.moving = false;
  }
  if(this.y ===  0 ){
    noOfWins+=1;
    // If player reach water level player wins the game
    // console.log("Win Win Win");
    //Reset the game after win
    win.innerHTML = noOfWins;
    this.reset();
  }
}


Player.prototype.lastFunction = function(){
  noOfWins = 0;
  win.innerHTML = noOfWins;
}


//Creating player image for player image
Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};




// Method to handle input keys
Player.prototype.handleInput  = function(keyCode){
  if(keyCode == 'left'){
    //If up key is presse then move 1 column to left
    if(this.x >= colWidth){
      this.col-=1;
      console.log(this.x);
      console.log(colWidth);

    }

  }

  // If up key is pressed move one row to upside
  else if (keyCode=='up') {
    if(this.y >= rowHeight ){
      this.row-=1;
    }


  }
  // If right key is pressed then press 1 row to right side
  else if (keyCode== 'right') {
    if(this.x < (rightBoundary - colWidth)){
      this.col+=1;
    }

  }
  // If down key is pressed then move one row  to downside
  else if (keyCode== 'down') {
    if(this.y < (bottomBoundary - rowHeight)){
      this.row+=1;
    }

  }

  this.moving = true;
}

//Reset player
Player.prototype.reset = function(){
  // Initializing player position
  this.col = startCol;
  this.row = startRow;

  // Initializing player coordinates
  this.x = this.col * colWidth;
  this.y = this.row * rowHeight;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
 for(var enemy=0; enemy<= totalEnemies ; enemy++){
   allEnemies.push(new Enemy(enemy));
 }

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
