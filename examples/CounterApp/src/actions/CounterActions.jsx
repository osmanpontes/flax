import flax from 'flax';

const CounterActions = flax.createActionCreator({
  displayName: 'CounterActions',

  incX() {
    this.dispatch();
  },

  decX() {
    this.dispatch();
  }
});

export default CounterActions;