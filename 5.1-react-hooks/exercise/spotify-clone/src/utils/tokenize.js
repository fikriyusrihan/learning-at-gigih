async function getAccessToken() {
  const codeVerifier = localStorage.getItem('code_verifier');
  const code = localStorage.getItem('code');

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: 'http://localhost:3000/auth',
    client_id: 'cea4b48f394e4ce1968c9adae17781c3',
    code_verifier: codeVerifier
  });

  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST', headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }, body,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      const {access_token, refresh_token, token_type} = data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('token_type', token_type);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

async function refreshAccessToken() {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: localStorage.getItem('refresh_token'),
    client_id: 'cea4b48f394e4ce1968c9adae17781c3',
  });

  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST', headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }, body,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      const {access_token, refresh_token, token_type} = data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('token_type', token_type);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

export {
  getAccessToken,
  refreshAccessToken
}