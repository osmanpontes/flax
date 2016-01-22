import {ActionCreator} from '../../fluxit';

const CounterActions = new ActionCreator({
  loadHellos(query) {
    var payload = {
      x: query + 1
    };
    this.dispatch({
      data: payload,
      state: 'SUCCESS'
    });

    console.log(this.dispatch());
    this.f1();
  },

  f1() {
    console.log(this.dispatch());
    this.f2();
  },

  f2() {
    console.log(this.dispatch());
    //this.f1();
  },

  sendHello(x) {
    if (x > 0) return this.dispatch('positive');
    return this.dispatch('negative');
  }
});

export default CounterActions;