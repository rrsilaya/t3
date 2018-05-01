import React, { Component } from 'react';

import styles from './styles.css';

class Board extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div>X</div>
        <div>X</div>
        <div>X</div>
        <div>O</div>
        <div>X</div>
        <div>X</div>
        <div>X</div>
        <div>X</div>
        <div>X</div>
      </div>
    );
  }
}

export default Board;