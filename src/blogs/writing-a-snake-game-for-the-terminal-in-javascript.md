---
title: Writing a Snake game for the Terminal in JavaScript (Node.js)
date: "2020-05-17"
---

For a recent Node.js project, I wanted to render a game to the terminal instead of a browser. For this, I was going to need to find and learn how to use a terminal UI library like <a href="https://en.wikipedia.org/wiki/Curses_(programming_library)">curses</a>. The most popular JavaScript terminal UI is <a href="https://github.com/chjj/blessed">blessed</a>.

I thought writing the classic Snake game would be a fun and relatively easy project to get used to the blessed library, so I wrote 🐍<a href="https://github.com/kofosu2289/snayke"> Snayke.js</a>.

You can <a href="https://github.com/kofosu2289/snayke">check out the source</a>, or download it and play it yourself: 

```bash
git clone https://github.com/kofosu2289/snayke
cd snayke
yarn && yarn play # or: npm install && npm run play
```

Here's a brief preview gif of the game:

![](https://user-images.githubusercontent.com/18624999/82155319-0fe2b280-9842-11ea-97a9-bf9e24a983ee.gif)

I tried to make the game as I could remember it from the old days of T9 texting:

- There is a randomly generated dot
- There is a snake that can go up, down, left, right
- If the snake eats the dot, it grows and the score goes up by one
- If the snake runs into the wall or itself, the game resets

# Object-Oriented

I made use of the ES6 Javascript `class` keyword, and divided the game into two separate classes:

- `Game` which tracks the state of the snake, dot, and score
-  `UserInterface` which handles all input and output (key input, screen, and rendering)



## User Interface

The blessed ui library uses "boxes" to represent elements, so I created a `gameBox` to represent the entire area of play, a `scoreBox` representing a single line for the score, and a `gameOverBox` to display a game over modal.

Every pixel that would be drawn to the screen beyond that - in this case, the dots and each segment of snake - goes through the `draw()` method, which is a `1px` x `1px` box.

Since all key input will be detected through the UserInterface class, I had to bind all the handler methods so they could be used through the Game class.

UserInterface.js
```
bindHandlers(keyPressHandler, quitHandler, enterHandler) {
  this.screen.on('keypress', keyPressHandler)
  this.screen.key(['escape', 'q', 'C-c'], quitHandler)
  this.screen.key(['enter'], enterHandler)
}
```

Game.js
```
this.ui.bindHandlers(
  this.changeDirection.bind(this),
  this.quit.bind(this),
  this.start.bind(this)
)
```



## Game

The `Game` tracks the snake, the dot, and the score.

The snake is an array of {x,y} coordinates that correspond to the pixels on the screen. The snake moves in a direction based on the key input (arrow keys and WASD are supported). To move, the last item in the array (the tail) is removed, and a new item (the head) is added to the beginning. If the snake eats a dot, the last item isn't removed, and the snake grows.

A new dot is generated randomly after being eaten. Dots won't generate on an existing snake segment.

The game ends if the snake collides with the edges of the terminal screen (the wall), or with its own tail, and the game over modal is displayed.

Pressing enter will start a new game by calling the `start` method, which resets the game and starts a timer if one doesn't exist.

```
start() {
  if(!this.timer) {
    this.reset()

    this.timer = setInterval(this.tick.bind(this), 50)
  }
}
```

Every `50` ms, tick is called, which is the game loop. The timer will restart if there's a game over. Otherwise, each tick will clear the screen, draw a dot, move the snake, draw the snake, and render everything to the UI.

```
tick() {
  if(this.gameOver()) {
    this.showGameOverScreen()
    clearInterval(this.timer)
    this.timer = null

    return
  }

  this.clear()
  this.drawDot()
  this.moveSnake()
  this.drawSnake()
  this.ui.render()
}
```

# Conclusion

Again, you can view the source on GitHub at 🐍<a href="https://github.com/kofosu2289/snayke"> Snayke.js</a>. 

I learned a lot writing and refactoring this project. I encountered plenty of bugs in my first iteration, such as the snake being able to collide into all but the last tail segment, and a major issue where the blessed boxes weren't being garbage collected, and the game got slower and slower as it became less efficient and more intensive to run.

This was a very fun introduction to terminal UI libraries and will not be my last experiment with them.