import { createClient } from "@supabase/supabase-js";
import { _user } from "./stores";


const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(
  "https://zafgvnijbjyxgpiljyhk.supabase.co",
  supabaseAnonKey
);

export default supabase;

const signIn = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error("Sign In failed");
    if (data) return data;
  } catch (error) {
    console.error(error);
  }
};

const signOut = async () => {
  try {
    let { error } = await supabase.auth.signOut();
    if (!error) return true;
    else throw new Error("logout failed");
  } catch (error) {
    alert(error);
  }
};

async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) return user;
  else return null;
}

export { supabase, signIn, signOut, getUser, _user };

/*  
supabase.auth.onAuthStateChange((event, session) => {
		if (event == 'SIGNED_IN') _user.set(session.user)
		else _user.set(null)
	})
*/
