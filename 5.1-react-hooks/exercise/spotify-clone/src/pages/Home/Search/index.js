import Row from "../../../components/Row";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Track from "../../../components/Track";
import {useState} from "react";

export default function Index() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
                <Track key={track.id} track={track}/>
              ))}
            </Card>
          </Row>
        </>
      )}
    </>
  )
}