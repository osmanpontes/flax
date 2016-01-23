import ActionFactory from './ActionFactory';

var ActionCreator = function (spec) {
  for (var propName in spec) {
    if (!spec.hasOwnProperty(propName)) {
      continue;
    }

    switch (typeof spec[propName]) {
      case 'function':
        this[propName] = ActionFactory.createAction(spec, propName);

        // HACK
        spec[propName] = this[propName];

        break;
      default:
        this[propName] = spec[propName];
        break;
    }
  }
};

export default ActionCreator;