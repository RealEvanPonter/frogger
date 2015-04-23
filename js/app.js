var moveDist = 25; // how much the player moves with a key press
var startX = 201; // starting X position of player
var startY = 401; // starting Y position of player
var leftBound = 0; // left boundary of the board
var topBound = 0; // top boundary of the board
var rightBound = 401; // right boundary of the board
var bottomBound = 426; // bottom boundary of the board
var numEnemies = 3; // number of enemies
var enemySpacing = 85; // space between enemies
var enemyShift = -25; // how far all of the enemies are shifted vertically
var enemyTravel = 100; // how far off the board the enemies travel
var enemySpeed = 100; // how fast the enemies generally travel
var enemyGirthX = 70; // how much space to check for around the enemy X value
var enemyGirthY = 60; // how much space to check for around the enemy Y valuee

// Enemies our player must avoid
var Enemy = function(spawnX, spawnY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = spawnX;
    this.y = spawnY;
    
    // Speed variable
    this.speed = this.getSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    // Keep moving right as long as the enemy is within its travel limit
    if (this.x < rightBound + enemyTravel) {
      this.x += (this.speed * dt);
    }
    
    // Otherwise restart the enemy from the left side with a new speed
    else {
      this.x = leftBound - enemyTravel;
      this.speed = this.getSpeed();
    }
    
    // If an enemy hits the player, reset the player and decrement their score
    if (this.x + enemyGirthX > player.x && this.x < player.x + enemyGirthX &&
        this.y + enemyGirthY > player.y && this.y < player.y + enemyGirthY) {
      player.reset();
      
      // Don't allow the score to go below 0
      if (player.score > 0) {
        player.score--;
        player.displayScore();
      }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Determine the speed of the enemy
Enemy.prototype.getSpeed = function() {
    return Math.floor((Math.random() * 100) + enemySpeed);
};

// Now write your own player class
var Player = function() {
    // The image/sprite for our player
    this.sprite = 'images/char-boy.png';
    this.x = startX;
    this.y = startY;
    
    // Move variables
    this.moveX = 0;
    this.moveY = 0;
    
    // Keeps track of the player's score
    this.score = 0;
    
    return this;
};

// This class requires an update(), render() and
// a handleInput() method.

// Update the player's position, required method for game
Player.prototype.update = function() {
    
    // If the player is within the left and right boundaries, move left or right
    if (this.x + this.moveX > leftBound && this.x + this.moveX <= rightBound) {
      this.x += this.moveX;
    }
    
    // If the player is within the top and bottom boundaries, move up or down
    if (this.y + this.moveY > topBound && this.y + this.moveY <= bottomBound) {
      this.y += this.moveY;
    }
    
    // If the player reaches the top of the screen, increment score,
    // update the score on the screen, and reset the player
    if(this.y + this.moveY < topBound) {
      player.score += 5;
      player.displayScore();
      player.reset();
    }
    
    // Reset move variables
    this.moveX = 0;
    this.moveY = 0;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Set the move variables when the correct keys are pressed
Player.prototype.handleInput = function(key) {
    switch (key) {
      
      case 'left':
        this.moveX -= moveDist;
        break;
        
      case 'up':
        this.moveY -= moveDist;
        break;
        
      case 'right':
        this.moveX += moveDist;
        break;
        
      case 'down':
        this.moveY += moveDist;
    }
};

// Resets the position of the player to the starting values
Player.prototype.reset = function() {
    this.x = startX;
    this.y = startY;
};

// Display the players score on the screen
Player.prototype.displayScore = function() {
    document.getElementById('score').innerHTML = player.score;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (i = 1; i <= numEnemies; i++) {
  allEnemies.push(new Enemy(leftBound - (i * enemyTravel),
    i * enemySpacing + enemyShift));
}

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
