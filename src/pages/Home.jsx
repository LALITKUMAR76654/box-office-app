import { Link } from 'react-router-dom';
const Home = () => {
  // return <div>Home page</div>;
  return (
    <div>
      <Link to="/starred">Go to starred page</Link>
    </div>
  );
};

export default Home;