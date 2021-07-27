import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";

import Layout from './containers/Layout'
import PostList from './containers/PostList'
import PostDetail from './containers/PostDetail'
import PostCreate from './containers/PostCreate'
import PostUpdate from './containers/PostUpdate'
import PostDelete from './containers/PostDelete'
import Login from './containers/Login'
import Signup from './containers/Signup';
import PrivateRoute from './containers/PrivateRoute';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route exact path="/" component={PostList} />
          <PrivateRoute exact path="/create" component={PostCreate} />
          <Route exact path="/post/:postSlug" component={PostDetail} />
          <Route exact path="/post/:postSlug/update" component={PostUpdate} />
          <Route exact path="/post/:postSlug/delete" component={PostDelete} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;