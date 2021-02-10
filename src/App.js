import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import MainPage from './pages/MainPage';
import { createContext } from "react";
import { useState } from "react";
import { getToken } from './Utils/cookie';

export const UserContext = createContext([]);

function App() {
  const [user, setUser] = useState({accesstoken: getToken()});

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/" component={MainPage} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
