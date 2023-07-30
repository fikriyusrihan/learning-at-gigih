import {useState} from "react";

export default function Index({sculptures}) {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const hasPrev = index > 0;
  const hasNext = index < sculptures.length - 1;

  const handleShowDetailClick = () => {
    setShowMore(!showMore);
  }

  const handlePrevClick = () => {
    if (hasPrev)
      setIndex(index - 1);
  }

  const handleNextClick = () => {
    if (hasNext)
      setIndex(index + 1);
  }

  let sculpture = sculptures[index];
  let descriptionDisplayMode = showMore ? 'block' : 'none';

  return (
    <>
      <div className="navigator">
        <button onClick={handlePrevClick}>Prev</button>
        <button onClick={handleNextClick}>Next</button>
      </div>
      <div className="content">
        <h2 style={{fontStyle: "italic"}}>{sculpture.name}</h2>
        <p>({index + 1} of {sculptures.length})</p>

        <div>
          <button onClick={handleShowDetailClick}>
            {showMore ? 'Show details' : 'Hide details'}
          </button>
        </div>

        <div style={{display: descriptionDisplayMode}}>
          <p>{sculpture.description}</p>
        </div>

        <img src={sculpture.url} alt={sculpture.alt}/>
      </div>
    </>
  );
}