import React from 'react';
import ReactDOM from 'react-dom';

import TodoApp from './components/TodoApp.jsx';

import {FlaxController} from 'flax';

function resetApp() {
  ReactDOM.unmountComponentAtNode(document.getElementById('todoapp'));
  ReactDOM.render(<TodoApp />, document.getElementById('todoapp'));
}

resetApp();

ReactDOM.render(<FlaxController reset={resetApp}/>, document.getElementById('flax'));