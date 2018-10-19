import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/index'

import { BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import createHistory from "history/createBrowserHistory"

const history = createHistory()

const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store} history={history}>
        <Router>
            <App />
        </Router>
    </Provider>,
     document.getElementById('root'));
registerServiceWorker();
