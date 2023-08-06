import {useEffect, useState} from "react";
import Loading from '../../../components/Loading';
import Row from "../../../components/Row";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Playlist from "../../../components/Playlist";
import {useNavigate} from "react-router-dom";
import {refreshAccessToken} from "../../../utils/tokenize";

export default function Index() {
  const navigate = useNavigate();
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleNextClick = () => {
    setIsLoading(true);

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
      setResponse(data);
    }).catch(error => {
      console.error('Error:', error);
    }).finally(() => {
      setIsLoading(false);
    });
  }
  const handlePreviousClick = () => {
    setIsLoading(true);

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
      setResponse(data);
    }).catch(error => {
      console.error('Error:', error);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const handlePlaylistClick = (playlistId) => {
    navigate(`/playlists/${playlistId}`);
  }

  const handleNewPlaylistClick = () => {
    navigate('/playlists/create');
  }

  useEffect(() => {
    setIsLoading(true);

    const accessToken = localStorage.getItem('access_token');
    const body = {
      limit: 5,
    }
    const endpoint = `https://api.spotify.com/v1/me/playlists?${new URLSearchParams(body)}`;

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
      return response.json()
    }).then(data => {
      setResponse(data);
    }).catch(error => {
      console.error(error);
    }).finally(() => {
      setIsLoading(false);
    })
  }, []);

  return (
    <>
      <Row style={{
        marginBottom: '16px',
      }}>
        <div>
          <h2 style={{
            margin: '0 0 4px 0',
          }}>Your Playlists</h2>

          <p style={{
            margin: 0,
          }}>
            {isLoading ?
              <span>Please kindly wait<Loading/></span> :
              <span>Create and customize your musical world（￣︶￣）↗</span>}
          </p>
        </div>

        <Button text="+ New" onClick={handleNewPlaylistClick}/>
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
              {response.items.map((playlist) => (
                <Playlist key={playlist.id} playlist={playlist} onClick={() => handlePlaylistClick(playlist.id)}/>
              ))}
            </Card>
          </Row>
        </>
      )}
    </>
  );
}