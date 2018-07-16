/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();*/

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import DetailForecastComponent from "./Components/DetailForecastComponent";
import reducer from './Reducers/IndexReducer';

const store = createStore( reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);