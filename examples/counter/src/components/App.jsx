// npm
import React from 'react';
import ReactDOM from 'react-dom';

// Actions

import CounterActions from '../actions/CounterActions.jsx';

// Stores

import CounterStore from '../stores/CounterStore.js';

// Flax

import {
  StoreEventHandler
} from '../../../../';

const App = React.createClass({
  getInitialState() {
    return {
      x: CounterStore.getX()
    };
  },

  _handleXChange() {
    this.setState({
      x: CounterStore.getState().x
    });
  },

  _handlePlusClick() {
    CounterActions.incX();
  },

  _handleMinusClick() {
    CounterActions.decX();
  },

  render() {
    return (
      <div>
        <StoreEventHandler event={[CounterStore.INC_X, CounterStore.DEC_X.append(2)]} handler={this._handleXChange}/>
        <div style={{textAlign: 'center', fontSize: 30}}>
          <h1>How cool is Flax?</h1>
          <p style={{fontSize: 70}}>{this.state.x}</p>
          <button style={{fontSize: 50}} onClick={this._handlePlusClick}>+</button>
          <button style={{fontSize: 50}} onClick={this._handleMinusClick}>-</button>
        </div>
      </div>
    );
  }
});

export default App;