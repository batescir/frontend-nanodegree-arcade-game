//grid 505x536
//101x83 - ever other move
//sharded area start

// Enemies our player must avoid
var Enemy = function(startX, startY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    //randomize start
    this.x = Math.floor((Math.random() * 5) + 0) * 101;
    this.y = startY;
    //randomize speed(make this vary everytime Enemy is drawn)
    this.speed = Math.floor((Math.random() * 400) + 100);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //grid measurment
    this.horiz = 101;
    //Left boundary
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
      this.speed = Math.floor((Math.random() * 400) + 100);
      this.x = this.left;
    }
    // if enemy still inbounds
      //move forward
      //increment x by s
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
    this.horiz = 101;
    this.vert = 83;
    this.startX = this.horiz * 2;
    this.startY = this.vert * 5;
    this.x = this.startX;
    this.y = this.startY;
    console.log(this.x);
    console.log(this.y);
    this.sprite = 'images/char-boy.png';
  }
  //update position
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
    //taken from enemy sample
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // keyboard inputs

}

playerOne.prototype.update = function(){
  //console.log(this.x);
  for(let enemy of allEnemies){
    if(this.y === enemy.y && (enemy.x + enemy.horiz/2 > this.x && enemy.x < this.x + this.horiz/2)){
      //console.log('vertical conflict');
        this.x = this.startX;
        this.y = this.startY;
      }
    }
    if(this.y === 83){
      console.log('WINNER WINNER');
    }
  }


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyOne = new Enemy(0, 83);
var enemyTwo = new Enemy(0, 83*2);
var enemyThree = new Enemy(0, 83*3);
//possible function that adds enemies
allEnemies.push(enemyOne,enemyTwo,enemyThree);
var player = new playerOne();

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
