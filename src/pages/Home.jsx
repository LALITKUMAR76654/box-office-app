import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchForShows, searchForPeople } from '../api/tvmaze';

import SearchForm from '../components/SearchForm';
import ShowGrid from '../components/shows/ShowGrid';
import ActorsGrid from '../components/actors/ActorsGrid';
// import { Link } from 'react-router-dom';

// const reducerFn = (currentCounter, action) => {
//   // console.log({ currentCounter, action });

//   switch (action.type) {
//     case 'INCREMENT':
//       return currentCounter + 1;

//     case 'DECREMENT':
//       return currentCounter - 1;

//     case 'RESET':
//       return 0;
//   }
//   return 0;
// };

const Home = () => {
  // return <div>Home page</div>;
  // const [inputValue, setInputValue] = useState('');

  const [filter, setFilter] = useState('');
  // const [counter, dispatch] = useReducer(reducerFn, 0);

  // const onIncrement = () => {
  //   dispatch({ type: 'INCREMENT' });
  // };
  // const onDecrement = () => {
  //   dispatch({ type: 'DECREMENT' });
  // };
  // const onReset = () => {
  //   dispatch({ type: 'RESET' });
  // };

  const { data: apiData, error: apiDataError } = useQuery({
    queryKey: ['search', filter],
    queryFn: () =>
      filter.searchOption === 'shows'
        ? searchForShows(filter.q)
        : searchForPeople(filter.q),
    // ⬇️ disabled as long as the filter is empty
    enabled: !!filter,
    refetchOnWindowFocus: false,
  });

  // const [apiData, setApiData] = useState(null);
  // const [apiDataError, setApiDataError] = useState(null);

  // console.log(searchOption);
  // console.log(apiDataError);
  // console.log(inputValue);

  const onSearch = async ({ q, searchOption }) => {
    setFilter({ q, searchOption });

    // ev.preventDefault();
    // try {
    //   setApiDataError(null);
    //   // if (searchOption === 'shows') {
    //   //   const result = await searchForShows(q);
    //   //   setApiData(result);
    //   // } else {
    //   //   const result = await searchForPeople(q);
    //   //   setApiData(result);
    //   // }
    //   let result;
    //   if (searchOption === 'shows') {
    //     result = await searchForShows(q);
    //   } else {
    //     result = await searchForPeople(q);
    //   }
    //   setApiData(result);
    // } catch (error) {
    //   setApiDataError(error);
    // }
    // console.log(apiData);
    // const body = await apiGet(`/search/shows?q=${searchStr}`);
    // const response = await fetch(
    //   `https://api.tvmaze.com/search/shows?q=${searchStr}`
    //   // 'https://api.tvmaze.com/search/shows?q=boys'
    // );
    // const body = await response.json();
    // console.log(body);
    //     .then(response => response.json())
    //     .then(body => console.log(body));
  };

  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error occured:{apiDataError.message}</div>;
    }

    // if (apiData) {
    //   return apiData[0].show
    //     ? apiData.map(data => <div key={data.show.id}>{data.show.name}</div>)
    //     : apiData.map(data => (
    //         <div key={data.person.id}>{data.person.name}</div>
    //       ));
    // }

    if (apiData?.length === 0) {
      return <div>No results</div>;
    }

    if (apiData) {
      return apiData[0].show ? (
        <ShowGrid shows={apiData} />
      ) : (
        <ActorsGrid actors={apiData} />
      );
    }

    return null;
  };

  return (
    <div>
      {/* <Link to="/starred">Go to starred page</Link> */}
      {/* Home */}

      {/* <div>{inputValue}</div> */}

      <SearchForm onSearch={onSearch} />

      {/* <div>Counter: {counter}</div>
      <button type="button" onClick={onIncrement}>
        Increment
      </button>
      <button type="button" onClick={onDecrement}>
        Decrement
      </button>
      <button type="button" onClick={onReset}>
        Reset
      </button> */}
      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;
