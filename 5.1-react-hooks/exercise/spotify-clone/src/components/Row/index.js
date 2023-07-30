export default function Index({children, style}) {
  const componentStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...style,
  }

  return (
    <div style={componentStyle}>
      {children}
    </div>
  );
}