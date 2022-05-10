import { client, parseData } from './client';

export async function getEntries() {
    const request = await client
        .from('guestbook')
        .select()
        .order('created_at', { ascending: false });
    return parseData(request);
}

export async function createEntry({ userId, content }) {
    const request = await client
        .from('guestbook')
        .insert({ guest_id: userId, content });
    return parseData(request);
}

export async function updateEntryById(id, content) {
    const request = await client
        .from('guestbook')
        .update({ content })
        .match({ id });
    return parseData(request);
}

export async function deleteEntryById(id) {
    const request = await client
        .from('guestbook')
        .delete()
        .match({ id });
    return parseData(request);
}
