import './App.css';
import Clock from './components/Clock';
import Component from 'react'

const date = new Date().toISOString();

function App() {
  function handleChange(event) {
    const selectedColor = event.target.value;

    console.log(event.target.value);
  }

  return (
    <div>
      <label htmlFor="selector">
        Pick a color:
      </label>
      <select onChange={handleChange} id="selector">
        <option value="lightcoral">lightcoral</option>
        <option value="midnightblue">midnightblue</option>
      </select>

      <Clock time={date} color="red" />
    </div>
  );
}

export default App;
