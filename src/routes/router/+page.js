import { error, redirect } from '@sveltejs/kit';
import { log, logTeam } from '@lib/qubic-core/logger';

// throw new Error("@migration task: Check if you need to migrate the load function input (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
export async function load(ctx) {
  const mode = ctx.url.searchParams.get('mode');

  //shared
  const uid = ctx.url.searchParams.get('uid');
  const url = ctx.url.searchParams.get('url');
  const type = ctx.url.searchParams.get('type');
  const cardId = ctx.url.searchParams.get('cardId');

  //team only
  const holder = ctx.url.searchParams.get('holder');
  const teamid = ctx.url.searchParams.get('teamid');
  const teamMode = ctx.url.searchParams.get('teamMode');

  // console.log('msg', msg);

  // console.log(mode, uid, url, type, cardId, holder, teamid)

  if (mode == 'basic') {
    if (url && uid && type && cardId) {
      await log(`Your ${type} was opened`, 'INFO', url, cardId, uid);
      throw redirect(307, url);
    }
  } else if (mode == 'team') {
    if (url && holder && teamid) {
      await logTeam(
        teamMode === 'team'
          ? `Your company ${type} was opened`
          : `Your ${type} was opened`,
        'INFO',
        cardId,
        teamid,
        holder,
        url,
        uid
      );
      throw redirect(307, url);
    }
  } else if (mode == 'link') {
    await log(`Your link ${url} was opened`, 'INFO', url, cardId, uid);
    throw redirect(307, url);
  } else if (mode == 'teamlink') {
    await logTeam(
      `Your link ${url} was opened`,
      'INFO',
      cardId,
      teamid,
      holder,
      url,
      uid
    );
    throw redirect(307, url);
  }
  throw error(404, 'Not found');
}
