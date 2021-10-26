import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// Routing
import PrivateRoute from './routing/PrivateRoute';
import Dashboard from './routing/Dashboard/Dashboard';

// Screens
import PrivateScreen from './screens/Private/PrivateScreen';
import LoginScreen from './screens/Login/LoginScreen';
import RegisterScreen from './screens/Register/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPassword/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPassword/ResetPasswordScreen';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Switch>
          <PrivateRoute exact path='/' component={PrivateScreen} />
          {/* <PrivateRoute exact path='/' component={PrivateScreen} /> */}
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/register' component={RegisterScreen} />
          <Route
            exact
            path='/forgotpassword'
            component={ForgotPasswordScreen}
          />
          <Route
            exact
            path='/passwordreset/:resetToken'
            component={ResetPasswordScreen}
          />
          <Route exact path='/dashboard' component={Dashboard} />
          {/* Global Redirect */}
          <Redirect from='*' to='/' />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
