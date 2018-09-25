//Some gameboard parameters
//grid size - 505x536
//101 - horizontal / 83 vertical - grid/move


// Enemies our player must avoid
var Enemy = function(startX, startY) {
    // Variables applied to each of our instances go here,
    //randomize start
    this.x = Math.floor((Math.random() * 5) + 0) * 101;
    this.y = startY;
    //randomize speed(make this vary everytime Enemy is drawn)
    this.speed = Math.floor((Math.random() * 400) + 100);
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    //grid horizontal measurment
    this.horiz = 101;
    //Left boundary placing the enemy out of view
    this.left = -101;
    //right boundary
    this.right = this.horiz * 5;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < this.right) {
      //test boundary check the 10 value
      this.x += this.speed * dt;
    }
    else {
      //resets enemy bug to left position
      //speed is redefined each time an enemy is released
      this.speed = Math.floor((Math.random() * 400) + 100);
      this.x = this.left;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //console.log(this.y);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class playerOne {
  constructor() {
    //define horizontal movement for player
    this.horiz = 101;
    //define vertical movement for player
    this.vert = 83;
    //start horizontal position for player
    this.startX = this.horiz * 2;
    //stary vertical position for player
    this.startY = this.vert * 5;
    //assign start values to begin game
    this.x = this.startX;
    this.y = this.startY;
    //Player win setting
    this.won = false;
    //player lives start
    this.startLives = 3;
    //player lives
    this.lives = this.startLives;
    //player collisions
    this.collision = false;
    //sprite to render
    this.sprite = 'images/char-boy.png';
    //lives display proxy
    this.proxy = 'images/char-boy-proxy.png';
  }
  //update position based on keystrokes
  handleInput(input){
    if(input === 'left'){
      if(this.x > 0){
      //checkboundry
      this.x -= this.horiz;
    }
    }
    if(input === 'right'){
      if (this.x < this.horiz * 4){
      //checkboundry
      this.x += this.horiz;
      }
    }
    if(input === 'up'){
      if(this.y > 0){
      //checkboundry
      this.y -= this.vert;
      //see if player has won and reset
      if(this.y === 0){
        this.won = true;
      }
      }

    }
    if(input === 'down'){
      if(this.y < this.vert * 5){
      //checkboundry
      this.y += this.vert;
      }
    }

  }
  render() {
    //draw player
    //taken from enemy sample
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  reset() {
    // player starting coordinates
    this.x = this.startX;
    this.y = this.startY;
    this.won = false;
    this.lives = this.startLives;
  }
}

playerOne.prototype.update = function(){
  //Check for collisions
  for(let enemy of allEnemies){
    if(this.y === enemy.y && (enemy.x + enemy.horiz/2 > this.x && enemy.x < this.x + this.horiz/2)){
      //Collision detected
      //remove life from player
      this.lives = this.lives - 1;
      //convert collision indicator to true
      this.collision = true;
      //reset player position
      this.x = this.startX;
      this.y = this.startY;
      }
    }
  }



// Now instantiate your objects.
var allEnemies = [];
var enemyOne = new Enemy(0, 83);
var enemyTwo = new Enemy(0, 83*2);
var enemyThree = new Enemy(0, 83*3);

// Place all enemy objects in an array called allEnemies
allEnemies.push(enemyOne,enemyTwo,enemyThree);

// Place the player object in a variable called player
var player = new playerOne();
//possible function that adds enemies
//** finish everything else **//


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
