<script>
    import { fade, fly, slide } from "svelte/transition";
    import { user } from "@lib/stores/userStore";
    import { theme } from "@lib/profileTheme";
    import Lenis from "@studio-freight/lenis";
    import Dummy from "@lib/dummy.json";

    import { onMount } from "svelte";
    import ProLinkPreview from "@comp/cards/proLinkPreview/proLinkPreview.svelte";

    export let isShowMetaImage = false;
    export let isEditorMode = false;
    export let data,
        profileUid,
        cardId,
        isTeam,
        memberId,
        teamData,
        isDisplayPersonal,
        isLoading;
    console.log(data);
    let showModal = false;

    let currentTheme = theme[data?.design?.theme?.toString() ?? "dark"];

    $: if (data?.design?.theme) {
        currentTheme = data.isBusiness
            ? data?.design?.themeBusiness != null
                ? theme[data?.design?.themeBusiness?.toString()]
                : (currentTheme = theme["dark"])
            : theme[data?.design?.theme?.toString()];
    } else {
        currentTheme = theme["dark"];
    }
    console.log(data);
    onMount(() => {
        const container = document.querySelector(".container");
            const items = document.querySelectorAll(".child");

            container.addEventListener("wheel", (event) => {
                event.preventDefault();
                const delta = event.deltaY;

                container.scrollBy({
                    top: delta,
                    behavior: "smooth",
                });
            });
    });
</script>

{#if data?.logo}
    <div
        class="h-14 {currentTheme?.border} border-b sticky max-w-md z-[1] top-0 mx-auto {currentTheme?.pageBackground} bg-opacity-40 backdrop-blur-sm w-full flex justify-center items-center"
    >
        <img class="h-10 w-10" src={data?.logo ?? "/qubic.svg"} alt="" />
    </div>
{/if}
<div
    class={`${currentTheme?.pageBackground} ${$$props.class} relative mx-auto container transition-colors min-h-screen px-6 duration-500 ease-in text-sm`}
    class:bg-image-profile={currentTheme?.backgroundImage}
    style={`--bg-img-profile: url('${currentTheme?.backgroundImage}')`}
>
    <!-- Event -->
    {#if !isEditorMode}
        <div class="h-screen flex items-center w-full">
            <div
                class="aspect-[9/16] w-full bg-[url('https://images.unsplash.com/photo-1542992015-8b34590ec327?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-contain rounded-md"
            ></div>
        </div>
    {/if}
    <!-- INTRO -->
    <div
        class="w-full child snap-start max-w-sm text-white h-screen justify-center flex flex-col"
    >
        <h1 class=" text-5xl -mt-20 font-semibold">{data?.company}</h1>
        <p class="text-xl break-words opacity-60 mt-5">{data?.intro ?? ""}</p>
    </div>
    <!-- PROFILE -->
    <div class="w-full pt-6 child max-w-sm text-white min-h-screen flex-col">
        <div class="flex flex-row h-[175px]">
            <div class="h-[175px] w-[175px] aspect-square">
                <img
                    class="rounded-t-2xl h-full w-full object-cover rounded-bl-2xl"
                    src={data?.avatar}
                    alt=""
                />
            </div>
            <div class="flex pl-6 flex-col justify-between">
                <h1 class="text-4xl font-medium uppercase">
                    {data?.firstname ?? Dummy.firstname}
                    {data?.lastname ?? ""}
                </h1>
                <div>
                    <h1 class="text-sm text-neutral-400">
                        {data?.job ?? Dummy.job}
                    </h1>
                    <h1 class="text-sm text-neutral-400">
                        {data?.company ?? ""}
                    </h1>
                </div>
            </div>
        </div>
        <div
            transition:slide|local
            class="flex space-x-2 mt-4 flex-wrap items-start"
        >
            {#if data?.socials}
                {#if data?.socials?.length < 1}
                    <div></div>
                {:else}
                <div class="flex flex-wrap">
                    {#each data.socials as item, i}
                        {#if item.isActive}
                            <button
                                on:click={async () => {}}
                                class="py-2 px-2 mx-1 my-1 rounded-full flex space-x-3 justify-center items-center {currentTheme?.outline} {currentTheme?.secondary}"
                            >
                                <div class="rounded-full bg-neutral-600">
                                    <img
                                    class="fill-white p-1  invert"
                                    src={"/socialicons/" + item.type + ".svg"} height="22" width="22"
                                />
                                </div>

                                <p class="pr-2">{item.type}</p>
                            </button>
                        {/if}
                    {/each}
                </div>
                {/if}
            {/if}
        </div>
        <!-- banner -->
        {#if data?.design?.background}
        <img class="aspect-[3] rounded-md object-cover mt-6" src={data?.design
            .background} alt="">
            
        {/if}
        <!-- Links -->
        <div class="flex flex-col mt-6 space-y-4">
            {#if data?.links}
                {#each data?.links as item, i}
                    {#if item.isActive}
                        <a href={item.link} class="text-xl">{item.title}</a>
                       <ProLinkPreview title={item.title} url={item.link}></ProLinkPreview> 
                    {/if}
                {/each}
            {/if}
        </div>
    </div>
</div>
<div
    class="h-14 {currentTheme?.pageBackground} {currentTheme?.border} {currentTheme?.buttonText} border-t fixed w-full text-sm font-light flex-row max-w-md bottom-0 mx-auto flex justify-between items-center"
>
    <button class="w-full h-full text-left border-r {currentTheme?.border}">
        <p class="px-10">Connect With Me</p>
    </button>
    <button class="px-10">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-user-plus"
            ><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle
                cx="8.5"
                cy="7"
                r="4"
            /><line x1="20" y1="8" x2="20" y2="14" /><line
                x1="23"
                y1="11"
                x2="17"
                y2="11"
            /></svg
        >
    </button>
</div>

<style>
    .container {
        height: 100vh;
        scroll-snap-type: y mandatory;
        scroll-padding: 10px;
        overflow-y: scroll;
        scroll-behavior: smooth;
    }

    .child {
        scroll-snap-align: center;
        display: flex;
    }
</style>
