import React, { Component } from 'react';

import styles from './styles.css';

class Board extends Component {
  handleBoardToggle = e => {
    this.props.handleBoardTurn(e.target.dataset.index);
  }

  render() {
    const { board } = this.props;

    return (
      <div className={styles.wrapper}>
        <div data-index="0" onClick={this.handleBoardToggle}>{board[0]}</div>
        <div data-index="1" onClick={this.handleBoardToggle}>{board[1]}</div>
        <div data-index="2" onClick={this.handleBoardToggle}>{board[2]}</div>
        <div data-index="3" onClick={this.handleBoardToggle}>{board[3]}</div>
        <div data-index="4" onClick={this.handleBoardToggle}>{board[4]}</div>
        <div data-index="5" onClick={this.handleBoardToggle}>{board[5]}</div>
        <div data-index="6" onClick={this.handleBoardToggle}>{board[6]}</div>
        <div data-index="7" onClick={this.handleBoardToggle}>{board[7]}</div>
        <div data-index="8" onClick={this.handleBoardToggle}>{board[8]}</div>
      </div>
    );
  }
}

export default Board;