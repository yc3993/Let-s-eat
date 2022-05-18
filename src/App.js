import LandingPage from "./LandingPage/LandingPage";
import TopNav from "./TopNav/TopNav";
import Search from "./pages/Search";
import GroupRec from "./pages/GroupRec";
import GroupInfo from "./pages/GroupInfo";
import SignUp from "./pages/SignUp";
import Show from "./pages/Show";
import Test from "./pages/test";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <div> 
      <Router>
        <TopNav />       
        <Routes>
          <Route exact path = "/" element={<LandingPage/>}/>
          <Route exact path = "/search" element={<Search/>}/>
          <Route exact path = "/group" element={<GroupRec/>}/>
          <Route exact path = "/ginfo" element={<GroupInfo/>}/>
          <Route exact path = "/sign" element={<SignUp/>}/>
          <Route exact path = "/show" element={<Show/>}/>
          <Route exact path = "/test" element={<Test/>}/>
        </Routes>
      </Router>
    </div>   
  );
}

export default App;
