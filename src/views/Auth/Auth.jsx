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
    <div>Auth</div>
  )
}
