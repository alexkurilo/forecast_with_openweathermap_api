import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import ForecastComponent from "./Components/ForecastComponent";
import DetailForecastComponent from "./Components/DetailForecastComponent";

import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path = '/' component = {ForecastComponent} />
                    <Route path = '/:cityName' component = {DetailForecastComponent} />
                </ Switch>
            </div>
        );
    }
}

export default App;
