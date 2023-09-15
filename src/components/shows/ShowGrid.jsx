import ShowCard from './ShowCard';

const ShowGrid = ({ shows }) => {
  // console.log(shows);
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
        />
      ))}
    </div>
  );
};

export default ShowGrid;
