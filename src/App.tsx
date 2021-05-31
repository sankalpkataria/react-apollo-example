import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SampleFormContainer } from 'pages/sample-form/sample-form.container';
import { ResultComponent } from 'pages/results/results.component';

function App(): React.ReactElement {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={SampleFormContainer}></Route>
                <Route path="/results/:id" component={ResultComponent}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
