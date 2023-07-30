export default function index({time, color}) {
  return (
    <div>
      <h1 style={{color: color}} >{time}</h1>
    </div>
  );
}