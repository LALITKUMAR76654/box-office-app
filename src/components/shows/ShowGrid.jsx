import ShowCard from './ShowCard';
import { useStarredShows } from '../../lib/useStarredShows';

const ShowGrid = ({ shows }) => {
  // console.log(shows);

  const [starredShows, dispatchStarred] = useStarredShows();

  console.log({ starredShows });
  // usePersistedReducer(reducer, [], '');

  const onStarMeClick = showId => {
    const isStarred = starredShows.includes(showId);

    if (isStarred) {
      dispatchStarred({ type: 'UNSTAR', showId });
    } else {
      dispatchStarred({ type: 'STAR', showId });
    }
  };

  return (
    <div>
      {shows.map(data => (
        // <div key={data.show.id}>{data.show.name}</div>;
        <ShowCard
          key={data.show.id}
          id={data.show.id}
          name={data.show.name}
          image={
            data.show.image ? data.show.image.medium : '/not-found-image.png'
          }
          summary={data.show.summary}
          onStarMeClick={onStarMeClick}
          isStarred={starredShows.includes(data.show.id)}
        />
      ))}
    </div>
  );
};

export default ShowGrid;
