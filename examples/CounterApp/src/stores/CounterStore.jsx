import {Store} from '../../fluxit';
import CounterActions from '../actions/CounterActions.jsx';

var _state = {
  x: 5
};

const CounterStore = new Store({
  displayName: 'CounterStore',

  getState() {
    return _state;
  },

  getActionBinds() {
    return [
      [CounterActions.incX, this._handleIncX],
      [CounterActions.decX, this._handleDecX]
    ]
  },

  events: {
    INC_X: null,
    DEC_X: null
  },

  _handleIncX() {
    _state.x = _state.x > 9 ? 10 : _state.x + 1;

    this.emitChange(this.INC_X);
    // this.emitChange(this.events.INC_X);
  },

  _handleDecX() {
    _state.x = _state.x < 1 ? 0 : _state.x - 1;

    this.emitChange(this.DEC_X);
    // this.emitChange(this.events.DEC_X);
  }
});

export default CounterStore;