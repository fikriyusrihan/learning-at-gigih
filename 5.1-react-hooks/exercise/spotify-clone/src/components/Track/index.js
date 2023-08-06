import Button from "../Button";
import Card from "../Card";
import {durationToString} from "../../utils/track";

export default function Index({track, children}) {
  return (
    <Card style={{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '16px',
      margin: '8px 0',
    }}>
      <img
        style={{
          width: '80px',
          borderRadius: '8px',
          border: 'black solid 2px',
        }}
        src={track.album.images[0].url}
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
        <h3 style={{margin: 0}}>{track.name}</h3>

        <p style={{
          margin: 0,
          marginBottom: '8px',
          fontSize: '12px',
        }}>Album: {track.album.name}</p>

        <p style={{margin: 0}}>by {track.artists.map((artist, index) => (
          <span key={index}>{artist.name}{!(index === track.artists.length - 1) && ', '}</span>
        ))}</p>
      </div>

      <div className="track-action">
        <a href={track.external_urls.spotify} target="_blank" rel="noreferrer">
          <Button style={{
            backgroundColor: 'transparent',
            color: 'green',
            border: 'green solid 2px',
            padding: '8px 16px',
            marginRight: '8px'
          }} text={"▶ " + durationToString(track.duration_ms)}/>
        </a>

        {children}
      </div>
    </Card>
  );
}