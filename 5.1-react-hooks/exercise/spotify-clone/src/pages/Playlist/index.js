import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import Window from "../../components/Window";
import Row from "../../components/Row";
import Track from "../../components/Track";
import TrackAction from "../../components/TrackAction";
import Breadcrumb from "../../components/Breadcrumb";
import {refreshAccessToken} from "../../utils/tokenize";

export default function Index() {
  const params = useParams();
  const [playlist, setPlaylist] = useState({});

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
  ]

  const handleRemoveTrack = (trackUri) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Are you sure to delete this song?')) {
      return;
    }

    const {playlistId} = params;
    const accessToken = localStorage.getItem('access_token');
    const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    const body = {
      tracks: [
        {
          uri: trackUri,
        },
      ],
    }

    fetch(endpoint, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(body),
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
    }).catch(error => {
      console.error(error);
    }).finally(() => {
      alert('The selected song has successfully deleted from this playlist');

      const {playlistId} = params;
      fetchPlaylist(playlistId);
    });
  }

  const fetchPlaylist = (playlistId) => {
    const accessToken = localStorage.getItem('access_token');
    const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}`

    fetch(endpoint, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
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
      setPlaylist(data);
    }).catch(error => {
      console.error(error);
    });
  }

  useEffect(() => {
    const {playlistId} = params;
    fetchPlaylist(playlistId);
  }, [params]);

  if (!localStorage.getItem('authenticated')) {
    return <Navigate replace to='/'/>
  }

  return (
    <Window style={{
      marginBottom: '32px',
    }}>
      <Navbar/>

      <Card style={{
        margin: '0 16px',
      }}>
        <Breadcrumb paths={paths} style={{
          marginBottom: '32px'
        }}/>

        <Row style={{
          justifyContent: 'start',
          alignItems: 'stretch',
          marginBottom: '32px'
        }}>
          <img
            src={playlist.images?.length > 0 ? playlist.images[0].url : ''}
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
        </Row>

        <Row>
          <Card style={{
            width: '100%',
            border: 'none',
            boxShadow: 'none',
            padding: '0',
          }}>
            {playlist?.tracks?.items.map((item) => (
              <Track key={item.track.id} track={item.track}>
                <TrackAction
                  track={item.track}
                  text="Del"
                  onClick={() => {
                    handleRemoveTrack(item.track.uri);
                  }}
                  style={{
                    backgroundColor: 'orangered',
                  }}
                />
              </Track>
            ))}
          </Card>
        </Row>
      </Card>
    </Window>
  );
}