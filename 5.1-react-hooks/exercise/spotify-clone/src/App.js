import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './pages/Login';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Playlist from './pages/Playlist';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/home" element={<Home/>}/>

        <Route path="/playlists/:playlistId" element={<Playlist/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
