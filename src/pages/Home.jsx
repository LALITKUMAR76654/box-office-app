import { useState } from 'react';
import { searchForShows, searchForPeople } from '../api/tvmaze';
// import { Link } from 'react-router-dom';
const Home = () => {
  // return <div>Home page</div>;
  // const [inputValue, setInputValue] = useState('');
  const [searchStr, setSearchStr] = useState('');
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  // console.log(searchOption);
  // console.log(apiDataError);
  // console.log(inputValue);
  const onSearchInputChange = ev => {
    // console.log(ev.target.value);

    setSearchStr(ev.target.value);
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  const onSearch = async ev => {
    ev.preventDefault();

    try {
      setApiDataError(null);

      if (searchOption === 'shows') {
        const result = await searchForShows(searchStr);
        setApiData(result);
      } else {
        const result = await searchForPeople(searchStr);
        setApiData(result);
      }
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
      return apiData[0].show
        ? apiData.map(data => <div key={data.show.id}>{data.show.name}</div>)
        : apiData.map(data => (
            <div key={data.person.id}>{data.person.name}</div>
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

        <label>
          Shows
          <input
            type="radio"
            name="search-option"
            value="shows"
            checked={searchOption === 'shows'}
            onChange={onRadioChange}
          />
        </label>

        <label>
          Actors
          <input
            type="radio"
            name="search-option"
            value="actors"
            checked={searchOption === 'actors'}
            onChange={onRadioChange}
          />
        </label>

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
