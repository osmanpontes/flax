/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

// npm

import React from 'react';
import ReactDOM from 'react-dom';

// Mixins

import {StoreWatcher, StoreEventHandler} from '../../../../';

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
  getInitialState: function() {
    return getTodoState();
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <StoreEventHandler event={TodoStore.CHANGE_EVENT} handler={this._onChange} />
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
