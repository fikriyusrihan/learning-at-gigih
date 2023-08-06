import Button from "../Button";

export default function Index({track, text, onClick, style}) {
  return (
    <Button id={track.id} onClick={onClick} text={text} style={{
      padding: '8px 12px',
      ...style,
    }}/>
  )
}