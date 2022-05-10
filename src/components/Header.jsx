import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { signOutUser } from '../services/user';

export default function Header() {
  const { user, logout } = useUser();

  async function handleSignOut() {
    setUser('');

    await signOutUser();
  }

  return (
    <>
      <h1>Guestbook</h1>
      {user.email
        ? <>
            <h4>logged in as {user.email}</h4>
            <button onClick={logout}>Sign Out</button>
          </>
        : <h4>Sign Up/In</h4>
      }
    </>
  )
}
