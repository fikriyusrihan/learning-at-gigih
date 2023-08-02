import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import Window from "../../components/Window";
import Row from "../../components/Row";
import Track from "../../components/Track";

export default function Index() {
  const params = useParams();
  const [playlist, setPlaylist] = useState({});

  useEffect(() => {
    const {playlistId} = params;
    const accessToken = localStorage.getItem('access_token');
    const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}`

    fetch(endpoint, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }).then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }
      return response.json();
    }).then(data => {
      console.log(data);
      setPlaylist(data);
    })

  }, [params]);

  return (
    <Window style={{
      marginBottom: '32px',
    }}>
      <Navbar/>

      <Card style={{
        margin: '0 16px',
      }}>
        <Row style={{
          justifyContent: 'start',
          alignItems: 'stretch',
          marginBottom: '32px'
        }}>
          <img
            src={playlist.images?.length > 0 && playlist.images[0].url}
            alt="Playlist's cover"
            style={{
              width: '200px',
              marginRight: '16px',
              border: 'black solid 2px',
              borderRadius: '8px',
            }}
          />

          <div style={{
            flexGrow: 1,
            marginTop: 'auto'
          }}>
            <p style={{
              fontSize: '12px'
            }}>
              {playlist.public ? 'Public Playlist' : 'Private Playlist'}
            </p>

            <h1 style={{
              margin: '0',
              fontSize: '2.8rem'
            }}>
              {playlist.name}
            </h1>

            <p style={{
              margin: 0,
              marginTop: '4px',
            }}>
              {playlist.description}
            </p>
          </div>

          <div style={{
            textAlign: 'right'
          }}>
            <a style={{fontSize: '14px'}} href='#'>Edit✏️ ️</a>
          </div>
        </Row>

        <Row>
          <Card style={{
            width: '100%',
            border: 'none',
            boxShadow: 'none',
            padding: '0',
          }}>
            {playlist?.tracks?.items.map((item) => (
              <Track key={item.track.id} track={item.track}/>
            ))}
          </Card>
        </Row>
      </Card>
    </Window>
  );
}