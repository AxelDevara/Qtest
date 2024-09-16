import UAParser from "ua-parser-js";
import { genId } from "@lib/utils/identity";
import supabase from "@lib/db";
let parser = new UAParser();

export const log = async (
  message: string,
  type: string,
  link?: string,
  cardId?: string,
  uid?: string,
) => {
  const device = parser.getDevice().model;
  if (uid) {
    const msgToWrite = cardId != null
      ? { message: message, link: link ?? "", card: cardId }
      : { message: message };

    const { error } = await supabase.from("logs").insert([
      {
        data: msgToWrite,
        type: type,
        uid: uid,
        platform: device ?? "Undetected Device",
        uniqueId: genId() ?? 0,
      },
    ]);

    if (error) console.log(error);
  }

  return 200;
};

export const logTap = async (type: string, cardId: string, uid: string) => {
  if (type != "Preview") {
    const device = parser.getDevice().model;
    const { error } = await supabase.from("logs").insert([
      {
        data: {
          message: "Your profile was opened through " + type,
          card: cardId,
          // ...pos ? { position: { long: pos.coords.longitude, lat: pos.coords.latitude } } : {}
        },
        type: "INFO",
        platform: device ?? "Undetected Device",
        uid: uid,
        uniqueId: genId() ?? 0,
      },
    ]);

    switch (type) {
      case "NFC":
        await supabase.rpc("increment_nfc_tap_count", { card: cardId });
        break;
      case "QRScan":
        await supabase.rpc("increment_qr_scan_count", { card: cardId });
        break;
      case "QRShare":
        await supabase.rpc("increment_qr_share_count", { card: cardId });
    }

    if (error) console.log(error);

    return 200;
  }
};

export const logTeam = async (
  message: string,
  type: string,
  cardId: string,
  teamId: string,
  holder: string,
  link?: string,
  memberid?: number,
) => {
  const device = parser.getDevice().model;
  if (memberid) {
    const msgToWrite = cardId != null
      ? { message: message, link: link ?? "", card: cardId }
      : { message: message };

    const { error } = await supabase.from("team_logs").insert([
      {
        data: msgToWrite,
        type: type,
        team_member: memberid,
        platform: device ?? "Undetected Device",
        uniqueId: genId() ?? 0,
        team: teamId,
        card_holder: holder,
      },
    ]);

    if (error) console.log(error);
  }

  return 200;
};

const baseLogTapTeam = async (
  type: string,
  cardId: string,
  memberid: number,
  teamId: string,
  holder: string,
  pos?: GeolocationPosition,
) => {
  if (type != "Preview") {
    const device = parser.getDevice().model;
    const { error } = await supabase.from("team_logs").insert([
      {
        data: {
          message: "Your profile was opened through " + type,
          card: cardId,
          ...pos
            ? {
              position: {
                long: pos.coords.longitude,
                lat: pos.coords.latitude,
              },
            }
            : {},
        },
        type: "INFO",
        platform: device ?? "Undetected Device",
        team_member: memberid,
        team: teamId,
        card_holder: holder,
        uniqueId: genId() ?? 0,
      },
    ]);

    switch (type) {
      case "NFC":
        await supabase.rpc("increment_team_nfc_tap_count", { card: cardId });
        break;
      case "QRScan":
        await supabase.rpc("increment_team_qr_scan_count", { card: cardId });
        break;
    }

    if (error) console.log(error);
  }
};

export const logTapTeam = async (
  type: string,
  cardId: string,
  memberid: number,
  teamId: string,
  holder: string,
  position?
) => {

  await baseLogTapTeam(type, cardId, memberid, teamId, holder, position ?? null);

  return 200;
};

export const logActivationTeam = async (
  msg: string,
  cardId: string,
  memberid: number,
  teamId: string,
  holder: string,
) => {


  const device = parser.getDevice().model;
  const { error } = await supabase.from("team_logs").insert([
    {
      data: {
        message: msg,
        card: cardId,
      },
      type: "SUCCESS",
      platform: device ?? "Undetected Device",
      team_member: memberid,
      team: teamId,
      card_holder: holder,
      uniqueId: genId() ?? 0,
    },
  ]);


  if (error) console.log(error);


  return 200;
};
