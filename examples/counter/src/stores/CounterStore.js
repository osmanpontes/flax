import Flax from '../../../../';
import CounterActions from '../actions/CounterActions.jsx';

const CounterStore = Flax.createStore({
  displayName: 'CounterStore',

  getInitialState() {
    return {
      x: 5
    };
  },

  getActionBinds() {
    return [
      [CounterActions.incX, this._handleIncX, this.INC_X],
      [CounterActions.decX, this._handleDecX]
    ];
  },

  events: {
    INC_X: null,
    DEC_X: null
  },

  getters: {
    getX() {
      return this.state.x;
    }
  },

  _handleIncX() {
    this.state.x = this.state.x > 9 ? 10 : this.state.x + 1;

    // this.emitChange(this.INC_X); not necessary because it was defined on getActionBinds
    // this.emitChange(this.events.INC_X);
  },

  _handleDecX() {
    this.state.x = this.state.x < 1 ? 0 : this.state.x - 1;

    this.emitChange(this.DEC_X.append(2));
  }
});

export default CounterStore;