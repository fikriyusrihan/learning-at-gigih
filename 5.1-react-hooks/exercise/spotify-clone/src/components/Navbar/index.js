import ProfileBadge from '../ProfileBadge';
import Button from '../Button';

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

  const handleLogoutClick = () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Are you sure to logout?')) {
      return;
    }

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('authenticated');

    window.location.reload();
  }

  return (
    <div style={{
      display: 'flex',
      width: '100%',
    }}>
      <nav style={componentStyle}>
        <div style={{fontWeight: 'bold'}}>GIGIH <br/>Listen ♪</div>
        <div style={{
          display: 'flex',
          flexDirection: 'row'
        }}>
          <ProfileBadge style={{marginRight: '8px'}}/>
          <Button onClick={handleLogoutClick} text='Logout' style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
          }}/>
        </div>
      </nav>
    </div>
  );
}