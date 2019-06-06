import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import 'font-awesome/css/font-awesome.min.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
