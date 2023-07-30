import './style.css';
import Avatar from "../Avatar";

export default function Index() {
  return (
    <div>
      <Avatar user={{name: 'Generasi Gigih 1.0', profilePicture: 'https://fastly.picsum.photos/id/103/2592/1936.jpg?hmac=aC1FT3vX9bCVMIT-KXjHLhP6vImAcsyGCH49vVkAjPQ'}}  />
      <Avatar user={{name: 'Generasi Gigih 2.0', profilePicture: 'https://fastly.picsum.photos/id/103/2592/1936.jpg?hmac=aC1FT3vX9bCVMIT-KXjHLhP6vImAcsyGCH49vVkAjPQ'}} size={52}/>
      <Avatar user={{name: 'Generasi Gigih 3.0', profilePicture: 'https://fastly.picsum.photos/id/103/2592/1936.jpg?hmac=aC1FT3vX9bCVMIT-KXjHLhP6vImAcsyGCH49vVkAjPQ'}} size={64} />
    </div>
  )
}