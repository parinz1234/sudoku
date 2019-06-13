import React, { Component } from 'react'
import Cell from './Cell'

const validate = board => {
    let isValid = true;
    for (let i = 0; i < 4; i++) {
      const horizontal = new Set();
      const vertical = new Set();
      const square = new Set();
      for (let j = 0; j < 4; j++) {
        horizontal.add(board[i][j]);
        vertical.add(board[j][i]);
        square.add(
          board[2 * (i % 2) + (j % 2)][2 * Math.floor(i / 2) + Math.floor(j / 2)]
        );
      }
      horizontal.delete(0);
      vertical.delete(0);
      square.delete(0);
      if (horizontal.size !== 4 || vertical.size !== 4 || square.size !== 4) {
        isValid = false;
      }
    }
    return isValid;
};

class Board extends Component {
    state = {
        statusText: '',
        timer: 0,
        loading: true
    }

    async componentDidMount () {
        this.interval = setInterval(() => {
            this.setState({ timer: this.state.timer+1 })
        }, 1000)
        await this.restartBoard()
    }

    componentWillUnmount () {
        clearInterval(this.interval)
    }

    onSubmit = () => {
        const isValid = validate(this.state.board);
        if (isValid) clearInterval(this.interval)
        this.setState({ statusText: isValid ? 'Board is complete.' : 'Board is invalid.' })
    }

    restartBoard = async () => {
        this.setState({ loading: true })
        const { board } = await fetch(`https://us-central1-skooldio-courses.cloudfunctions.net/react_01/random`)
            .then(response => response.json())
        this.setState({
            board,
            timer: 0,
            initial: board.map(row => row.map(number => number !== 0)),
            loading: false
        })
    }

    render() {
        return (
            <div>
                <p className="timer">Elapsed Time: { this.state.timer } seconds</p>
                <div className="board">
                    {
                        !this.state.loading &&
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
                <button
                    className="restart-button"
                    onClick={this.restartBoard}
                    >Restart</button>
                <button onClick={this.onSubmit}>Submit</button>
                <p>{this.state.statusText}</p>
            </div>
        )
    }
}

export default Board
