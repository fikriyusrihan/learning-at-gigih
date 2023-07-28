import './Avatar.css';

export default function Avatar({user, size = 48}) {
  return (
    <div className="container">
      <h1>Hello, {user.name}</h1>
      <img
        className="img-avatar"
        src={user.profilePicture}
        alt="User's profile"
        width={size}
        height={size}
      />
    </div>
  )
}