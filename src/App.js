import React, { Component } from 'react';
import Overview from './views/overview/Overview';
import Detail from './views/detail/Detail';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">

        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={routeProps => <Overview {...routeProps} />} />
            <Route path='/costcentre/:costId/:tab' render={routeProps => <Detail {...routeProps} />} />

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
