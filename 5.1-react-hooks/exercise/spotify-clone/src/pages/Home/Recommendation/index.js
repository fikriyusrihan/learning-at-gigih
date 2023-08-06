import {useEffect, useState} from "react";
import Row from "../../../components/Row";
import Card from "../../../components/Card";
import Track from "../../../components/Track";
import Loading from '../../../components/Loading';
import Button from '../../../components/Button';
import Window from "../../../components/Window";
import Playlist from "../../../components/Playlist";
import TrackAction from "../../../components/TrackAction";
import {refreshAccessToken} from "../../../utils/tokenize";

export default function Index() {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  const [selectedTrackUri, setSelectedTrackUri] = useState();
  const [playlists, setPlaylists] = useState({});

  const fetchUserTopTracksId = async () => {
    const accessToken = localStorage.getItem('access_token');
    const endpoint = 'https://api.spotify.com/v1/me/top/tracks?limit=5';

    return fetch(endpoint, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
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
      return data.items.map(item => item.id);
    }).catch(error => {
      console.error(error);
    });
  }

  const fetchRecommendation = async () => {
    setIsLoading(true);

    const trackIds = await fetchUserTopTracksId();
    const seedTracks = trackIds.join(',');

    const body = {
      seed_tracks: seedTracks,
      limit: 5,
    }

    const accessToken = localStorage.getItem('access_token');
    const endpoint = `https://api.spotify.com/v1/recommendations?${new URLSearchParams(body)}`;

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
      const {tracks} = data;
      setResponse(tracks);
    }).catch(error => {
      console.error(error);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const handleAddClick = (trackUri) => {
    setShowAddToPlaylist(true);
    setSelectedTrackUri(trackUri);

    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  const handleCloseDialogClick = () => {
    setShowAddToPlaylist(false);
  }

  const handleClickPlaylist = (playlistId) => {
    const accessToken = localStorage.getItem('access_token');
    const body = {
      position: 0,
      uris: selectedTrackUri
    }
    const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?${new URLSearchParams(body)}`;

    fetch(endpoint, {
      method: 'POST', headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }).then(response => {
      if (response.ok) alert('Song successfully added to the playlist');
      else {
        if (response.status === 401) {
          refreshAccessToken().then(() => {
            window.location.reload();
          });
        }

        throw new Error('HTTP status ' + response.status);
      }
    }).finally(() => {
      setShowAddToPlaylist(false);
    });
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const endpoint = `https://api.spotify.com/v1/me/playlists`;

    fetch(endpoint, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      }
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
      setPlaylists(data);
    }).catch(error => {
      console.error(error);
    });
  }, [showAddToPlaylist]);

  useEffect(() => {
    fetchRecommendation().then();
  }, []);

  return (
    <>
      <Row style={{
        marginBottom: '16px',
      }}>
        <div>
          <h2 style={{
            margin: '0 0 4px 0',
          }}>Based on your favorite songs</h2>


          <p style={{
            margin: 0,
          }}> {isLoading ?
            <span>Please kindly wait<Loading/></span> :
            <span>Try to listen one of them b(￣▽￣)d</span>}
          </p>
        </div>

        <Button text="Refresh" onClick={fetchRecommendation}/>
      </Row>

      {response.length > 0 && (
        <Row>
          <Card style={{
            width: '100%',
            border: 'none',
            boxShadow: 'none',
            padding: '0',
          }}>
            {response.map((track) => (
              <Track
                key={track.id}
                track={track}
              >
                <TrackAction
                  track={track}
                  text='+'
                  onClick={() => handleAddClick(track.uri)}
                />
              </Track>
            ))}
          </Card>
        </Row>
      )}

      {showAddToPlaylist && (
        <Window style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: '32px'
        }}>
          <Card>
            <Row>
              <h2 style={{margin: 0}}>Add to Playlist</h2>

              <Button onClick={handleCloseDialogClick} text='X' style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                marginRight: '16px'
              }}/>
            </Row>

            <p style={{margin: 0, marginBottom: '32px'}}>Please select a playlist</p>

            <Row>
              <Card style={{
                width: '100%',
                border: 'none',
                boxShadow: 'none',
                padding: '0',
              }}>
                {playlists?.items?.map((playlist) => (
                  <Playlist key={playlist.id} playlist={playlist} onClick={() => handleClickPlaylist(playlist.id)}/>
                ))}
              </Card>
            </Row>
          </Card>
        </Window>
      )}
    </>
  )
}