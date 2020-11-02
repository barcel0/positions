import React from 'react';
import NavBar from './Components/NavBar';
import Main from './Components/Main/Main';
import Contract from './Components/Contract/Contract';
import Adm from './Components/Adm/Adm';
import Footer from './Components/Footer';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Main} />
            <Route
              path="/contract/:contractcategory/:contractslug"
              render={({ match }) =>
                <Contract
                  contractSlug={match.params.contractslug}
                  contractCategory={match.params.contractcategory}
                />
              }
            />
            <Route path="/nw16ug" exact component={Adm} />
            <Route path="*"><Redirect to='/' /></Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;