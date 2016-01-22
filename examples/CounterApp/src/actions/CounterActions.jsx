import {ActionCreator} from '../../fluxit';

const CounterActions = new ActionCreator({
  incX() {
    this.dispatch();
  },

  decX() {
    this.dispatch();
  }
});

export default CounterActions;