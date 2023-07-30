
export default function Index({user}) {
  if (user.gender === 'female') {
    return (
      <h1 style={{color: "lightcoral"}}>{user.name}</h1>
    );
  }

  return (
    <h1 style={{color: "midnightblue"}}>{user.name}</h1>
  );
}