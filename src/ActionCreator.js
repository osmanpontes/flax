import ActionFactory from './ActionFactory';

const ActionCreator = function (spec) {
  for (let propName in spec) {
    if (!spec.hasOwnProperty(propName)) {
      continue;
    }

    switch (typeof spec[propName]) {
      case 'function':
        this[propName] = ActionFactory.createAction(spec, propName);

        spec[propName] = this[propName];

        break;
      default:
        this[propName] = spec[propName];
        break;
    }
  }
};

export default ActionCreator;