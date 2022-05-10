import { Switch, Route } from 'react-router-dom';
import Auth from './views/Auth/Auth';
import Dashboard from './views/Dashboard/Dashboard';
import Home from './views/Home/Home';
import Header from './components/Header';
import { UserProvider } from './context/UserContext';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <UserProvider>
      <Header />
      <Switch>
        <Route path='/login'>
          <Auth/>
        </Route>
        <PrivateRoute path='/dashboard'>
          <Dashboard/>
        </PrivateRoute>
        <PrivateRoute path='/'>
          <Home/>
        </PrivateRoute>
      </Switch>
    </UserProvider>
  );
}
