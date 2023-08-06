import './style.css';

export default function Index({id, onClick, style, text, disabled}) {
  return (
    <button
      id={id}
      onClick={onClick}
      style={{...style}}
      disabled={disabled}
    >
      {text}
    </button>
  );
}