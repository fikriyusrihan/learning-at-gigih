export default function Index({children, style}) {
  return (
    <div className="window" style={style}>
      {children}
    </div>
  )
}