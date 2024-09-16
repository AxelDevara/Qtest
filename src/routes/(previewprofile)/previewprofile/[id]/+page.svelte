<script>
  import Profile from '@pages/profile.svelte';
  import { page } from '$app/stores';
  import { SvelteToast } from '@zerodevx/svelte-toast';

  const getData = async () => {
    const res = await fetch(`/api/previewprofile?id=${$page.params.id}`);

    const data = await res.json();
    return JSON.parse(JSON.stringify(data));
  };
</script>

<div
  class="bg-black bg-[url(/polka.png)] flex mx-auto justify-center items-center min-h-screen"
>
  {#await getData()}
    <h1>Loading</h1>
  {:then data}
    <SvelteToast />
    <Profile
      isTeam={data.isTeam}
      isEditorMode={false}
      class="min-h-screen min-w-md max-w-md w-full"
      data={data.data}
      cardId=""
      profileUid={data.profileUid}
      isLoading={false}
      memberId={data.data.id}
      isDisplayPersonal={true}
      teamData={data.teamData}
    />
  {:catch name}
    <h1>Error</h1>
  {/await}
</div>
