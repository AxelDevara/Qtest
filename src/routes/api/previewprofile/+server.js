// throw new Error("@migration task: Update +server.js (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");

import Cache from 'timed-cache';
import { v4 as uuidv4 } from 'uuid';

export const POST = async (ctx) => {
  const body = await ctx.request.json();

  const id = uuidv4();
  cache.put(id, body);

  return new Response(JSON.stringify({ id: id }));
};

export const GET = async (ctx) => {
  const id = ctx.url.searchParams.get('id');
  const res = cache.get(id);
  if (res) {
    return new Response(JSON.stringify(res));
  } else {
    return new Response(JSON.stringify({ error: 'not found' }));
  }
};

const cache = new Cache();
