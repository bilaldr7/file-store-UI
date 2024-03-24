import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Layout from './layouts/layout';
import { useState, useEffect } from "react";
import AuthService from "./services/authService";
import FilesList from "./components/FilesList";
import NotFound from "./components/NotFound";
import File from "./components/File";
import { Redirect, useHistory } from 'react-router-dom/cjs/react-router-dom'
import Metrics from "./components/Metrics";
import Neighbours from "./components/Neighbours";
import { ToastContainer } from "react-toastify";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    AuthService.initKeycloak().then(userProfile => {
      setUser(userProfile);

    }).catch(error => {
      console.error('Erreur lors de l\'initialisation de Keycloak:', error);
    });
  }, []);
  function test() {
    AuthService.logout();
  }

  return (
    <Router>
      <div className="App vh-100">
        <ToastContainer />
        {AuthService.isLoggedIn() && <Switch>
          <Route exact path="/dossiers/:dossierId" >
            <Layout user={user}>
              <FilesList />
            </Layout>
          </Route>
          <Route exact path="/metrics" >
            <Layout user={user}>
              <Metrics />
            </Layout>
          </Route>
          <Route exact path="/network" >
            <Layout user={user}>
              <Neighbours />
            </Layout>
          </Route>
          <Route exact path="/files/:fileId" >
            <File />
          </Route>
          <Route path="/notfound" >
            <NotFound />
          </Route>
          <Route exact path="/">
            <Redirect to="/dossiers/root" />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>}
      </div>
    </Router>
  );
}

export default App;
