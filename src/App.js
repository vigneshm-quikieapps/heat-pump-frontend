import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import {BrowserRouter,Routes,Route} from "react-router-dom";

import { connect } from 'react-redux';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Routes>
         <Route path = "/login" element={<Login/>} />
            
         </Routes>
      </BrowserRouter>
     
    </div>
  );
}


const mapStateToProps = (state) => ({
   
    
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(App);