import ProfileBadge from '../ProfileBadge';

export default function Index({style}) {
  const componentStyle = {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '16px',
    padding: '16px 32px',
    border: 'black solid 2px',
    borderRadius: '8px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 2px 2px 4px',
    backgroundColor: 'azure',
    ...style
  }

  return (
    <div style={{
      display: 'flex',
      width: '100%',
    }}>
      <nav style={componentStyle}>
        <div style={{fontWeight: 'bold'}}>GIGIH <br/>Listen ♪</div>
        <ProfileBadge/>
      </nav>
    </div>
  );
}