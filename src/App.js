import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/navbar';
import CreateCV from './components/create/create';
import StartCreate from './components/create/startCreate';
import ViewCV from './components/view/view';
import ViewMore from './components/view/view-more';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {isLogin} from './components/share/authService'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<StartCreate />}/>
          <Route path="/" element={<ViewCV />} />
          {/* user have to logged in can route to create + paramaters  */}
          {isLogin() && <Route path="/create/:id" element={<CreateCV />} />}
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
