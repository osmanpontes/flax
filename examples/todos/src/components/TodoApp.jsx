// npm

import React from 'react';
import ReactDOM from 'react-dom';

// Mixins

import {StoreWatcher} from 'flax';

// Stores

import TodoStore from '../stores/TodoStore';

// Components

import Footer from './Footer.jsx';
import Header from './Header.jsx';
import MainSection from './MainSection.jsx';

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  };
}

var TodoApp = React.createClass({
  mixins: [StoreWatcher],

  getInitialState: function() {
    return getTodoState();
  },

  getEventBinds() {
    return [
      [TodoStore.CHANGE_EVENT, this._onChange]
    ];
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <Header />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getTodoState());
  }

});

export default TodoApp;
