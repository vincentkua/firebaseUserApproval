import useAuthNavigator from "../utils/useAuthNavigator";

const Home = () => {
  useAuthNavigator("/", "/login");

  return (
    <>
      <h4>Home Page</h4>
      <p>Note: Will navigate to login page if user is not login!</p>
    </>
  );
};

export default Home;
