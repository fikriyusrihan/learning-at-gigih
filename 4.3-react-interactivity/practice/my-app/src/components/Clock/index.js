import {useState} from "react";

export default function Index() {
  const [date, setDate] = useState(new Date().toLocaleTimeString());
  const [color, setColor] = useState('lightcoral');

  const handleColorChange = () => {
    const selectedColor = document.getElementById('color').value;
    setColor(selectedColor);
  }

  setInterval(() => {
    const currentTime = new Date().toLocaleTimeString()
    setDate(currentTime);
  }, 1000);

  return (
    <>
      <label htmlFor="color">Pick a color: </label>
      <select name="color" id="color" onChange={handleColorChange}>
        <option value="lightcoral">lightcoral</option>
        <option value="midnightblue">midnightblue</option>
      </select>
      
      <h2 style={{color}}>{date} {(color === 'lightcoral') && '💖'}</h2>
    </>
  );
}