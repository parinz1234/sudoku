import React, { Component } from 'react';
import './App.css';

class Cell extends Component {
    state = {
        number: 1
    }
    render() {
        return (
            <div
                class={`cell ${this.props.isInitial ? 'initial' : ''}`}
                onClick={(e) => {
                    this.setState({
                        number: (this.state.number + 1) % 5
                    })
                }}
                >
                { this.state.number ? this.state.number : '' }
            </div>)
    }
}
class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="board">
                    <Cell number={4} />
                    <Cell number={3} isInitial />
                    <Cell number={3} />
                    <Cell number={3} />
                    <Cell number={3} />
                    <Cell number={3} />
                    <Cell number={3} />
                    <Cell number={3} />
                    <Cell number={3} />
                    <Cell number={3} />
                    <Cell number={3} />
                    <Cell number={3} />
                    <Cell number={3} />
                    <Cell number={3} />
                    <Cell number={3} />
                    <Cell number={3} />
                </div>
            </div>
        );
    }
}

export default App;
