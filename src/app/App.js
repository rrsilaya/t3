import React, { Component } from 'react';
import Particles from 'react-particles-js';

import {
  Board
} from '../features';

import config from './particles';
import styles from './styles.css';

class App extends Component {
  render() {
    return (
      <div className={styles.appWrapper}>
        <Particles params={config} className={styles.background}/>
        <Board/>
      </div>
    );
  }
}

export default App;
