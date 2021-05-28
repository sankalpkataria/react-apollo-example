import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App(): React.ReactElement {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/"></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
