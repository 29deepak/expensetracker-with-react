import React ,{useState} from 'react';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Expense from './components/expense_tracker/Expense';
import { BrowserRouter as Router , Switch ,Route } from 'react-router-dom/cjs/react-router-dom.min';
const App=()=> {
  
  return (
   <>
   <Router>
    <Switch>
      <Route exact path="/"><Signup/></Route>
      <Route exact path="/login" ><Login /></Route>
      <Route exact path="/expense"><Expense/></Route>

    </Switch>
   </Router>
   </>
  );
}

export default App;
