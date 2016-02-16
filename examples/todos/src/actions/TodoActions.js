/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import Flax from '../../../../';

const TodoActions = Flax.createActionCreator({
  displayName: 'TodoActions',

  /**
   * @param  {string} text
   */
  create: function(text) {
    this.dispatch({
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  updateText: function(id, text) {
    this.dispatch({
      id: id,
      text: text
    });
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
  toggleComplete: function(todo) {
    this.dispatch({
      complete: !todo.complete,
      id: todo.id
    });
  },

  /**
   * Mark all ToDos as complete
   */
  toggleCompleteAll: function() {
    this.dispatch({});
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    this.dispatch({
      id: id
    });
  },

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted: function() {
    this.dispatch({});
  }
});

export default TodoActions;
