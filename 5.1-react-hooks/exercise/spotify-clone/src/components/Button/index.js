import './style.css';

export default function Index({onClick, style, text, disabled}) {
  return (
    <button
      onClick={onClick}
      style={{...style}}
      disabled={disabled}
    >
      {text}
    </button>
  );
}