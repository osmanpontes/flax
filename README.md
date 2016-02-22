# Flax

A productive flux implementation to be used with ReactJS

Flax is based on ReactJS [Flux](https://facebook.github.io/flux/docs/overview.html)

## Goals

* Objectivity and clarity
* Maintain as much freedom as ReactJS Flux
* Productivity
* Common flux problems proposal solution

## Usage

### Actions

```js
import Flax from 'flax';

const AppActions = Flax.createActionCreator({
  displayName: 'AppActions',

  // Action with empty payload
  action1() {
    // ...
    this.dispatch();
  },
  
  // Action with some payload
  action2(x, y) {
    x++;
    y++;
    this.dispatch({x, y});
  },
  
  // Async action
  action3(x) {
    this.dispatch({loading: true});
    fecth('<url>').then(response => {
      let data = response.json() + x;
      this.dispatch({
        loading: false,
        data
      });
      this.resolve(); // action finished successful
    }).catch(err => {
      this.dispatch({
        loading: false,
        err
      });
      this.reject(); // action finished with failure
    });
  }

});

export default CounterActions;
```

### Stores

```js
import Flax from 'flax';
import AppActions from '../actions/AppActions.jsx';

const AppStore = Flax.createStore({
  displayName: 'AppStore',

  getInitialState() {
    return {
      num1: 0,
      num2: 0,
      loading: false,
      error: null
    };
  },

  getActionBinds() {
    return [
      [AppActions.action1, this._handleAction1],
      [AppActions.action2, this._handleAction2],
      [AppActions.action3, this._handleAction3]
    ];
  },

  events: {
    NUM1: null,
    NUM2: null,
    LOADING: null,
    ERROR: null
  },

  _handleAction1() {
    this.state.num1 = 0;
    this.state.num2 = 0;
    this.emitChange(this.NUM1);
    this.emitChange(this.NUM2);
  },

  _handleAction2(payload) {
    this.state.num1 = payload.x;
    this.state.num2 = payload.y;
    this.emitChange(this.NUM1);
    this.emitChange(this.NUM2);
  },

  _handleAction3({loading, data, err}) {
    this.state.loading = false;
    if (err) return this.emitChange(this.ERROR);
    if (loading) {
      this.state.loading = true;
      this.emitChange(this.LOADING);
    } else {
      this.state.num1 = data;
      this.emitChange(this.NUM1);
    }
  },

  getters: {
    getNum1() {
      return this.state.num1;
    },

    getNum2() {
      return this.state.num2;
    },

    getLoading() {
      return this.state.loading;
    },

    getError() {
      return this.state.error;
    }
  }
  
});

export default AppStore;
```

### View Controller

```js
import React from 'react';
import AppActions from '../actions/AppActions.jsx';
import AppStore from '../stores/AppStore.js';

import {
  StoreWatcher
} from 'flax';

const App = React.createClass({
  mixins: [StoreWatcher],

  getEventBinds() {
    return [
      [CounterStore.NUM1, this._handleNum1],
      [CounterStore.NUM2, this._handleNum2],
      [CounterStore.LOADING, this._handleLoading],
      [CounterStore.ERROR, this._handleError]
    ];
  },

  getInitialState() {
    return {
      num1: AppStore.getNum1(),
      num2: AppStore.getNum2(),
      loading: AppStore.getLoading(),
      error: AppStore.getError()
    };
  },

  _handleNum1() {
    this.setState({
      num1: AppStore.getNum1()
    });
  },

  _handleNum2() {
    this.setState({
      num2: AppStore.getNum2()
    });
  },

  _handleLoading() {
    this.setState({
      loading: AppStore.getLoading()
    });
  },

  _handleError() {
    this.setState({
      error: AppStore.getError()
    });
  },

  _handleAction1() {
    AppActions.action1();
  },

  _handleAction2() {
    AppActions.action2(1, 2);
  },

  _handleAction3() {
    // Action chaining is important to wait async action
    AppActions.action3(10).then(() => {
      AppActions.action1();
      AppActions.action2(-1, -2);
    }).catch(() => {
      AppActions.action2(0, 0);
    });
  },

  render() {
    let {num1, num2, loading, error} = this.state;
    
    return (
      <div>
        {loading ? <p>Loading...</p> : null}
        {error ? <p>{error}</p> : null}
        <button onClick={this._handleAction1}>Action1</button>
        <button onClick={this._handleAction2}>Action2</button>
        <button onClick={this._handleAction3}>Action3</button>
        <p>{num1}</p>
        <p>{num2}</p>
      </div>
    );
  }
});

export default App;
```

getInitialState could be:

```js
getInitialState() {
  return {
    num1: AppStore.getState().num1,
    num2: AppStore.getState().num2,
    loading: AppStore.getState().loading,
    error: AppStore.getState().error
  };
},
```

Or in a cleaner code:

```js
getInitialState() {
  return AppStore.getState();
},
```

The getEventBinds could be:

```js
getEventBinds() {
  return [
    [CounterStore.NUM1, this._handleChange],
    [CounterStore.NUM2, this._handleChange],
    [CounterStore.LOADING, this._handleChange],
    [CounterStore.ERROR, this._handleChange]
  ];
},
```

And the store event handles:

```js
_handleChange() {
  this.setState(AppStore.getState());
},
```

## License

MIT

## Contributors

* [osmanpontes](https://github.com/osmanpontes)
* [samuelmtimbo](https://github.com/samuelmtimbo)