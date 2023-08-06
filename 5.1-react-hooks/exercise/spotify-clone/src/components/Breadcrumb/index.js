import {useNavigate} from "react-router-dom";

export default function Index({paths = [], style}) {
  const navigate = useNavigate();
  const componentStyle = {
    fontSize: '14px',
    cursor: 'pointer'
  }

  return (
    <p style={style}>
      {paths.map((path, index) => (
        <span
          key={path.url}
          onClick={() => navigate(path.url)}
          style={{
            ...componentStyle,
            cursor: (path.isActive ? 'pointer' : 'default'),
            color: (!path.isActive && 'grey'),
          }}>
          {path.title} {!(paths.length - 1 === index) && '/ '}
        </span>
      ))}
    </p>
  );
}