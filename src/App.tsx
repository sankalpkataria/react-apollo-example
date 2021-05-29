import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SampleFormContainer } from 'pages/sample-form/sample-form.container';

function App(): React.ReactElement {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={SampleFormContainer}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
