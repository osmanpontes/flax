import {ActionCreator} from '../../fluxit';

const CounterActions = new ActionCreator({
  incX() {
    this.dispatch();
  },

  decX() {
    this.dispatch();
  },

  // TODO test the case where actions call actions

  f1() {
    console.log(this.dispatch());
    this.f2();
  },

  f2() {
    console.log(this.dispatch());
    this.f3();
  },

  f3() {
    console.log(this.dispatch());
  }
});

export default CounterActions;