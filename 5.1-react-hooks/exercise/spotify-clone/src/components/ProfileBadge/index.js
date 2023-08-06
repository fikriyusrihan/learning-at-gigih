import {useEffect, useState} from "react";

export default function Index({style}) {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getProfile = async () => {
    setIsLoading(true);

    const accessToken = localStorage.getItem('access_token');
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });

    const data = await response.json();

    localStorage.setItem('user_id', data.id);

    setProfile(data);
  }

  useEffect(() => {
    getProfile().then(() => {
      setIsLoading(false);
    });
  }, []);

  const componentStyle = {
    parent: {
      padding: '2px 16px',
      display: 'flex',
      alignItems: 'center',
      border: 'black solid 2px',
      borderRadius: '32px',
      fontSize: '12px',
      fontWeight: 'bold',
      ...style,
    },
    image: {
      width: '32px',
      height: '32px',
      marginRight: '8px',
      borderRadius: '32px',
    },
  }

  return (
    <div style={componentStyle.parent}>
      {isLoading ? <p>Loading...</p> : (
        <>
          <img style={componentStyle.image} src={profile.images && profile.images[0].url} alt="profile"/>
          <p>{profile.display_name && profile.display_name}</p>
        </>
      )}
    </div>
  );
}