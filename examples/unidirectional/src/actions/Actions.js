import Flax from '../../../../';

const Actions = Flax.createActionCreator({
  displayName: 'Actions',

  sync1(data) {
    console.log('action sync1 started with data: ' + data);
    console.log('action sync1 dispatching data: ' + data);
    this.dispatch(data);
  },

  sync2(data) {
    console.log('action sync2 started with data: ' + data);
    console.log('action sync2 dispatching data: ' + data);
    this.dispatch(data)
  },

  async1(data) {
    console.log('action async1 started with data: ' + data);
    setTimeout(() => {
      console.log('action async1 dispatching data: ' + data);
      this.dispatch(data);
    }, 500);
  },

  async2(data) {
    console.log('action async2 started with data: ' + data);
    setTimeout(() => {
      console.log('action async2 dispatching data: ' + data);
      this.dispatch(data);
    }, 1000);
  }
});

export default Actions;