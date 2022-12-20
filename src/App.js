import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/navbar';
import CreateCV from './components/create/create';
import StartCreate from './components/create/startCreate';
import ViewCV from './components/view/view';
import ViewMore from './components/view/view-more';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {isLogin} from './components/share/authService';
import Profile from './components/profile/profile';
import Home from './components/home/home';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home />}/>
          <Route path="/" element={<Home />} />
          {/* user have to logged in can route to create + paramaters  */}
          {isLogin() && <Route path="/create/:id" element={<CreateCV />} />}
          {isLogin() && <Route path="/profile/:id" element={<Profile />} />}
          {/* route view more and id param */}
          <Route path="/view/:id" element={<ViewMore />} />
          {/* set the creatcv is a children router of startcreate */}
          <Route path="startcreate" element={<StartCreate />}/>
          <Route path="/view" element={<ViewCV />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
