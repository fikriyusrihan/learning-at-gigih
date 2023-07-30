import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getAccessToken} from "../../utils/tokenize";
import Window from "../../components/Window";
import Card from "../../components/Card";
import {cardStyle, infoStyle, windowStyle} from "./style";

export default function Index() {
  const isLoading = useRef(false);
  const navigate = useNavigate();
  const [dots, setDots] = useState('');

  function handleAuth() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    localStorage.setItem('code', code);

    getAccessToken().then(() => {
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    });
  }

  useEffect(handleAuth, [navigate]);
  useEffect(() => {
    if (isLoading.current) return;
    isLoading.current = true;

    setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 500);
  },);

  return (
    <Window style={windowStyle}>
      <Card style={cardStyle}>
        <p style={infoStyle}>ℹ️ Info</p>
        <p>You will immediately be redirected to the home page{dots}</p>
      </Card>
    </Window>
  );
}