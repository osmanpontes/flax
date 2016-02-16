import Flax from '../../../../';

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