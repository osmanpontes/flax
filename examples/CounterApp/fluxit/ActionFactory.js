import DispatchCreator from './DispatchCreator';

const ActionFactory = {
  createAction(spec, funcName) {
    var action,
      type = `${spec.displayName}/${funcName}`,
      scope = Object.assign(new DispatchCreator(type), spec);

    action = spec[funcName].bind(scope);
    action.actionType = type;

    return action;
  }
};

export default ActionFactory;