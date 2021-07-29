import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeScreen from './components/screens/HomeScreen';
import Dashboard from './components/screens/Dashboard';
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import './App.css';
import NavBar from './components/SideBar/NavBar';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <NavBar />
            <Link className="brand" to="/">
              Affiliaters
            </Link>
          </div>
          <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Sign In</Link>
          </div>
        </header>

        <main>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/signin" component={Signin}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
          All rights reserved - <br />
          <small>
            Developed by <strong>Olzy Innovation</strong>
          </small>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
