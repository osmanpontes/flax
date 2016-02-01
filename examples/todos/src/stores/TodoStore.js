import Flax from 'flax';
import TodoActions from '../actions/TodoActions';

const TodoStore = Flax.createStore({
  displayName: 'TodoStore',

  getInitialState: function () {
    return {
      todos: {},
      id: 0
    }
  },

  getActionBinds() {
    return [
      [TodoActions.create, this._handleCreate],
      [TodoActions.updateText, this._handleUpdateText],
      [TodoActions.destroy, this._handleDestroy],
      [TodoActions.toggleComplete, this._handleToggleComplete],
      [TodoActions.toggleCompleteAll, this._handleToggleCompleteAll]
    ];
  },

  events: {
    CHANGE_EVENT: null
  },

  getters: {
    areAllComplete() {
      var todos = this.state.todos;
      for (var id in todos) {
        if (!todos[id].complete) {
          return false;
        }
      }
      return true;
    },

    getAll() {
      console.log(this.state.todos);
      return this.state.todos;
    }
  },

  // Helpers

  _update(id, update) {
    if (this.state.todos.hasOwnProperty(id)) this.state.todos[id] = Object.assign({}, this.state.todos[id], update);
  },

  _destroy(id) {
    delete this.state.todos[id];
  },

  // Handlers

  _handleCreate(payload) {
    var text = payload.text.trim();
    if (text !== '') {
      // var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
      var id = this.state.id++;
      this.state.todos[id] = {
        id: id,
        complete: false,
        text: text
      };
      this.emitChange(this.CHANGE_EVENT);
    }
  },

  _handleToggleComplete(payload) {
    this._update(payload.id, {complete: payload.complete});
    this.emitChange(this.CHANGE_EVENT);
  },

  _handleUpdateText(payload) {
    var id = payload.id;
    var text = payload.text.trim();
    if (text !== '') {
      this._update(id, {text: text});
      this.emitChange(this.CHANGE_EVENT);
    }
  },

  _handleToggleCompleteAll() {
    var updates;
    if (this.areAllComplete()) {
      updates = {complete: false};
    } else {
      updates = {complete: true};
    }

    for (var id in this.state.todos) {
      this._update(id, updates);
    }

    this.emitChange(this.CHANGE_EVENT);
  },


  _handleDestroy(payload) {
    var id = payload.id;
    this._destroy(id);
    this.emitChange(this.CHANGE_EVENT);
  },

  _handleDestroyCompleted() {
    var todos = this.state.todos;

    for (var id in todos) {
      if (todos[id].complete) {
        this._destroy(id);
      }
    }

    this.emitChange(this.CHANGE_EVENT);
  }
});

export default TodoStore;
