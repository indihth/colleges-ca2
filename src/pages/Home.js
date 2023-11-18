import LoginForm from "../components/LoginForm";

const Home = ({ authenticated, onAuthenticated }) => {
  return (
    <>
      <h2>Home</h2>

      {/* Conditional rendering of login form */}
      {!authenticated ? (
        <LoginForm
          authenticated={authenticated}
          onAuthenticated={onAuthenticated}
        />
      ) : (
        <p>You are authenticated</p>
      )}
    </>
  );
};

export default Home;
