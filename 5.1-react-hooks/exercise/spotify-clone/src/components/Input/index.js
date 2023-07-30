export default function Index({style, placeholder, type, value}) {
  const componentStyle = {
    padding: '8px 16px',
    border: 'black solid 2px',
    borderRadius: '32px',
    fontFamily: "Roboto Mono, monospace",
    ...style
  }

  const handleOnChange = (event) => {
    const inputValue = event.target.value;
    value(inputValue);
  }

  return (
    <input type={type} style={componentStyle} placeholder={placeholder} onChange={handleOnChange}/>
  );
}