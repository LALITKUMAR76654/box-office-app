import { useState } from 'react';
// import { Link } from 'react-router-dom';
const Home = () => {
  // return <div>Home page</div>;
  // const [inputValue, setInputValue] = useState('');
  const [searchStr, setSearchStr] = useState('');

  // console.log(inputValue);
  const onSearchInputChange = ev => {
    // console.log(ev.target.value);

    setSearchStr(ev.target.value);
  };

  const onSearch = async ev => {
    ev.preventDefault();

    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${searchStr}`
      // 'https://api.tvmaze.com/search/shows?q=boys'
    );
    const body = await response.json();

    console.log(body);
    //     .then(response => response.json())
    //     .then(body => console.log(body));
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
    </div>
  );
};

export default Home;
