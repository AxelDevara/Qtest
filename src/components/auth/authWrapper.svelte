<script>
  import { user } from "@lib/stores/userStore";
  import supabase from "@lib/db.js";
  import { goto } from "$app/navigation";
  import Cookies from "js-cookie";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      //do nothing
    }
    $user = data.user;
  };

  onMount(async () => {
    await getUser();
  });

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event == "SIGNED_IN") {
      user.set(session.user);
      if (Cookies.get("activate")) {
        await goto("/user", { noScroll: true });
        Cookies.remove("activate");
      }
    }
    if (event == "TOKEN_REFRESHED") {
      user.set(session.user);
    }
    if (event == "PASSWORD_RECOVERY") {
      user.set(null);
      await goto("/resetPassword" + "?reset=" + session.access_token, {
        noScroll: true,
      });
    }
    if (event == "SIGNED_OUT") {
      user.set(null);

      if (!$page.route.id.startsWith("/(preview)/qbc/")) {
        await goto("/", { noScroll: true });
        return;
      }
    }
  });
</script>

<div class="w-full">
  <slot />
</div>
