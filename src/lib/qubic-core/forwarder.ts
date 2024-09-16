const baseGo = (
  url: string,
  type: string,
  pageState: string,
  cardId,
  profileUid,
) => {
  if (pageState != "Preview") {
    if (profileUid && cardId) {
      window.open(
        `/router?mode=basic&url=${url}&cardId=${cardId}&type=${type}&uid=${profileUid}`,
      ).focus();
      return;
    }
  } else {
    window.open(url).focus();
    return;
  }
};

const baseTeamForwarder = (
  url: string,
  teamMode: string,
  type: string,
  pageState: string,
  cardId,
  memberid,
  teamId,
  holder,
) => {
  if (pageState != "Preview") {
    if (memberid && cardId) {
      window.open(
        `/router?mode=team&url=${url}&cardId=${cardId}&type=${type}&uid=${memberid}&holder=${holder}&teamid=${teamId}&teamMode=${teamMode}`,
      ).focus();
      return;
    }
  } else {
    window.open(url).focus();
    return;
  }
};

export const go = async (
  type: string,
  data: string,
  pageState: string,
  cardId,
  profileUid,
) => {
  switch (type) {
    case 'threads':
      baseGo(`https://threads.net/${data}`, type, pageState, cardId, profileUid);
    case 'discord':
      baseGo(`https://discord.gg/${data}`, type, pageState, cardId, profileUid);
      break;
    case 'telegram':
      baseGo(`https://t.me/${data}`, type, pageState, cardId, profileUid);
      break;
    case "github":
      baseGo(`https://github.com/${data}`, type, pageState, cardId, profileUid);
      break;
    case "line":
      baseGo(
        `https://line.me/R/ti/p/~${data}`,
        type,
        pageState,
        cardId,
        profileUid,
      );
      break;
    case "whatsapp":
      baseGo(
        "https://wa.me/" + data.replace("+", ""),
        type,
        pageState,
        cardId,
        profileUid,
      );
      break;
    case "instagram":
      baseGo(
        "https://instagram.com/" + data,
        type,
        pageState,
        cardId,
        profileUid,
      );
      break;
    case "facebook":
      baseGo(
        "https://facebook.com/" + data,
        type,
        pageState,
        cardId,
        profileUid,
      );
      break;
    case "maps":
      baseGo(
        "https://maps.app.goo.gl/" + data,
        type,
        pageState,
        cardId,
        profileUid,
      );
      break;
    case "twitter":
      baseGo(
        "https://twitter.com/" + data,
        type,
        pageState,
        cardId,
        profileUid,
      );
      break;
    case "tiktok":
      baseGo("https://tiktok.com/" + data, type, pageState, cardId, profileUid);
      break;
    case "linkedin":
      baseGo(
        "https://linkedin.com/" + data,
        type,
        pageState,
        cardId,
        profileUid,
      );
      break;
    case "youtube":
      baseGo(
        "https://youtube.com/" + data,
        type,
        pageState,
        cardId,
        profileUid,
      );
      break;
    case "email":
      baseGo("mailto:" + data, type, pageState, cardId, profileUid);
      break;
    case "phone":
      baseGo(`tel:${data.startsWith('+') ? data.replace('+', "%2B") : "%2B".concat(data)}`, type, pageState, cardId, profileUid);
      break;
    default:
      break;
  }
};

export const teamForwarder = async (
  teamMode,
  type,
  data: string,
  pageState,
  cardId,
  memberid,
  teamId,
  holder,
) => {
  switch (type) {
    case 'maps':
      baseTeamForwarder(`https://maps.app.goo.gl/${data}`, teamMode, type, pageState, cardId, memberid, teamId, holder);
    case 'threads':
      baseTeamForwarder(`https://threads.net/${data}`, teamMode, type, pageState, cardId, memberid, teamId, holder);
      break;
    case 'discord':
      baseTeamForwarder(`https://discord.gg/${data}`, teamMode, type, pageState, cardId, memberid, teamId, holder);
      break;
    case 'telegram':
      baseTeamForwarder(`https://t.me/${data}`, teamMode, type, pageState, cardId, memberid, teamId, holder)
      break;
    case "github":
      baseTeamForwarder(`https://github.com/${data}`, teamMode, type, pageState, cardId, memberid, teamId, holder)
      break;
    case "line":
      baseTeamForwarder(`https://line.me/R/ti/p/~${data}`, teamMode, type, pageState, cardId, memberid, teamId, holder)
      break;
    case "whatsapp":
      baseTeamForwarder("https://wa.me/" + data.replace("+", ""), teamMode, type, pageState, cardId, memberid, teamId, holder)
      break;
    case "instagram":
      baseTeamForwarder("https://instagram.com/" + data, teamMode, type, pageState, cardId, memberid, teamId, holder)
      break;
    case "facebook":
      baseTeamForwarder("https://facebook.com/" + data, teamMode, type, pageState, cardId, memberid, teamId, holder)
      break;
    case "twitter":
      baseTeamForwarder("https://twitter.com/" + data, teamMode, type, pageState, cardId, memberid, teamId, holder)
      break;
    case "tiktok":
      baseTeamForwarder("https://tiktok.com/" + data, teamMode, type, pageState, cardId, memberid, teamId, holder)
      break;
    case "linkedin":
      baseTeamForwarder("https://linkedin.com/" + data, teamMode, type, pageState, cardId, memberid, teamId, holder)
      break;
    case "youtube":
      baseTeamForwarder("https://youtube.com/" + data, teamMode, type, pageState, cardId, memberid, teamId, holder)
      break;
    case "email":
      baseTeamForwarder("mailto:" + data, teamMode, type, pageState, cardId, memberid, teamId, holder)
      break;
    case "phone":
      baseTeamForwarder(`tel:${data.startsWith('+') ? data.replace('+', "%2B") : "%2B".concat(data)}`, teamMode, type, pageState, cardId, memberid, teamId, holder)
      break;
    default:
      break;
  }
};
