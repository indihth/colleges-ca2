import LoginForm from "../components/LoginForm";
import { useAuth } from '../contexts/AuthContext'


const Home = () => {

  const { authenticated } = useAuth();

  return (
    <>
      <h2>Home</h2>

      {/* Conditional rendering of login form */}
      {!authenticated ? (
        <LoginForm />
      ) : (
        <p>You are authenticated</p>
      )}
    </>
  );
};

export default Home;
