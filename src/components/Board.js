import React from "react";
import "./Board.css";

function Cell(props) {
  return (
    <button
      className="cell"
      onClick={props.onClick}
    >
      {props.value ? "O" : null}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: this.reset(),
      generation: 0,
    };
    this.tick = this.tick.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    const rows = 15;
    const cols = 25;
    var newSquares = [];
    for (var i = 0; i < rows; i++) {
      newSquares[i] = Array(cols).fill(false);
    }
    return newSquares;
  }

  tick() {
    const oldSquares = this.state.squares.slice();
    var newSquares = oldSquares.map(arr => arr.slice());

    for (var r = 0; r < oldSquares.length; r++) {
      for (var c = 0; c < oldSquares[r].length; c++) {
        const aliveNeighbors = this.findAliveNeighbors(oldSquares, r, c);

        if (aliveNeighbors < 2 || aliveNeighbors > 3) {
          newSquares[r][c] = false;
        } else if (aliveNeighbors === 3) {
          newSquares[r][c] = true;
        }
      }
    }
    this.setState({squares: newSquares, generation: this.state.generation + 1});
  }

  findAliveNeighbors(squares, row, col) {
    const rowLimit = squares.length - 1;
    const colLimit = squares[0].length - 1;
    var aliveNeighbors = 0;

    for (var i = Math.max(0, row - 1); i <= Math.min(rowLimit, row + 1); i++) {
      for (var j = Math.max(0, col - 1); j <= Math.min(colLimit, col + 1); j++) {
        if ((i !== row || j !== col) && squares[i][j]) {
          aliveNeighbors++;
        }
      }
    }
    return aliveNeighbors;
  }

  handleClick(row, col) {
    var newSquares = this.state.squares;
    newSquares[row][col] = !newSquares[row][col];
    this.setState({squares: newSquares});
  }



  renderSquare(row, col) {
    return (
      <Cell
        value={this.state.squares[row][col]}
        onClick={() => this.handleClick(row, col)}
      />
    );
  }

  renderRow(row) {
    return (
      <div className="board-row">
        {this.state.squares[row].map((_, col) => this.renderSquare(row, col))}
      </div>
    );
  }

  render() {
    const title = "Conway's Game of Life";
    const squares = this.state.squares;

    return (
      <div>
        <div className="title">{title}</div>
        <div className="generation"> Generation: {this.state.generation} </div>
        <span>
          <button className="settings-buttons" onClick={() => this.tick()}>
            Next
          </button>
        </span>
        <span className="reset-button">
          <button className="settings-buttons" onClick={() => this.setState({squares: this.reset(), generation: 0})}>
            Reset
          </button>
        </span>
        <div>
          {squares.map((_, row) => this.renderRow(row))}
        </div>
      </div>
    );
  }
}

export default Board;