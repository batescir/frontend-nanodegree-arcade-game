// Enemies our player must avoid
var Enemy = function(startX, startY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = startX;
    this.y = startY;

    //randomize speed

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < this.step * 5) {
      //test boundary check the 10 value
      this.x += 10 * dt;
    }
    // if enemy still inbounds
      //move forward
      //increment x by s
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class playerOne {
  constructor() {
    this.step = 100;
    this.jump = 80;
    this.startX = this.step * 2;
    this.startY = this.jump * 5 + 30;
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
      this.x -= this.step;
    }
    }
    if(input === 'right'){
      if (this.x < this.step * 4){
      //checkboundry
      this.x += this.step;
      }
    }
    if(input === 'up'){
      if(this.y > this.jump){
      //checkboundry
      this.y -= this.jump;
      }
    }
    if(input === 'down'){
      if(this.y < this.jump * 5 - 20){
      //checkboundry
      this.y += this.jump;
      }
    }
  }
  render() {
    //taken from enemy sample
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // keyboard inputs
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyOne = new Enemy(200, 60, 50);
var enemyTwo = new Enemy(200, 145, 75);
var enemyThree = new Enemy(200, 230, 75);
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
