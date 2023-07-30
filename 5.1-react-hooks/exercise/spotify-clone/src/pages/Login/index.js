import {windowStyle, cardStyle, h1Style, pStyle, buttonStyle} from "./style";
import Window from '../../components/Window';
import Card from '../../components/Card';
import Button from '../../components/Button';

export default function Index() {
  function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return base64encode(digest);
  }

  function handleLoginClick() {
    const clientId = 'cea4b48f394e4ce1968c9adae17781c3';
    const redirectUri = 'http://localhost:3000/auth';

    let codeVerifier = generateRandomString(128);

    generateCodeChallenge(codeVerifier).then(codeChallenge => {
      let state = generateRandomString(16);
      let scope = 'playlist-modify-private';

      localStorage.setItem('code_verifier', codeVerifier);

      let args = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
      });

      window.location = 'https://accounts.spotify.com/authorize?' + args;
    });
  }

  return (
    <Window style={windowStyle}>
      <Card style={cardStyle}>
        <h1 style={h1Style}>
          Welcome back ♪(^∇^*)
        </h1>

        <p style={pStyle}>
          Please continue with your Spotify account
        </p>

        <Button
          onClick={handleLoginClick}
          style={buttonStyle}
          text="Login with Spotify"
        />
      </Card>
    </Window>
  );
}
