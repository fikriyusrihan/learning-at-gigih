export default function Index({children, style, onClick}) {
  const componentStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '32px',
    backgroundColor: 'azure',
    border: 'black solid 2px',
    borderRadius: '8px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 2px 2px 4px',
    ...style,
  }

  return (
    <div onClick={onClick} className="card" style={componentStyle}>
      {children}
    </div>
  )
}