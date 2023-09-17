// import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getShowById } from '../api/tvmaze';
import { useQuery } from '@tanstack/react-query';
import ShowMainData from '../components/shows/ShowMainData';
import Details from '../components/shows/Details';
import Seasons from '../components/shows/Seasons';
import Cast from '../components/shows/Cast';

// const useShowById = showId => {
//   const [showData, setShowData] = useState(null);
//   const [showError, setShowError] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await getShowById(showId);
//         setShowData(data);
//       } catch (error) {
//         setShowError(error);
//       }
//       //   console.log(data);
//     }
//     fetchData();
//   }, [showId]);

//   return { showData, showError };
// };

const Show = () => {
  const { showId } = useParams();
  //   console.log(params);
  // const { showData, showError } = useShowById(showId);

  const { data: showData, error: showError } = useQuery({
    queryKey: ['show', showId],
    queryFn: () => getShowById(showId),
    refetchOnWindowFocus: false,
  });

  // const navigateTo = useNavigate();

  // const onGoBack = () => {
  //   navigateTo('/');
  // };

  if (showError) {
    return <div>We have an error: {showError.message} </div>;
  }

  if (showData) {
    return (
      <div>
        {/* <button type="button" onClick={onGoBack}>
          Go back to home
        </button> */}

        <Link to="/"> Go back to home</Link>

        <ShowMainData
          image={showData.image}
          name={showData.name}
          rating={showData.rating}
          summary={showData.summary}
          genres={showData.genres}
        />

        <div>
          <h2>Details</h2>
          <Details
            status={showData.status}
            premiered={showData.premiered}
            network={showData.network}
          />
        </div>
        {/* Got show data: {showData.name} */}
        <div>
          <h2>Seasons</h2>

          <Seasons seasons={showData._embedded.seasons} />
        </div>

        <div>
          <h2>Cast</h2>

          <Cast cast={showData._embedded.cast} />
        </div>
      </div>
    );
  }

  //   return <div>Show page for show {showId}</div>;
  return <div>Data is loading</div>;
};

export default Show;
