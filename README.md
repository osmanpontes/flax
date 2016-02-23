# Flax

A productive flux implementation to be used with ReactJS

Flax is based on [Flux](https://facebook.github.io/flux/docs/overview.html)

## Goals

* Productivity, objectivity and clarity
* Maintain as much freedom as traditional Flux
* Common flux problems solution proposals

## Why Flax?
 
 Flax is being developed to address professional level challenges with:

* Clarity: Flax lets you write Flux in a similar way you would write an app with ReactJS, making it intuitive to learn;
* Productivity: Flax reduces the common boilerplate while not losing granularity such as the [publish-subscribe stores' pattern](https://facebook.github.io/flux/docs/todo-list.html#creating-stores), but still making simpler syntax possible;
* Seamlessness: with Flax, for instance, there is little difference between sync and async actions, making action creators easy to implement without additional middleware;
* Pattern-oriented: alongside with the [docs](https://github.com/osmanpontes/flax), this repository is being built to also show the best unidirectional dataflow practices to be used with Flax;
* Developer tools: Flax is being designed to support the creation of user-defined development tools. See [flax-devtools](https://github.com/samuelmtimbo/flax-devtools), as an example;

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
  
  /*
  *  We suggest all async requests to be done inside action creators as a form of keeping the stores sync
  */
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

export default AppActions;
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
      [AppStore.NUM1, this._handleNum1],
      [AppStore.NUM2, this._handleNum2],
      [AppStore.LOADING, this._handleLoading],
      [AppStore.ERROR, this._handleError]
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
    // Action chaining is important to wait for async action
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
  let {num1, num2, loading, error} = AppStore.getState();
  return {num1, num2, loading, error};
},
```

Or in a cleaner code:

```js
getInitialState() {
  return AppStore.getState();
},
```

If you want less granularity, the component could be set to listen to all AppStore's events:

```js
getEventBinds() {
  return [
    [AppStore.DEFAULT, this._handleAppChange]
  ];
},
```

And the store event handles:

```js
_handleAppChange() {
  this.setState(AppStore.getState());
},
```

## License

MIT

## Contributors

* [osmanpontes](https://github.com/osmanpontes)
* [samuelmtimbo](https://github.com/samuelmtimbo)
