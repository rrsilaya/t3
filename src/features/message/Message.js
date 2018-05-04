import React, { Component } from 'react';

import styles from './styles.css';

class Message extends Component {
  render() {
    const { message, play } = this.props;

    return (
      <div className={styles.wrapper}>
        <div>
          <span>{message}</span>
          <br/>
          <button onClick={play}>Play Again</button>
        </div>
      </div>
    );
  }
}

export default Message;