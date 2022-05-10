import { useEffect, useState } from 'react';
import EntryForm from '../../components/EntryForm';
import { useUser } from '../../context/UserContext';
import { getEntries } from '../../services/entries';

export default function Dashboard() {
  const { user } = useUser();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(entries);

  useEffect(() => {
    getEntries()
      .then(setEntries)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function refreshEntries() {
    setLoading(true);
    getEntries()
    .then(setEntries)
    .catch(console.error)
    .finally(() => setLoading(false));
  }

  return (
    <>
      <h2>Dashboard</h2>
      <EntryForm refreshEntries={refreshEntries}/>
      {loading
        ? <p>Loading entries</p>
        : <ul>{entries.map((entry) => (
          <li key={entry.id}>{entry.content} <br />
            author: {user.email} </li>
        ))}</ul>
      }
    </>
  )
}
