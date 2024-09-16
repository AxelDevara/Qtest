import supabase from '@lib/db';

export const encryptActivationCode = async (value) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);

  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
};

export const checkIsRegistered = async (uid) => {
  const { data, error } = await supabase.functions.invoke('getUserEmail', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uid: uid,
    }),
  });

  if (error) console.log(error);
  if (data) {
    if (data.user) {
      return false;
    } else {
      return true;
    }
  }
};

export const logMsg = (email) => {
  return `User ${email ?? ''} has joined the team`;
};

export const logCardActivationMsg = (card, email) => {
  return `******${card?.slice(-6)} has been activated by ${email ?? ''}`;
};
