import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import 'font-awesome/css/font-awesome.min.css'; 
import Main from './components/Main';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Main />, document.getElementById('root'));
serviceWorker.unregister();
