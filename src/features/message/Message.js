import React, { Component } from 'react';

import styles from './styles.css';

class Message extends Component {
  render() {
    const { message } = this.props;

    return (
      <div className={styles.wrapper}>
        <div>{message}</div>
      </div>
    );
  }
}

export default Message;