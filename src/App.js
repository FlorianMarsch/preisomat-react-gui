import React, { Component } from 'react';
import Overview from './views/overview/Overview';
import Detail from './views/detail/Detail';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import brown from '@material-ui/core/colors/brown';
import amber from '@material-ui/core/colors/amber';
const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: brown
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' render={routeProps => <Overview {...routeProps} />} />
              <Route path='/costcentre/:costId/:tab' render={routeProps => <Detail {...routeProps} />} />

            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
