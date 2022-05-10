import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { createEntry, getEntries } from '../services/entries';

export default function EntryForm({ refreshEntries }) {
    const [content, setContent] = useState('');
    const { user } = useUser();

  async function addEntry(e) {
    e.preventDefault();
    const entry = await createEntry({ userId: user.id, content });
  
    setContent('');
    await refreshEntries();
  }

  return (
    <>
        <form onSubmit={addEntry}>
            <textarea value={content} name='content' placeholder='add an entry' onChange={(e) => setContent(e.target.value)}></textarea>
            <button type='submit'>Add Entry</button>
        </form>
    </>
  )
}