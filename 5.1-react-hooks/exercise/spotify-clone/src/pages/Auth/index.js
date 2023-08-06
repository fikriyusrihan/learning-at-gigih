import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getAccessToken} from "../../utils/tokenize";
import Window from "../../components/Window";
import Card from "../../components/Card";
import Loading from '../../components/Loading';
import {cardStyle, infoStyle, windowStyle} from "./style";

export default function Index() {
  const navigate = useNavigate();

  function handleAuth() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
      navigate('/');
    }

    localStorage.setItem('code', code);

    getAccessToken().then(() => {
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    });
  }

  useEffect(handleAuth, [navigate]);

  return (
    <Window style={windowStyle}>
      <Card style={cardStyle}>
        <p style={infoStyle}>ℹ️ Info</p>
        <p>You will immediately be redirected to the home page<Loading/></p>
      </Card>
    </Window>
  );
}