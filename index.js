'use strict';
const gameboardArray = [
  {
    name: 'Gameboard 1',
    array: [
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }, {
    name: 'Gameboard 2',
    array: [
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }, {
    name: 'Gameboard 3',
    array: [
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }
];

class BaseElement {
  createElement(){

  }
  getElement(){

  }
  setState(state){

  }
  refresh(){

  }
  fireTorpedo(){

  }
  initialize(){

  }
}

class Cell extends BaseElement {
  constructor({isShip, location}){
    super();
    this.isShip = isShip;
    this.state = 'unknown';
    this.location = location;
    this.onClick = this.fireTorpedo;
  }
  createElement(){
    const element = document.createElement('div');
    element.addEventListener('click', this.onClick.bind(this) );
    return element;
  }
  getElement(){

  }
  setState(state){
    this.state = state;
    this.refresh();
  }
  refresh(){
//    this.getElement().classname = 'cell-' + this.state;
    this.getElement().classname = `cell-${this.state}`;

  }
  fireTorpedo(){
    if (this.isShip){
      this.setState('hit');
    } else {
      this.setState('miss');
    }

  }
  initialize(){
    this.refresh();
  }


}
class GameBoard extends BaseElement {
  constructor({ size }){
    super();
    this.cells = [];
    this.rowNuber = size;
    this.colNumber = size;
    this.fleet = gameboardArray[Math.floor(Math.random() * gameboardArray.length)];
    this.score = 0;
    this.totalScore = this.getTotalScore(fleet);
    for (let rowIndex = 0; rowInex < this.rowNumber; rowIndex++) {
      for (let colIndex = 0; colIndex < this.colNumber; colIndex++) {
        this.cells.push(new Cell({
          isShip: this.fleet.array[rowIndex][colIndex] === 1,
          location: [rowIndex, colIndex]
        });
      }
    }
  }

  createElement(){
    const gameboard = document.createElement('div');
  }
  getTotalScore(fleet){
    let total = 0;
    //fleet.array.forEach(function(row) {});
    fleet.array.forEach((row) => {
      total += row.filter((x) => { return x === 1; }).length;
    });
  return total;
  }

}
