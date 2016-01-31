import React from 'react';
import CounterActions from '../actions/CounterActions.jsx';
import CounterStore from '../stores/CounterStore.js';
import {StoreWatcher} from 'flax';

// Components

import TimeTravel from './TimeTravel.jsx';

const App = React.createClass({
  mixins: [StoreWatcher],

  getEventBinds() {
    return [
      [CounterStore.INC_X, this._handleXChange],
      [CounterStore.DEC_X.append(2), this._handleXChange]
    ];
  },

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
    // CounterActions.f1();
  },

  _handleMinusClick() {
    CounterActions.decX();
  },

  _handleSendClick() {

  },

  render() {
    return (
      <div style={{textAlign: 'center', fontSize: 30}}>
        <h1>How cool is Flax?</h1>
        <p style={{fontSize: 70}}>{this.state.x}</p>
        <button style={{fontSize: 50}} onClick={this._handlePlusClick}>+</button>
        <button style={{fontSize: 50}} onClick={this._handleMinusClick}>-</button>
        <br/><br/>
        <button style={{fontSize: 70}} onClick={this._handleSendClick}>Send</button>
        <TimeTravel />
      </div>
    );
  }
});

export default App;