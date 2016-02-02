import ReactDOM from 'react-dom';
import React from 'react';

import App from './components/App.jsx';

import {FlaxController} from 'flax';

function resetApp() {
  ReactDOM.unmountComponentAtNode(document.getElementById('app'));
  ReactDOM.render(<App />, document.getElementById('app'));
}

resetApp();

if (process.env.NODE_ENV !== "production") {
  ReactDOM.render(<FlaxController reset={resetApp}/>, document.getElementById('flax'));
}