import ActionCreator from './ActionCreator';

const ActionCreatorFactory = {
  createActionCreator(spec) {
    return new ActionCreator(spec);
  }
};

export default ActionCreatorFactory;