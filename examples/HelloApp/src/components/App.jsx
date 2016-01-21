import React from 'react';
import HelloActions from '../actions/HelloActions.jsx';
import HelloStore from '../stores/HelloStore.jsx';

const App = React.createClass({
  //mixins: [StoreWatch],

  getInitialState() {
    //this.bind(HelloStore, fluxit.makeEvent(HelloStore.events.HELLO, this.context), this._handleHello);
      return {
      x: []
    };
  },

  _handleHello() {

  },

  _handleBye() {

  },

  _handleClick() {
    HelloActions.loadHellos(123);
  },

  render() {
    return (
      <div>
        <p>Hello!</p>
        <button onClick={this._handleClick}>Click</button>
      </div>
    );
  }
});

export default App;