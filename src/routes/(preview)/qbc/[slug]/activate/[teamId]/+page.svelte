<script>
  import AuthWrapper from "@comp/auth/authWrapper.svelte";
  import supabase from "@lib/db";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { toastFailed, toastSuccess } from "@lib/utils/toast";
  import { logActivationTeam } from "@lib/qubic-core/logger";
  import {
    encryptActivationCode,
    logCardActivationMsg,
  } from "@lib/query/activate";

  let teamName = "";
  let teamLogo = "";
  let cardId = $page.url.pathname.split("/")[2];
  let teamId = $page.url.pathname.split("/")[4];
  let isError = false;
  let subsEnd = new Date();
  let isNotActiveTeam = false;
  let members;
  let email;
  let loading;
  let teamcode;
  let password;

  const redirectToEditor = () => goto("https://editor.qubic.id");

  const getTeamData = async () => {
    const { data, error } = await supabase
      .from("business_cards")
      .select(
        "id, team_id(name, member_count, id,subscription_end_date, metadata->>logo)"
      )
      .eq("id", cardId)
      .eq("team_id(id)", teamId)
      .eq("mode", "team");

    if (error) {
      console.log(error);
      isError = true;
    }
    if (data) {
      subsEnd = data[0]?.team_id?.subscription_end_date;
      teamName = data[0]?.team_id?.name;
      teamLogo = data[0]?.team_id?.logo;
    }
  };

  const onKeyPress = async (e) => {
    if (e.charCode === 13) {
      await handleLogin();
    }
  };

  const checkCode = async () => {
    const dbcode = await encryptActivationCode(teamcode);
    const { data, error } = await supabase
      .from("teams")
      .select("team_token")
      .eq("id", teamId);
    if (error) {
      toastFailed("Failed to fetch team code");
      return;
    }
    if (data.length > 0) {
      if (data[0].team_token == dbcode) {
        return true;
      } else {
        toastFailed("Wrong team code");
        return false;
      }
    }
  };

  const handleLogin = async () => {
    loading = true;

    const codeIsCorrect = await checkCode();

    if (codeIsCorrect) {
      try {
        const { data: user, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if (user) {
          const ismember = members.filter((member) => 
            member.uid == user.user.id
          );
          console.log(ismember)
          if(ismember) {
            await connectCardHandler(ismember[0].member_id, ismember[0].email);
          } 
        }
        if (error) throw error;
        loading = false;
      } catch (error) {
        toastFailed(error.message);
        loading = false;
      }
    }

    loading = false;
  };

  const connectCardHandler = async (mid, email) => {
    loading = true;
    const { error } = await supabase.from("team_cardcon").insert({
      card_id: cardId,
      team_member_id: mid,
      status: true,
      display_personal: true,
    });

    if (error) {
      console.log(error);
      toastFailed("Failed to connect card, please contact our support");
      loading = false;
    } else {
      await logActivationTeam(
        logCardActivationMsg(cardId, email),
        cardId,
        parseInt(mid),
        teamId,
        `${email}`
      );
      loading = false;

      goto("/qbc/" + cardId + "?type=Preview");
    }
  };

  const checkCardConnected = async () => {
    const { data, error } = await supabase
      .from("team_cardcon")
      .select("id, team_member_id(uid)")
      .eq("card_id", cardId);

    if (error) console.log(error);
    if (data) {
      if (data.filter((c) => c.team_member_id.uid !== null).length > 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  const getTeamMemberList = async () => {
    const { data, error } = await supabase
      .rpc("getmembers", {
        tid: teamId,
      })
      .neq("email", "null")
      .order("member_from", { ascending: true });

    if (error) console.log(error);

    if (data) {
      members = data;
    }
  };

  onMount(async () => {
    if (await checkCardConnected()) {
      redirectToEditor();
    } else {
      await getTeamData();

      isNotActiveTeam = new Date().getTime() > new Date(subsEnd).getTime();
    }
  });
</script>

<svelte:head>
  <title>Qubic Card | Activation</title>
</svelte:head>

<div
  class="flex flex-col w-full text-white bg-[url(/polka.png)] min-h-screen justify-center items-center"
>
  {#if isError}
    <div
      class="bg-neutral-900 h-screen justify-center items-center flex flex-col text-center text-white w-full md:w-96 text-lg"
    >
      <h1 class="font-bold text-2xl">404</h1>
      <h2>Page not found</h2>
    </div>
  {:else if isNotActiveTeam}
    <div
      class="bg-neutral-900 h-screen justify-center items-center flex flex-col text-center text-white w-full md:w-96 text-lg"
    >
      Subscription expired
    </div>
  {:else}
    <div
      class="lg:w-1/3 w-full max-w-lg my-auto mx-6 md:mx-14 lg:mx-auto bg-black min-h-screen px-8 md:px-12 flex flex-col justify-center"
    >
      <SvelteToast />
      <AuthWrapper>
        {#await getTeamMemberList()}
          <div class="bg-black" />
        {:then name}
          {#if members.length > 0}
            <div class="max-w-sm mx-auto">
              <p class="text-2xl font-bold">{teamName} Activation</p>
              <p class="text-neutral-300 text-sm">
                Enter your credential to activate this team card
              </p>
              <form>
                <p
                  class="block mt-10 text-sm font-medium leading-relaxed tracking-tighter text-left text-gray-400"
                >
                  Email Address
                </p>
                <input
                  bind:value={email}
                  type="email"
                  name=""
                  id=""
                  required
                  placeholder="Your Email "
                  class="w-full bg-neutral-800 px-4 rounded py-2 mt-2 text-base transition duration-500 ease-in-out transform border-transparent focus:border-gray-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                />

                <p
                  class="block text-sm font-medium leading-relaxed mt-3 tracking-tighter text-left text-gray-400"
                >
                  Password
                </p>
                <input
                  on:keypress={async (e) => await onKeyPress(e)}
                  bind:value={password}
                  type="password"
                  name=""
                  id=""
                  required
                  placeholder="Your Password "
                  class="w-full bg-neutral-800 rounded px-4 py-2 mt-2 text-base transition duration-500 ease-in-out transform border-transparent focus:border-gray-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                />

                <p
                  class="block text-sm font-medium leading-relaxed mt-3 tracking-tighter text-left text-gray-400"
                >
                  Team Code
                </p>
                <input
                  on:keypress={async (e) => await onKeyPress(e)}
                  bind:value={teamcode}
                  required
                  type="password"
                  name=""
                  id=""
                  placeholder="Your Team Code "
                  class="w-full bg-neutral-800 rounded px-4 py-2 mt-2 text-base transition duration-500 ease-in-out transform border-transparent focus:border-gray-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                />
                <button
                  disabled={loading}
                  on:click={async () => await handleLogin()}
                  class="block w-full px-4 py-3 mt-6 rounded font-semibold text-white transition duration-500 ease-in-out transform bg-blue-600 hover:bg-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                  >{loading ? 'Processing' : 'Activate'}</button
                >
              </form>
            </div>
          {:else}
            <div class="flex flex-col justify-center items-center gap-10">
              <h1 class="text-lg font-bold text-center">No member found</h1>

              <button
                class="bg-blue-600 p-2 rounded-md w-full flex justify-between items-center"
                on:click={() =>
                  goto("https://editor.qubic.id?team_id=" + teamId)}
              >
                Register as member <span class="text-2xl">&#8594;</span>
              </button>
            </div>
          {/if}
        {:catch name}
          <div>
            <h1 class="text-lg text-white text-center w-full mt-8">
              Some error occurred. Please reload the page and try again <br />
              or <br />
              <a href="https://wa.me/628113087599" class="font-bold">
                contact us!
              </a>
            </h1>
          </div>
        {/await}
      </AuthWrapper>
    </div>
  {/if}
</div>
