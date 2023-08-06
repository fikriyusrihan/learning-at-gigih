import Row from "../../../components/Row";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Track from "../../../components/Track";
import TrackAction from "../../../components/TrackAction";
import Window from "../../../components/Window";
import {useEffect, useState} from "react";
import Playlist from "../../../components/Playlist";
import {refreshAccessToken} from "../../../utils/tokenize";

export default function Index() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  const [selectedTrackUri, setSelectedTrackUri] = useState();
  const [playlists, setPlaylists] = useState({});

  const getQueryFromInput = (value) => {
    setQuery(value);
  }

  const fetchTracks = async () => {
    const accessToken = localStorage.getItem('access_token');

    const body = {
      q: query,
      type: 'track',
      market: 'ID',
      limit: 5,
    }

    fetch(`https://api.spotify.com/v1/search?${new URLSearchParams(body)}`, {
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
      const {tracks} = data;
      setResponse(tracks);
    }).catch(error => {
      console.error('Error:', error);
    });
  }

  const handleSearchClick = () => {
    setIsLoading(true);

    fetchTracks().finally(() => {
      setIsLoading(false);
    });
  };

  const handlePreviousClick = () => {
    fetch(response.previous, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
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
      const {tracks} = data;
      setResponse(tracks);
    }).catch(error => {
      console.error('Error:', error);
    });
  }

  const handleNextClick = () => {
    fetch(response.next, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
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
      const {tracks} = data;
      setResponse(tracks);
    }).catch(error => {
      console.error('Error:', error);
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

  return (
    <>
      <h2 style={{
        margin: '0 0 16px 0',
      }}>Discover a new songs</h2>

      <Row>
        <Input value={getQueryFromInput} type="text" placeholder="Search music by title..." style={{
          width: '100%',
          marginRight: '16px',
        }}/>
        <Button onClick={handleSearchClick} text={isLoading ? 'Loading...' : 'Search'}/>
      </Row>

      {response.items?.length > 0 && (
        <>
          <Row style={{
            marginTop: '32px',
          }}>
            <Button onClick={handlePreviousClick} text="<" disabled={response.previous === null}/>
            <p style={{
              textAlign: 'center',
            }}>Showing {response.offset + 1} to {response.items.length + response.offset} of {response.total} results</p>
            <Button onClick={handleNextClick} text=">" disabled={response.next === null}/>
          </Row>

          <Row>
            <Card style={{
              width: '100%',
              border: 'none',
              boxShadow: 'none',
              padding: '0',
            }}>
              {response.items.map((track) => (
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
        </>
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