import React, { Component } from 'react';
import Particles from 'react-particles-js';
import { CSSTransition } from 'react-transition-group';

import { AICaller, checkWinner } from '../features/ai/ai';

import { Board, Message } from '../features';

import config from './particles';
import styles from './styles.css';

const Player = {
  user: 'X',
  ai: 'O'
};

const PLAYER = 1,
  AI = -1,
  DRAW = 0,
  INGAME = 'None';

class App extends Component {
  constructor() {
    super();
    this.state = {
      board: Array.from({ length: 9 }, () => ' ').join(''),
      winner: 'None'
    };
  }

  handleRandomTurn = () => {
    if (Math.round(Math.random())) {
      this.setState({ board: AICaller(Player.ai, this.state.board) });
    }
  };

  handleGameReset = () => {
    let board = Array.from({ length: 9 }, () => ' ').join('');

    if (Math.round(Math.random())) {
      board = AICaller(Player.ai, board);
    }

    this.setState({ board, winner: INGAME });
  };

  handleBoardTurn = index => {
    if (this.state.winner === 'None') {
      let board = [...this.state.board];
      index = parseFloat(index);

      if (board[index] === ' ') {
        board[index] = Player.user;

        let winner = checkWinner(Player.user, board.join(''));
        console.log(winner, board.join(''));
        if (winner !== PLAYER) {
          board = AICaller(Player.ai, board.join(''));
          winner = checkWinner(Player.ai, board);
          winner = winner === 1 ? -1 : winner;
        }

        this.setState({ board, winner });
      }
    }
  };

  componentDidMount() {
    this.handleRandomTurn();
    // setTimeout(() => {
    //   this.setState({ isMessageOpen: true })
    // }, 2000);
  }

  render() {
    const { board, winner } = this.state;

    return (
      <div className={styles.appWrapper}>
        <Particles params={config} className={styles.background} />
        {winner !== INGAME && (
          <Message
            play={this.handleGameReset}
            message={
              winner === PLAYER
                ? 'You won!'
                : winner === AI
                  ? 'You lose :(.'
                  : winner === DRAW
                    ? "It's a draw."
                    : ''
            }
          />
        )}
        <Board board={board} handleBoardTurn={this.handleBoardTurn} />
      </div>
    );
  }
}

export default App;
