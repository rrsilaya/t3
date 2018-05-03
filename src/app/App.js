import React, { Component } from 'react';
import Particles from 'react-particles-js';
import { CSSTransition } from 'react-transition-group';

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

      isMessageOpen: false
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

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isMessageOpen: true })
    }, 2000);
  }

  render() {
    const { board } = this.state;

    return (
      <div className={styles.appWrapper}>
        <Particles params={config} className={styles.background}/>
        <CSSTransition
          in={this.state.isMessageOpen}
          timeout={1000}
          classNames="message"
          unmountOnExit
          onEntered={() => {
            setTimeout(() => {
              this.setState({ isMessageOpen: false });
            }, 1500)
          }}
        >
          <Message message="Hello" />
        </CSSTransition>
        <Board board={board} handleBoardTurn={this.handleBoardTurn} />
      </div>
    );
  }
}

export default App;
