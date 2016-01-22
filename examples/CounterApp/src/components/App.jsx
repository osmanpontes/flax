import React from 'react';
import CounterActions from '../actions/CounterActions.jsx';
import CounterStore from '../stores/CounterStore.jsx';

const App = React.createClass({
  //mixins: [StoreWatch],

  getInitialState() {
    //this.bind(CounterStore, CounterActions.events.INC_X, this._handleXChange);
    //this.bind(CounterStore, CounterActions.events.DEC_X, this._handleXChange);
    return {
      x: CounterStore.getState().x
    };
  },

  _handleXChange() {
    this.setState({
      x: CounterStore.getState().x
    });
  },

  componentDidMount() {
    CounterStore.addChangeListener(CounterStore.INC_X, this._handleXChange);
    CounterStore.addChangeListener(CounterStore.DEC_X, this._handleXChange);
  },

  componentWillUnmount() {
    CounterStore.removeChangeListener(CounterStore.INC_X, this._handleXChange);
    CounterStore.removeChangeListener(CounterStore.DEC_X, this._handleXChange);
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
        <h1>How cool is Fluxit?</h1>
        <p style={{fontSize: 70}}>{this.state.x}</p>
        <button style={{fontSize: 50}} onClick={this._handlePlusClick}>+</button>
        <button style={{fontSize: 50}} onClick={this._handleMinusClick}>-</button>
        <br/><br/>
        <button style={{fontSize: 70}} onClick={this._handleSendClick}>Send</button>
      </div>
    );
  }
});

export default App;