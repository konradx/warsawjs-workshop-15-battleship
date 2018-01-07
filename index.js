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
    return this.elementState.element;

  }
  initialize(){

  }
  setElement(){
    this.elementState = {
      element: this.createElement()
    };
    this.initialize();
    return this.getElement();
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
    this.getElement().className = `cell-${this.state}`;

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
    this.rowNumber = size;
    this.colNumber = size;
    this.fleet = gameboardArray[Math.floor(Math.random() * gameboardArray.length)];
    this.score = 0;
    this.totalScore = this.getTotalScore(this.fleet);
    for (let rowIndex = 0; rowIndex < this.rowNumber; rowIndex++) {
      for (let colIndex = 0; colIndex < this.colNumber; colIndex++) {
        this.cells.push(new Cell({
          isShip: this.fleet.array[rowIndex][colIndex] === 1,
          location: [rowIndex, colIndex]
        }));
      }
    }
  }

  createElement(){
    const gameboard = document.createElement('div');
    gameboard.className = 'gameboard';

    for (let rowIndex = 0; rowIndex < this.rowNumber; rowIndex++) {
      const row = document.createElement('div');
      row.className = 'board-row';
      console.log(row)
      for (let colIndex = 0; colIndex < this.colNumber; colIndex++) {
        const cell = this.cells[rowIndex * this.colNumber + colIndex];
          row.appendChild(cell.setElement());
        console.log(cell);
        console.log('test');
        }
        gameboard.appendChild(row);
      }
  return gameboard;
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

const gameboardContainer = document.getElementById('gameboardContainer');
const gameResult = document.getElementById('gameResult');
const gameboard = new GameBoard({ size: 10});
gameboardContainer.appendChild(gameboard.setElement());
