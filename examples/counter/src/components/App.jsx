// npm
import React from 'react';
import ReactDOM from 'react-dom';

// Actions

import CounterActions from '../actions/CounterActions.jsx';

// Stores

import CounterStore from '../stores/CounterStore.js';

// Flax

import {
  StoreWatcher
} from '../../../../';

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

  _reset() {
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    ReactDOM.render(<App />, document.getElementById('app'));
  },

  render() {


    return (
      <div style={{textAlign: 'center', fontSize: 30}}>
        <h1>How cool is Flax?</h1>
        <p style={{fontSize: 70}}>{this.state.x}</p>
        <button style={{fontSize: 50}} onClick={this._handlePlusClick}>+</button>
        <button style={{fontSize: 50}} onClick={this._handleMinusClick}>-</button>
      </div>
    );
  }
});

export default App;