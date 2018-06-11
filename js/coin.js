//tworze konstruktor monety - wlasciwosci
function Coin(){
  this.x = Math.floor(Math.random() * 10);//pozycja - losowa wartosc
  this.y = Math.floor(Math.random() * 10);//jak wyzej
}

module.exports = Coin;
