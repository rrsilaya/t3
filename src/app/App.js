import React, { Component } from 'react';
import {
  Board
} from '../features';

import styles from './styles.css';

class App extends Component {
  render() {
    return (
      <div className={styles.appWrapper}>
        <Board/>
      </div>
    );
  }
}

export default App;
