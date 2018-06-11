/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Furry = __webpack_require__(2);
var Coin = __webpack_require__(1);

//tworze konstruktor gry - wlasciwosci i metody
function Game(){

  this.board = document.querySelectorAll('section#board div');//plansza gry
  this.furry = new Furry();//egzemplarz stworka
  this.coin = new Coin();//moneta, jej pozycja x i y jest juz gotowa
  this.score = 0;//aktualny wynik gracza

  this.index = function(x, y){
    return x + (y * 10);//przelicza pozycje x i y na indeks tablicy
  }

  this.showFurry = function(){//pokazuje Furrego
    this.hideVisibleFurry();//wywolanie metody, ktora pozbywa sie klonow
    this.board[this.index(this.furry.x,this.furry.y)].classList.add('furry');
    //tu nadaje klase .furry elementowi planszy odpowiadajacemu pozycji Furrego
  }

  this.hideVisibleFurry = function(){//pozbywam sie klonow Furrego
    var furryCreepy = document.querySelector('.furry');
    if (furryCreepy !== null){
      furryCreepy.classList.remove('furry');//pozbywam sie poprzedniego stwora
    }
  }

  this.showCoin = function(){//pokazuje monete na odpowiednich polach planszy
    this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    //tu nadaje klase .coin elementowi planszy odpowiadajacemu pozycji monety
  }

  this.moveFurry = function(){//modyfikacja pozycji Furrego zeleznie od kierunku
    this.gameOver();
    switch (this.furry.direction) {
      case 'right':
        this.furry.x = this.furry.x + 1;
        this.showFurry();
        break;
      case 'left':
        this.furry.x = this.furry.x - 1;
        this.showFurry();
        break;
      case 'down':
        this.furry.y = this.furry.y + 1;
        this.showFurry();
        break;
      case 'up':
        this.furry.y = this.furry.y - 1;
        this.showFurry();
        break;
    }
    this.checkCoinCollision();
  }

  var self = this;

  this.turnFurry = function(event){//event, sterowanie stworkiem
    switch (event.which){//wlasciwosc which obiektu event
      case 37:
        self.furry.direction = 'left';
        break;
      case 38:
        self.furry.direction = 'up';
        break;
      case 39:
        self.furry.direction = 'right';
        break;
      case 40:
        self.furry.direction = 'down';
        break;
    }
  }

  this.checkCoinCollision = function(){//sprawdzanie kolizji z moneta
    if (this.furry.x === this.coin.x && this.furry.y === this.coin.y){//sprawdzam czy pozycje stwora i monety sa takie same
      var myCoin = document.querySelector('.coin');
      if (myCoin != undefined) {//jesli nastapilo zderzenie to
        myCoin.classList.remove('coin');//usuwam monete z ekranu
      }
      var myPoint = document.querySelector('div strong');
      this.score++;//dodaje 1 punkt do wyniku
      myPoint.innerText = this.score;//pokazuje zaktualizowany wynik
      this.coin = new Coin();//nowa moneta
      this.showCoin();//pokazuje nowa monete
    }
  }

  this.gameOver = function(){
    if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9){//stworek wpada na krawedz to:
      this.hideVisibleFurry();//ukrywam stworka
      clearInterval(this.idSetInterval);//kasuje intervala
      var gameIsOver = document.getElementById('over');
      gameIsOver.innerHTML = '<pre>Game Over<br>Score: '+ this.score + '</pre>' ;//dodaje element, ktory mam w css, z wynikiem
      gameIsOver.classList.remove('invisible');//i pokazuje go
    }
    return this.score;//zwracam wynik
  }

  this.startGame = setInterval(function(){//zaczynam gre
    // console.log('hura z setIntervala');//dziala!
    self.moveFurry();//wywoluje metode odpowiadajaca za poruszanie sie Furrego
  }, 250);
  this.idSetInterval = this.startGame;
}


module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

//tworze konstruktor monety - wlasciwosci
function Coin(){
  this.x = Math.floor(Math.random() * 10);//pozycja - losowa wartosc
  this.y = Math.floor(Math.random() * 10);//jak wyzej
}

module.exports = Coin;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

//tworze konstruktor Furry'ego - wlasciwosci
function Furry(){
  this.x = 0;//pozycja
  this.y = 0;//pozycja
  this.direction = 'right';//kierunek poruszania sie stworka
  //poczatkowe wartosci, start Furrego
}

module.exports = Furry;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

//moja sciezka: ./node_modules/.bin/webpack js/app.js js/out.js
// console.log('Tutu-rutu...');

var Game = __webpack_require__(0);

//tworze obiekt gry i dodaje metody
var furryGame = new Game();

document.addEventListener('keydown', function(event){//obserwacja eventu keydown
  furryGame.turnFurry(event);
});

furryGame.showFurry();
furryGame.showCoin();
furryGame.startGame;


/***/ })
/******/ ]);