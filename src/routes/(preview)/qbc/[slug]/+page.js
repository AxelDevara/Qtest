import { redirect } from '@sveltejs/kit';
import supabase from '@lib/db';

export async function load(ctx) {
  let error = false;
  let path = {
    basic: `/qbc/${ctx.params.slug}/basic${ctx.url.search}`,
    pro: `/qbc/${ctx.params.slug}/pro${ctx.url.search}`,
    team: `/qbc/${ctx.params.slug}/team${ctx.url.search}`,
    baseActivate: `/qbc/${ctx.params.slug}/activate/`,
    teamSignUp: '/',
  };

  const pageGuard = () => {
    switch (ctx.url.searchParams.get('type')) {
      case 'QRScan':
        return true;
      case 'QRShare':
        return true;
      case 'NFC':
        return true;
      case 'Preview':
        return true;
      default:
        return false;
    }
  };

  const checkIsTeamCard = async () => {
    const { data, error } = await supabase
      .from('business_cards')
      .select('mode,team_id')
      .eq('id', ctx.params.slug);
    if (error) console.log(error);
    if (data) {
      if (data[0]?.mode === 'team') {
        return { isTeamMode: true, teamId: data[0].team_id };
      } else {
        return { isTeamMode: false, teamId: null };
      }
    }
  };

  const checkIsActivatedBasic = async () => {
    let { data, error: noConnection } = await supabase
      .from('card_connection')
      .select('id,uid')
      .eq('card_id', ctx.params.slug);
    // .eq('status', true);

    if (noConnection) return null;

    if (data.length > 0) return data[0];
  };

  const checkIsActivatedTeam = async () => {
    let { data, error: checkError } = await supabase
      .from('team_cardcon')
      .select('card_id,status, team_member_id(uid)')
      .eq('card_id', ctx.params.slug);
    // .eq('status', true);

    if (checkError) console.log(checkError);
    if (data?.length > 0) {
      if (data[0].status == true && data[0].team_member_id.uid !== null) {
        return true;
      } else if (data[0].team_member_id.uid === null) {
        return false;
      } else {
        error = true;
      }
    } else {
      return false;
    }
  };
  // http://localhost:3000/qbc/613572e9-f471-4f0d-90d2-d8511d1ac462?type=QRScan
  // http://localhost:3000/profile
  if (pageGuard()) {
    const { isTeamMode, teamId } = await checkIsTeamCard();
    const expiry = new Date();

    if (isTeamMode) {
      if (await checkIsActivatedTeam()) {
        expiry.setMinutes(expiry.getMinutes() + 5);
        const thash = `&thash=${Math.floor(expiry.getTime() / 1000)}`;

        throw redirect(307, path.team + thash);
      } else if (error) {
        return {
          error,
        };
      } else {
        throw redirect(307, path.baseActivate + teamId);
      }
    } else {
      const basicRes = await checkIsActivatedBasic();
      if (basicRes) {
        expiry.setMinutes(expiry.getMinutes() + 5);
        const thash = `&thash=${Math.floor(expiry.getTime() / 1000)}`;
        
          throw redirect(307, path.basic + thash);
        
        
      } else {
        throw redirect(307, path.baseActivate + 'basic');
      }
    }
  } else {
    error = true;
  }

  return {
    error,
  };
}
