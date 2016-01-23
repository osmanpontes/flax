import {ActionCreator} from '../../fluxit';

const CounterActions = new ActionCreator({
  displayName: 'CounterActions',

  incX() {
    this.dispatch();
  },

  decX() {
    this.dispatch();
  }
});

export default CounterActions;