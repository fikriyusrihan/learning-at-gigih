import Window from '../../../components/Window';
import Navbar from "../../../components/Navbar";
import Breadcrumb from "../../../components/Breadcrumb";
import Card from "../../../components/Card";
import Input from "../../../components/Input";
import {useState} from "react";
import Row from "../../../components/Row";
import {Navigate, useNavigate} from "react-router-dom";
import {refreshAccessToken} from "../../../utils/tokenize";

export default function Index() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    public: '',
  });

  const paths = [
    {
      title: 'Home',
      url: '/home',
      isActive: true,
    },
    {
      title: 'Playlist',
      url: '/playlists/:playlistId',
      isActive: false,
    }
  ];

  const handleTitleChange = (value) => {
    setForm({...form, name: value});
  }

  const handleDescriptionChange = (value) => {
    setForm({...form, description: value});
  }

  const handleIsPublicChange = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('access_token');
    const userId = localStorage.getItem('user_id');

    const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;

    fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(form),
    }).then(response => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshAccessToken().then(() => {
            window.location.reload();
          });
        }

        throw new Error('HTTP status ' + response.status);
      }
      return response.json();
    }).then(data => {
      const {id} = data;
      navigate(`/playlists/${id}`);
    }).catch(error => {
      console.error(error);
    })
  }

  if (!localStorage.getItem('authenticated')) {
    return <Navigate replace to='/'/>
  }

  return (
    <Window>
      <Navbar/>

      <Card style={{
        margin: '0 16px',
        marginBottom: '32px'
      }}>
        <Breadcrumb paths={paths} style={{
          marginBottom: '32px'
        }}/>

        <h2 style={{
          margin: 0,
        }}>
          Craft Your Playlist 🎶
        </h2>

        <p style={{
          marginBottom: '32px'
        }}>Ready to curate your own musical masterpiece? Just a few beats away! Fill out the form below and let the
          magic begin. Your tunes, your vibe – it's time to hit play on your new playlist.</p>

        <form onSubmit={handleSubmit} style={{width: '100%'}}>
          <label htmlFor="playlist-title">
            <Row>
              <Input
                id="playlist-title"
                type="text"
                name="title"
                placeholder="Title"
                value={handleTitleChange}
                style={{
                  width: '100%'
                }}
              />
            </Row>
          </label>
          <br/>

          <label htmlFor="playlist-description">
            <Row>
              <Input
                id="playlist-description"
                type="text"
                name="description"
                placeholder="Description"
                value={handleDescriptionChange}
                style={{
                  width: '100%'
                }}
              />
            </Row>
          </label>
          <br/>

          <label htmlFor="playlist-is-public">
            <select
              name="public"
              id="playlist-is-public"
              value={form.public}
              onChange={handleIsPublicChange}
              style={{
                padding: '8px 16px',
                border: 'black solid 2px',
                borderRadius: '32px',
                fontFamily: "Roboto Mono, monospace",
                width: '100%'
              }}
            >
              <option value="" disabled selected>Playlist type</option>
              <option value="false">Private</option>
              <option value="true">Public</option>
            </select>
          </label>
          <br/>

          <button type="submit" style={{marginTop: '16px', width: '100%'}}>
            Create
          </button>
        </form>
      </Card>
    </Window>
  )
}