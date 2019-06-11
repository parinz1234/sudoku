import React, { Component } from 'react';
import './App.css';

class Cell extends Component {
    render() {
        return (
            <div
                className={`cell ${this.props.isInitial ? 'initial' : ''}`}
                onClick={(e) => {
                    if (this.props.isInitial) return
                    this.props.onChange((this.props.number + 1) % 5)
                }}
            >
                {this.props.number ? this.props.number : ''}
            </div>)
    }
}

class Board extends Component {
    state = {
        board: [
            [1, 2, 3, 4],
            [3, 4, 0, 0],
            [2, 0, 4, 0],
            [4, 0, 0, 2]
        ],
        initial: [
            [true, true, true, true],
            [true, true, false, false],
            [true, false, true, false],
            [true, false, false, true]
        ]
    }
    render() {
        return (
            <div className="board">
                {
                    this.state.board.map((row, i) => row.map((number, j) =>
                        <Cell
                            key={`cell-${i}-${j}`}
                            number={number}
                            isInitial={this.state.initial[i][j]}
                            onChange={(newNumber) => {
                                const { board } = this.state
                                board[i][j] = newNumber
                                this.setState({
                                    board
                                })
                            }}
                            />))
                }
            </div>
        )
    }
}
class App extends Component {
    render() {
        return (
            <div className="App">
                <Board />
            </div>
        );
    }
}

export default App;
