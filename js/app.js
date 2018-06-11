//moja sciezka: ./node_modules/.bin/webpack js/app.js js/out.js
// console.log('Tutu-rutu...');

var Game = require('./game.js');

//tworze obiekt gry i dodaje metody
var furryGame = new Game();

document.addEventListener('keydown', function(event){//obserwacja eventu keydown
  furryGame.turnFurry(event);
});

furryGame.showFurry();
furryGame.showCoin();
furryGame.startGame;
