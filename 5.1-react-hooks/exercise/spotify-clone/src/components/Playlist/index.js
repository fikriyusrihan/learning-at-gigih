import Card from '../Card';

export default function Index({playlist, onClick}) {
  return (
    <Card onClick={onClick} style={{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '16px',
      margin: '8px 0',
      cursor: 'pointer'
    }}>
      <img
        style={{
          width: '80px',
          borderRadius: '8px',
          border: 'black solid 2px',
        }}
        src={playlist.images.length > 0 && playlist.images[0].url}
        alt="track"
      />

      <div style={{
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        marginLeft: '16px',
      }}>
        <h3 style={{margin: 0}}>{playlist.name}</h3>

        <p style={{
          margin: 0,
          marginBottom: '8px',
          fontSize: '12px',
        }}>{playlist.public ? 'Public' : 'Private'} Playlist</p>

        <p style={{
          margin: 0,
          fontSize: '14px',
        }}>{playlist.description}</p>
      </div>
    </Card>
  );
}