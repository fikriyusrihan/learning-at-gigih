import {BrowserRouter, Routes, Route} from "react-router-dom";
import Auth from './pages/Auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Playlist from './pages/Playlist';
import CreatePlaylist from './pages/Playlist/CreatePlaylist';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/home" element={<Home/>}/>

        <Route path="/playlists/:playlistId" element={<Playlist/>}/>
        <Route path="/playlists/create" element={<CreatePlaylist/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
