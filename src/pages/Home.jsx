import { useState } from 'react';
import { searchForShows } from '../api/tvmaze';
// import { Link } from 'react-router-dom';
const Home = () => {
  // return <div>Home page</div>;
  // const [inputValue, setInputValue] = useState('');
  const [searchStr, setSearchStr] = useState('');
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);
  // console.log(apiDataError);

  // console.log(inputValue);
  const onSearchInputChange = ev => {
    // console.log(ev.target.value);

    setSearchStr(ev.target.value);
  };

  const onSearch = async ev => {
    ev.preventDefault();

    try {
      setApiDataError(null);

      const result = await searchForShows(searchStr);
      setApiData(result);
    } catch (error) {
      setApiDataError(error);
    }

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

    if (apiData) {
      return apiData.map(data => (
        <div key={data.show.id}>{data.show.name}</div>
      ));
    }

    return null;
  };

  return (
    <div>
      {/* <Link to="/starred">Go to starred page</Link> */}
      {/* Home */}

      {/* <div>{inputValue}</div> */}

      <form onSubmit={onSearch}>
        <input type="text" value={searchStr} onChange={onSearchInputChange} />
        <button
          type="submit"
          // type="button"
          // onClick={() => {
          //   setInputValue('Andrew');
          // }}
        >
          Search
        </button>
      </form>

      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;
