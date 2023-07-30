import {useState} from "react";
import Window from '../../components/Window';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';
import Card from '../../components/Card';
import Row from '../../components/Row';
import Input from '../../components/Input';
import Track from '../../components/Track';
import {inputStyle} from "./style";

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState({});

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

    fetchTracks().then(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
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
    <Window>
      <Navbar/>

      <Card style={{
        margin: '0 16px',
      }}>
        <h1 style={{
          margin: '0',
        }}>
          Welcome back! (*/ω＼*)
        </h1>

        <p style={{
          marginTop: '8px',
          marginBottom: '48px',
        }}>
          What do you want to listen today?
        </p>
        <Row>
          <Input value={getQueryFromInput} style={inputStyle} type="text" placeholder="Search music by title..."/>
          <Button onClick={handleSearchClick} text={isLoading ? 'Loading...' : 'Search'}/>
        </Row>

        {response.items?.length > 0 && (
          <>
            <Row style={{
              marginTop: '48px',
            }}>
              <Button onClick={handlePreviousClick} text="<" disabled={response.previous === null}/>
              <p>Showing {response.offset + 1} to {response.items.length + response.offset} of {response.total} results</p>
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
      </Card>
    </Window>
  );
}