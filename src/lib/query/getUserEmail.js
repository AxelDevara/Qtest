import supabase from '@lib/db';

const getUserEmail = async (uid) => {
  const { data, error } = await supabase.functions.invoke('getUserEmail', {
    body: JSON.stringify({
      uid: uid,
    }),
  });

  if (error) console.log(error);
  if (data) {
    return { email: data };
  }
};

export default getUserEmail;
