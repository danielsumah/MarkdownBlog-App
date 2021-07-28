import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { history } from './helpers';

import Layout from './containers/Layout'
import PostList from './containers/PostList'
import PostDetail from './containers/PostDetail'
import PostCreate from './containers/PostCreate'
import PostUpdate from './containers/PostUpdate'
import PostDelete from './containers/PostDelete'
import Login from './containers/Login'
import Signup from './containers/Signup';
import PrivateRoute from './containers/PrivateRoute';

function App() {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route exact path="/" component={PostList} />
          <PrivateRoute path="/create" component={PostCreate} />
          <Route exact path="/post/:postSlug" component={PostDetail} />
          <Route path="/post/:postSlug/update" component={PostUpdate} />
          <Route path="/post/:postSlug/delete" component={PostDelete} />
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;