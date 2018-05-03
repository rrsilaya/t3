import React, { Component } from 'react';
import Particles from 'react-particles-js';

import {
  Board,
  Message
} from '../features';

import config from './particles';
import styles from './styles.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      board: Array.from({ length: 9 }, () => ' ').join(''),
      turn: 'X',
    }
  }

  handleBoardTurn = index => {
    const { turn } = this.state;
    const board = [...this.state.board];
    index = parseFloat(index);

    if (board[index] === ' ') {
      board[parseFloat(index)] = this.state.turn;
      this.setState({
        board: board.join(''),
        turn: turn === 'X' ? 'O' : 'X'
      });
    }
  }

  render() {
    const { board } = this.state;

    return (
      <div className={styles.appWrapper}>
        <Particles params={config} className={styles.background}/>
        <Message message="Hello" />
        <Board board={board} handleBoardTurn={this.handleBoardTurn} />
      </div>
    );
  }
}

export default App;
