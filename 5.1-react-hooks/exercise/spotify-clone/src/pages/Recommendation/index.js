import {useEffect, useState} from "react";
import Row from "../../components/Row";
import Card from "../../components/Card";
import Track from "../../components/Track";
import Loading from '../../components/Loading';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState([]);

  const fetchUserTopTracksId = async () => {
    const accessToken = localStorage.getItem('access_token');
    const endpoint = 'https://api.spotify.com/v1/me/top/tracks?limit=5';

    return fetch(endpoint, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }
      return response.json();
    }).then(data => {
      return data.items.map(item => item.id);
    }).catch(error => {
      console.error(error);
    });
  }

  useEffect(() => {
    setIsLoading(true);

    const fetchRecommendation = async () => {
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
          throw new Error('HTTP status ' + response.status);
        }
        return response.json();
      }).then(data => {
        const {tracks} = data;
        setResponse(tracks);
      }).catch(error => {
        console.error(error);
      });
    }

    fetchRecommendation().finally(() => {
      setIsLoading(false)
    });
  }, []);

  return (
    <>
      <h2 style={{
        margin: '0 0 4px 0',
      }}>Based on your favorite songs</h2>


      <p style={{
        margin: 0,
        marginBottom: '16px',
      }}> {isLoading ?
        <span>Please kindly wait<Loading/></span> :
        <span>Try to listen one of them b(￣▽￣)d</span>}
      </p>

      {response.length > 0 && (
        <Row>
          <Card style={{
            width: '100%',
            border: 'none',
            boxShadow: 'none',
            padding: '0',
          }}>
            {response.map((track) => (
              <Track key={track.id} track={track}/>
            ))}
          </Card>
        </Row>
      )}
    </>
  )
}