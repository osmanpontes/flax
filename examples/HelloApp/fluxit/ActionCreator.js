import Dispatcher from './Dispatcher';

var ActionCreator = function (spec) {
  var func, funcName;
  for (var propName in spec) {
    if (!spec.hasOwnProperty(propName)) {
      continue;
    }

    switch (typeof spec[propName]) {
      case 'function':
        funcName = propName;
        func = spec[funcName];

        this[funcName] = (function (funcName, func) {
          return function () {
            func.apply(Object.assign({
              dispatch(payload) {
                Dispatcher.dispatch({type: funcName, payload});
              }
            }, spec), arguments);
          };
        })(funcName, func);

        this[funcName].actionType = funcName;
        break;
      default:
        this[propName] = spec[propName];
        break;
    }


  }
};

export default ActionCreator;