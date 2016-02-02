import Flax from 'flax';

const CounterActions = Flax.createActionCreator({
  displayName: 'CounterActions',

  incX() {
    this.dispatch();
  },

  decX() {
    this.dispatch();
  }
});

export default CounterActions;