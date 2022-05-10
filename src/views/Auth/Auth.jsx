import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function Auth() {
  const { login, signUp } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      await login(email, password);
      console.log(location.search.origin)
      const url = location.search.origin ? location.search.pathname: '/';

      history.replace(url);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await signUp(email, password);

      const url = location.search.origin ? location.search.pathname: '/';

      history.replace(url);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email"/>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
        <button onClick={handleSignUp}>Sign Up</button>
        <button type="submit">Sign In</button>
        <p>{error}</p>
      </form>
    </>
  )
}
