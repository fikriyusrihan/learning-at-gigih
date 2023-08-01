export default function Index({id, title, isActive, onClick, style}) {
  const componentStyle = {
    borderRadius: 0,
    ...style,
  }

  if (!isActive) componentStyle.backgroundColor = 'grey';

  return (
    <button value={id} onClick={onClick} style={componentStyle}>{title}</button>
  );
}