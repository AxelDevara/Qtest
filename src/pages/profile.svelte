<script>
  import { fade, fly, slide } from "svelte/transition";
  import { user } from "@lib/stores/userStore";
  import ConnectModal from "@comp/modals/connectModal.svelte";
  import AvatarCard from "@comp/cards/avatarCard.svelte";
  import BorderButton from "@comp/buttons/borderButton.svelte";
  import { socialIcons } from "@lib/constants";
  import LinkPreview from "@comp/cards/linkPreview/linkPreview.svelte";
  import { socials, links } from "@lib/stores/editorStore";
  import { theme } from "@lib/profileTheme";
  import Dummy from "@lib/dummy.json";
  import { genvcard } from "@lib/vcard/vcardgen";
  import { log, logTeam } from "@lib/qubic-core/logger";
  import { page } from "$app/stores";
  import { go, teamForwarder } from "@lib/qubic-core/forwarder";
  import {
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
  } from "@rgossiaux/svelte-headlessui";
  import { toastFailed } from "@lib/utils/toast";
  import IntersectionObserver from "@comp/intersectionObserver.svelte";
  import { inView } from "@lib/stores/intersectingStore";

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
  // console.log(teamData);
  let showModal = false;
  let showSocials = true;
  let showLinks = true;
  let showTeamsSocials = true;
  let showTeamsLinks = true;
  let currentTheme = theme[data?.design?.theme?.toString() ?? "dark"];
  let holder = data?.firstname + " " + data?.lastname;
  let profile;
  let forScrollToSocialsSection;

  const download = (vCardString, fileName, isTeam = false) => {
    if (isTeam) {
      logTeam(
        "Your contact was added to a phone",
        "INFO",
        cardId,
        teamData.id,
        holder,
        null,
        memberId
      );
    } else {
      log(
        "Your contact was added to a phone",
        "INFO",
        null,
        cardId,
        profileUid
      );
    }

    const fileURL = URL.createObjectURL(
      new Blob([vCardString], { type: "text/vcard;charset=utf-8" })
    );
    let fileLink = document.createElement("a");
    fileLink.href = fileURL;
    fileLink.download = `${fileName}.vcf`;
    document.body.appendChild(fileLink);
    fileLink.click();
  };

  const modalHandler = () => (showModal = !showModal);

  const downloadHandler = async () => {
    window.open(teamData?.metadata?.brochure?.url, "_blank").focus();
    logTeam(
      "Your brochure was downloaded",
      "INFO",
      cardId,
      teamData.id,
      holder,
      null,
      memberId
    );
  };

  let personalProfile = {
    firstname: data?.firstname ?? "",
    lastname: data?.lastname ?? "",
    address: data?.address ?? "",
    company: data?.company ?? "",
    job: data?.job ?? "",
    avatar: data?.avatar,
    design: data?.design,
    socials: data?.socials?.filter(
      (social) => !social.type.includes("business")
    ),
    links: data?.links?.filter((link) => link.isPersonal !== false),
    isBusiness: data?.isBusiness,
  };

  let businessProfile = {
    firstname: data?.firstnameBusiness ?? "",
    lastname: data?.lastnameBusiness ?? "",
    address: data?.addressBusiness ?? "",
    company: data?.companyBusiness ?? "",
    job: data?.jobBusiness ?? "",
    avatar: data?.avatar ?? "",
    design: data?.design,
    socials: data?.socials?.filter((social) =>
      social.type.includes("business")
    ),
    links: data?.links?.filter((link) => link.isPersonal === false),
    isBusiness: data?.isBusiness,
  };
  

  $: if (data) {
    personalProfile = {
      firstname: data?.firstname ?? "",
      lastname: data?.lastname ?? "",
      address: data?.address ?? "",
      company: data?.company ?? "",
      job: data?.job ?? "",
      avatar: data?.avatar,
      design: data?.design,
      socials: data?.socials?.filter(
        (social) => !social.type.includes("business")
      ),
      links: data?.links?.filter((link) => link.isPersonal !== false),
      isBusiness: data?.isBusiness,
    };

    businessProfile = {
      firstname: data?.firstnameBusiness ?? "",
      lastname: data?.lastnameBusiness ?? "",
      address: data?.addressBusiness ?? "",
      company: data?.companyBusiness ?? "",
      job: data?.jobBusiness ?? "",
      avatar: data?.avatar ?? "",
      design: data?.design,
      socials: data?.socials?.filter((social) =>
        social.type.includes("business")
      ),
      links: data?.links?.filter((link) => link.isPersonal === false),
      isBusiness: data?.isBusiness,
    };

    holder = data?.firstname + " " + data?.lastname;
  }

  $: if (data?.design?.theme) {
    currentTheme = data.isBusiness
      ? data?.design?.themeBusiness != null
        ? theme[data?.design?.themeBusiness?.toString()]
        : (currentTheme = theme["dark"])
      : theme[data?.design?.theme?.toString()];
  } else {
    currentTheme = theme["dark"];
  }

  function scrollIntoView({ target }) {
    const el = document.querySelector(target.getAttribute("href"));
    if (!el) return;
    el.scrollIntoView({
      behavior: "smooth",
    });
  }
</script>

<!-- {#if data} -->

<div
  bind:this={profile}
  class={`${currentTheme?.pageBackground} ${$$props.class} relative transition-colors duration-500 ease-in text-sm`}
  class:bg-image-profile={currentTheme?.backgroundImage}
  style={`--bg-img-profile: url('${currentTheme?.backgroundImage}')`}
>
  <div
    class="w-full p-2 sticky top-0 z-10 rounded-3xl {currentTheme?.pageBackground} "
  >
    <div
      class="rounded-2xl h-32"
      style={`background: url(${
        data?.isBusiness
          ? data?.design?.backgroundBusiness ?? ""
          : data?.design?.background ?? ""
      });
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;`}
    >
      <div class={$inView ? "" : "gap-5 flex items-center justify-center"}>
        <AvatarCard
          {isLoading}
          class="antialiased z-50 relative appBar flex {$inView
            ? 'pt-5'
            : 'pb-2'}"
          theme={currentTheme}
          height={`${$inView ? 145 : 100}`}
          width={`${$inView ? 145 : 100}`}
          background={data?.avatar == "" || null
            ? "/favicon.svg"
            : data?.avatar}
        />
        {#if !$inView && !isLoading}
          <div
            in:fly|local={{ x: -200, duration: 1000 }}
            class="flex z-40 flex-col gap-1 pt-2 w-full pr-4 {currentTheme?.text}"
          >
            <!-- {currentTheme?.pageBackground} {currentTheme?.text} rounded-md p-1 -->
            <div class="{currentTheme?.pageBackground} p-2 rounded-md">
              <h1 class="text-sm font-bold">
                {#if !data?.isBusiness}
                  {data?.firstname ?? Dummy.firstname} {data?.lastname ?? ""}
                {:else}
                  {data?.firstnameBusiness ?? Dummy.firstname}
                  {data?.lastnameBusiness ?? ""}
                {/if}
              </h1>
              {#if data?.job || data?.jobBusiness}
                <h1 class="text-xs opacity-80">
                  {#if !data?.isBusiness}
                    {data?.job ?? ""}
                  {:else}
                    {data?.jobBusiness ?? ""}
                  {/if}
                </h1>
              {/if}
              {#if data?.company || data?.companyBusiness}
                <h1 class="text-xs opacity-90">
                  {#if !data?.isBusiness}
                    {data?.company ?? ""}
                  {:else}
                    {!data?.companyBusiness || data?.companyBusiness === ""
                      ? ""
                      : data?.companyBusiness}
                  {/if}
                </h1>
              {/if}
            </div>
            <div class="grid grid-cols-3 justify-between gap-1">
              <button
                on:click={() =>
                  profile.scrollIntoView({
                    behavior: "smooth",
                  })}
                class=" p-1 text-xs rounded-md {currentTheme?.text} {currentTheme?.secondary}"
                >Bio</button
              >
              <button
                on:click={() =>
                  forScrollToSocialsSection.scrollIntoView({
                    behavior: "smooth",
                  })}
                class=" p-1 text-xs rounded-md {currentTheme?.text} {currentTheme?.secondary}"
                >Socials</button
              >

              <a
                on:click|preventDefault={scrollIntoView}
                href={`#links`}
                class="text-center p-1 text-xs rounded-md {currentTheme?.text} {currentTheme?.secondary}"
                >Links</a
              >
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
  <!-- BIO -->
  {#if !isLoading}
    <IntersectionObserver id="bio" section="bio">
      <div
        class=" justify-center text-center items-center flex flex-col px-10 pt-8 {currentTheme?.text}"
      >
        <h1
          class="text-lg font-bold text-center"
          bind:this={forScrollToSocialsSection}
        >
          {#if !data.isBusiness}
            {data.firstname ?? Dummy.firstname} {data.lastname ?? ""}
          {:else}
            {data.firstnameBusiness ?? Dummy.firstname}
            {data.lastnameBusiness ?? ""}
          {/if}
        </h1>
        {#if data.job || data.jobBusiness}
          <h1 class="text-sm opacity-80">
            {#if !data.isBusiness}
              {data.job ?? ""}
            {:else}
              {data.jobBusiness ?? ""}
            {/if}
          </h1>
        {/if}
        {#if data.company || data.companyBusiness}
          <h1 class="text-md opacity-90">
            {#if !data.isBusiness}
              {data.company ?? ""}
            {:else}
              {!data.companyBusiness || data.companyBusiness === ""
                ? ""
                : data.companyBusiness}
            {/if}
          </h1>
        {/if}
      </div>
    </IntersectionObserver>

    <!-- TEAM -->
    {#if isTeam && teamData}
      <div class="flex flex-col text-white gap-[2px] mt-4 px-10">
        <BorderButton
          order={1}
          class="w-full font-semibold h-12 {currentTheme?.outline} {currentTheme?.button} {currentTheme?.buttonText} rounded-md mb-1"
          on:click={modalHandler}
        >
          Connect With Me
        </BorderButton>
        {#if showModal}
          <ConnectModal
            {isTeam}
            {memberId}
            teamId={teamData?.id}
            on:showModal={modalHandler}
            {showModal}
            {profileUid}
            {cardId}
            {data}
          />
        {/if}
        <BorderButton
          order={1}
          class="w-full h-12 {currentTheme?.outline} {currentTheme?.secondary} {currentTheme?.text} rounded-md"
          on:click={async () =>
            download(
              await genvcard(
                data,
                Object.assign({}, teamData.metadata, {
                  display_personal: isDisplayPersonal,
                }),
                null,
                teamData?.metadata.description ?? null
              ),
              data.firstname + " " + data.lastname,
              true,
            )}
        >
          Add to Contacts
        </BorderButton>
      </div>

      <TabGroup class="flex flex-col items-center w-full text-white mt-2">
        <TabList
          class={`${isDisplayPersonal ? "flex" : "hidden"} w-2/3 h-16 ${
            currentTheme?.pageBackground
          } rounded-lg p-2`}
        >
          <Tab
            class={({ selected }) =>
              selected
                ? `border-b-4 ${currentTheme?.text} ${currentTheme.outline} w-1/2`
                : `border-b-2 ${currentTheme?.text} ${
                    data?.design?.theme?.toString() === "light" ||
                    data?.design?.theme?.toString() === "offwhite"
                      ? "border-neutral-200"
                      : data?.design?.theme?.toString() === "khaki"
                      ? "border-neutral-600"
                      : "border-neutral-800"
                  } w-1/2`}>Team</Tab
          >
          <Tab
            class={({ selected }) =>
              selected
                ? `border-b-4 ${currentTheme?.text} ${currentTheme.outline} w-1/2`
                : `border-b-2 ${currentTheme?.text}  ${
                    data?.design?.theme?.toString() === "light" ||
                    data?.design?.theme?.toString() === "offwhite"
                      ? "border-neutral-200"
                      : data?.design?.theme?.toString() === "khaki"
                      ? "border-neutral-600"
                      : "border-neutral-800"
                  } w-1/2`}>My Contact</Tab
          >
        </TabList>
        <TabPanels class="w-full px-10">
          <TabPanel>
            <div class="gap-2 flex flex-col justify-center items-center mt-4">
              <div
                class={`flex gap-2 flex-col ${currentTheme?.text} w-full outline outline-2 ${currentTheme?.outline} rounded-lg p-4 team-component`}
              >
                <div class="flex items-center">
                  {#if teamData?.metadata?.logo}
                    <img
                      src={teamData?.metadata?.logo ?? Dummy.avatar}
                      alt=""
                      class="rounded-lg w-16 h-16 mr-2"
                    />
                  {:else}
                    <img
                      src={Dummy.avatar}
                      alt=""
                      class="rounded-lg w-16 h-16 mr-2"
                    />
                  {/if}
                  <h1 class="break-all">
                    {teamData?.metadata.company ?? ""}
                  </h1>
                </div>
                <p class="break-all">
                  {teamData?.metadata.address ?? ""}
                </p>
                <p class="text-neutral-400 break-all">
                  {teamData?.metadata.description ?? ""}
                </p>
              </div>
              {#if teamData?.metadata?.brochure?.url}
                <!-- ${
                  isBgImage && currentTheme?.secondary
                } -->
                <div
                  on:click={downloadHandler}
                  class={`w-full outline-2 outline rounded-lg p-4 cursor-pointer team-component ${currentTheme?.text} ${currentTheme?.outline} `}
                >
                  <h1 class="break-all">
                    {teamData?.metadata?.brochure?.title}
                  </h1>
                  <p class="text-neutral-400 break-all">
                    Know more about {teamData?.metadata?.company}
                  </p>
                </div>
              {/if}
              <div class="{currentTheme?.text} w-full">
                <IntersectionObserver id="socials" section="socials">
                  <div
                    class="my-4 overflow-clip rounded-md outline-1 outline {currentTheme?.outline}"
                  >
                    <div
                      class="flex flex-row px-2 py-3 items-center justify-center"
                    >
                      <p class="text-xs font-medium flex-grow">Socials</p>
                      <button
                        on:click={() => (showTeamsSocials = !showTeamsSocials)}
                        class="{currentTheme?.button} {currentTheme?.buttonText} rounded-full w-4 h-4 p-0 text-center items-center m-0 justify-center flex"
                        >{showTeamsSocials ? "-" : "+"}</button
                      >
                    </div>
                    {#if showTeamsSocials}
                      <div
                        transition:slide|local
                        class="flex justify-between flex-wrap items-start"
                      >
                        {#if teamData.metadata.socials.length < 1 || teamData.metadata.socials.every((s) => s.isActive === false)}
                          <p class="text-center ml-2 mb-2 {currentTheme?.text}">
                            No socials added
                          </p>
                        {:else}
                          {#each teamData.metadata.socials as item, i}
                            {#if item.isActive}
                              <BorderButton
                                order={i}
                                on:click={async () => {
                                  await teamForwarder(
                                    "team",
                                    item.type,
                                    item.data,
                                    $page.url.searchParams.get("type") ??
                                      "Preview",
                                    cardId,
                                    memberId,
                                    teamData.id,
                                    holder
                                  );
                                }}
                                class="py-2 px-6 sm:px-8 flex-grow flex justify-center items-center {currentTheme?.outline} {currentTheme?.secondary}"
                                ><img
                                  src={item.type.includes("github")
                                    ? "/icons/github-icons.svg"
                                    : socialIcons[item.type]}
                                  class="w-[45px] sm:w-[42px]"
                                  alt=""
                                /></BorderButton
                              >
                            {/if}
                          {/each}
                        {/if}
                      </div>
                    {/if}
                  </div>
                </IntersectionObserver>

                <IntersectionObserver id="links" section="links">
                  <div
                    class="my-4 overflow-clip rounded-md outline-1 outline {currentTheme?.outline} mb-20"
                  >
                    <div
                      class="flex flex-row px-2 py-3 items-center justify-center"
                    >
                      <p class="text-xs font-medium flex-grow">Links</p>
                      <button
                        on:click={() => (showTeamsLinks = !showTeamsLinks)}
                        class="{currentTheme?.button} {currentTheme?.buttonText} rounded-full w-4 h-4 p-0 text-center items-center m-0 justify-center flex"
                        >{showTeamsLinks ? "-" : "+"}</button
                      >
                    </div>
                    {#if showTeamsLinks}
                      <div
                        transition:slide|local
                        class="gap-2 mt-4 flex flex-col justify-center items-center"
                      >
                        {#if teamData.metadata.links.length < 1 || teamData.metadata.links.every((s) => s.isActive === false)}
                          <p class="text-center ml-2 mb-2 {currentTheme?.text}">
                            No links added
                          </p>
                        {:else}
                          {#each teamData.metadata.links as item, i}
                            {#if item.isActive}
                              <BorderButton
                                order={i}
                                class="w-full {currentTheme?.outline} {currentTheme?.secondary}"
                              >
                                <LinkPreview
                                  isTeam={true}
                                  isShowMetaImage={teamData.metadata
                                    .isShowMetaImage}
                                  title={item.title}
                                  url={item.link}
                                  className={currentTheme?.secondary}
                                  {profileUid}
                                  {cardId}
                                  {memberId}
                                  teamId={teamData.id}
                                  {holder}
                                />
                              </BorderButton>
                            {/if}
                          {/each}
                        {/if}
                      </div>
                    {/if}
                  </div>
                </IntersectionObserver>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <IntersectionObserver id="socials" section="socials">
              <div
                class="my-4 overflow-clip rounded-md outline-1 outline {currentTheme?.outline}"
              >
                <div class="mt-4 {currentTheme?.text}">
                  <!-- UTILITIES -->
                  <div
                    class="flex flex-row px-2 py-3 items-center justify-center"
                  >
                    <p class="text-xs font-medium flex-grow">Socials</p>
                    <button
                      on:click={() => (showSocials = !showSocials)}
                      class="{currentTheme?.button} {currentTheme?.buttonText} rounded-full w-4 h-4 p-0 text-center items-center m-0 justify-center flex"
                      >{showSocials ? "-" : "+"}</button
                    >
                  </div>
                </div>
                {#if showSocials}
                  <div
                    transition:slide|local
                    class="flex justify-between flex-wrap items-start"
                  >
                    {#if isEditorMode ? $socials.length < 1 : data.socials.length < 1 || isEditorMode ? $socials.every((s) => s.isActive === false) : data.socials.every((s) => s.isActive === false)}
                      <p class="text-center ml-2 mb-2 {currentTheme?.text}">
                        No socials added
                      </p>
                    {:else}
                      {#each isEditorMode ? $socials : data.socials as item, i}
                        {#if item.isActive}
                          <BorderButton
                            order={i}
                            on:click={async () => {
                              await teamForwarder(
                                "personal",
                                item.type,
                                item.data,
                                $page.url.searchParams.get("type") ?? "Preview",
                                cardId,
                                memberId,
                                teamData.id,
                                holder
                              );
                            }}
                            class="py-2 px-6 sm:px-8 flex-grow flex justify-center items-center {currentTheme?.outline} {currentTheme?.secondary}"
                            ><img
                              src={item.type.includes("github")
                                ? "/icons/github-icons.svg"
                                : socialIcons[item.type]}
                              class="w-[45px] sm:w-[42px]"
                              alt=""
                            /></BorderButton
                          >
                        {/if}
                      {/each}
                    {/if}
                  </div>
                {/if}
              </div>
            </IntersectionObserver>

            <!-- LINKS -->
            <IntersectionObserver id="links" section="links">
              <div
                class="my-4 overflow-clip {currentTheme?.text} rounded-md outline-1 outline {currentTheme?.outline} mb-20"
              >
                <div
                  class="flex flex-row px-2 py-3 items-center justify-center"
                >
                  <p class="text-xs font-medium flex-grow">Links</p>
                  <button
                    on:click={() => (showLinks = !showLinks)}
                    class="{currentTheme?.button} {currentTheme?.buttonText} rounded-full w-4 h-4 p-0 text-center items-center m-0 justify-center flex"
                    >{showLinks ? "-" : "+"}</button
                  >
                </div>
                {#if showLinks}
                  <div
                    transition:slide|local
                    class="gap-2 mt-4 flex flex-col justify-center items-center"
                  >
                    {#if isEditorMode ? $links.length < 1 : data.links.length < 1 || isEditorMode ? $links.every((s) => s.isActive === false) : data.links.every((s) => s.isActive === false)}
                      <p class="text-center ml-2 mb-2 {currentTheme?.text}">
                        No links added
                      </p>
                    {:else}
                      {#each isEditorMode ? $links : data.links as item, i}
                        {#if item.isActive}
                          <BorderButton
                            order={i}
                            class="w-full {currentTheme?.outline} {currentTheme?.secondary}"
                          >
                            <LinkPreview
                              isShowMetaImage={data.isShowMetaImage}
                              isTeam={true}
                              title={item.title}
                              url={item.link}
                              className={currentTheme?.secondary}
                              {profileUid}
                              {cardId}
                              {memberId}
                              teamId={teamData?.id}
                              {holder}
                            />
                          </BorderButton>
                        {/if}
                      {/each}
                    {/if}
                  </div>
                {/if}
              </div>
            </IntersectionObserver>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    {:else}
      <!-- BASIC -->
      <div class="px-10 mt-4 {currentTheme?.text}">
        <!-- UTILITIES -->
        <div class="grid grid-cols-1 gap-1 mb-1">
          <BorderButton
            order={1}
            class="w-full font-semibold h-12 {currentTheme?.outline} {currentTheme?.button} {currentTheme?.buttonText} rounded-md"
            on:click={() => {
              if (isEditorMode) {
                toastFailed("You can't connect to yourself.");
              } else if (profileUid === $user?.id) {
                toastFailed("You can't connect to yourself.");
              } else {
                modalHandler();
              }
            }}
          >
            Connect With Me
          </BorderButton>
          <BorderButton
            order={1}
            class="w-full font-semibold h-12 {currentTheme?.outline} {currentTheme?.secondary} rounded-md"
            on:click={async () =>
              download(
                await genvcard(
                  data.isBusiness ? businessProfile : personalProfile
                ),
                !data.isBusiness
                  ? data.firstname + " " + data.lastname
                  : data.firstnameBusiness + " " + data.lastnameBusiness
              )}
          >
            Add to Contacts
          </BorderButton>
        </div>

        {#if showModal}
          <ConnectModal
            {isTeam}
            {memberId}
            teamId={teamData?.id}
            on:showModal={modalHandler}
            {showModal}
            {profileUid}
            {cardId}
            {data}
          />
        {/if}

        <!-- BASIC SOCIALS -->

        <IntersectionObserver id="socials" section="socials">
          <div
            class="my-4 overflow-clip rounded-md outline-1 outline {currentTheme?.outline}"
          >
            <div class="flex flex-row px-2 py-3 items-center justify-center">
              <p class="text-xs font-medium flex-grow">Socials</p>
              <button
                on:click={() => (showSocials = !showSocials)}
                class="{currentTheme?.button} {currentTheme?.buttonText} rounded-full w-4 h-4 p-0 text-center items-center m-0 justify-center flex"
                >{showSocials ? "-" : "+"}</button
              >
            </div>
            {#if showSocials}
              <div
                transition:slide|local
                class="flex flex-wrap justify-between w-full items-start"
              >
                {#if data?.isBusiness}
                  {#if isEditorMode ? $socials?.filter( (s) => s.type.includes("business") ).length < 1 : data.socials?.filter( (s) => s.type.includes("business") ).length < 1 || isEditorMode ? $socials
                        ?.filter((s) => s.type.includes("business"))
                        ?.every((s) => s.isActive === false) : data.socials
                        ?.filter((s) => s.type.includes("business"))
                        ?.every((s) => s.isActive === false)}
                    <p class="text-center ml-2 mb-2 {currentTheme?.text}">
                      No socials added
                    </p>
                  {/if}
                {:else if isEditorMode ? $socials?.filter((s) => !s.type.includes("business")).length < 1 : data.socials?.filter((s) => !s.type.includes("business")).length < 1 || isEditorMode ? $socials
                      ?.filter((s) => !s.type.includes("business"))
                      ?.every((s) => s.isActive === false) : data.socials
                      ?.filter((s) => !s.type.includes("business"))
                      ?.every((s) => s.isActive === false)}
                  <p class="text-center ml-2 mb-2 {currentTheme?.text}">
                    No socials added
                  </p>
                {/if}

                {#if isEditorMode ? $socials.filter.length > 0 : data.socials.length > 0}
                  {#each isEditorMode ? $socials : data.socials as item, i}
                    {#if item.isActive}
                      {#if data.isBusiness}
                        {#if item.type.includes("business")}
                          <BorderButton
                            order={i}
                            on:click={async () => {
                              await go(
                                item.type.split("-")[0],
                                item.data,
                                isEditorMode
                                  ? "Preview"
                                  : $page.url.searchParams.get("type") ??
                                      "Preview",
                                cardId,
                                profileUid
                              );
                            }}
                            class="py-2 px-6 sm:px-8 flex-grow flex justify-center items-center {currentTheme?.outline} {currentTheme?.secondary}"
                            ><img
                              src={item.type.includes("github")
                                ? "/icons/github-icons.svg"
                                : socialIcons[item.type.split("-")[0]]}
                              class="w-[45px] sm:w-[42px]"
                              alt={item.type}
                            />
                          </BorderButton>
                        {/if}
                      {:else if !item.type.includes("business")}
                        <BorderButton
                          order={i}
                          on:click={async () => {
                            await go(
                              item.type,
                              item.data,
                              isEditorMode
                                ? "Preview"
                                : $page.url.searchParams.get("type") ??
                                    "Preview",
                              cardId,
                              profileUid
                            );
                          }}
                          class="py-2 px-6 sm:px-8 flex-grow flex justify-center items-center {currentTheme?.outline} {currentTheme?.secondary}"
                          ><img
                            src={item.type.includes("github")
                              ? "/icons/github-icons.svg"
                              : socialIcons[item.type]}
                            class="w-[45px] sm:w-[42px]"
                            alt={item.type}
                          /></BorderButton
                        >
                      {/if}
                    {/if}
                  {/each}
                {/if}
              </div>
            {/if}
          </div>
        </IntersectionObserver>

        <!-- BASIC LINKS -->
        <IntersectionObserver id="links" section="links">
          <div
            class="my-4 overflow-clip rounded-md outline-1 outline {currentTheme?.outline} mb-20"
          >
            <div class="flex flex-row px-2 py-3 items-center justify-center">
              <p class="text-xs font-medium flex-grow">Links</p>
              <button
                on:click={() => (showLinks = !showLinks)}
                class="{currentTheme?.button} {currentTheme?.buttonText} rounded-full w-4 h-4 p-0 text-center items-center m-0 justify-center flex"
                >{showLinks ? "-" : "+"}</button
              >
            </div>
            {#if showLinks}
              <div
                transition:slide|local
                class="flex flex-col justify-center items-center"
              >
                {#if data.isBusiness}
                  {#if isEditorMode ? $links?.filter((l) => l.isPersonal === false).length < 1 : data?.links.filter((l) => l.isPersonal === false).length < 1 || isEditorMode ? $links
                        ?.filter((l) => l.isPersonal === false)
                        .every((l) => l.isActive === false) : data?.links
                        .filter((l) => l.isPersonal === false)
                        .every((l) => l.isActive === false)}
                    <p class="self-start ml-2 mb-2 {currentTheme?.text}">
                      No links added
                    </p>
                  {/if}
                {:else if isEditorMode ? $links?.filter((l) => l.isPersonal !== false).length < 1 : data?.links.filter((l) => l.isPersonal !== false).length < 1 || isEditorMode ? $links
                      ?.filter((l) => l.isPersonal !== false)
                      .every((l) => l.isActive === false) : data?.links
                      .filter((l) => l.isPersonal !== false)
                      .every((l) => l.isActive === false)}
                  <p class="self-start ml-2 mb-2 {currentTheme?.text}">
                    No links added
                  </p>
                {/if}

                {#if isEditorMode ? $links?.length > 0 : data?.links.length > 0}
                  {#each isEditorMode ? $links : data.links as item, i}
                    {#if item.isActive}
                      {#if data.isBusiness}
                        {#if item.isPersonal === false}
                          <BorderButton
                            order={i}
                            class="w-full {currentTheme?.outline} {currentTheme?.secondary}"
                          >
                            <LinkPreview
                              isShowMetaImage={isEditorMode
                                ? isShowMetaImage
                                : data.isShowMetaImage}
                              title={item.title}
                              url={item.link}
                              className={currentTheme?.secondary}
                              {profileUid}
                              {cardId}
                            />
                          </BorderButton>
                        {/if}
                      {:else if item.isPersonal !== false}
                        <BorderButton
                          order={i}
                          class="w-full {currentTheme?.outline} {currentTheme?.secondary}"
                        >
                          <LinkPreview
                            isShowMetaImage={isEditorMode
                              ? isShowMetaImage
                              : data.isShowMetaImage}
                            title={item.title}
                            url={item.link}
                            className={currentTheme?.secondary}
                            {profileUid}
                            {cardId}
                          />
                        </BorderButton>
                      {/if}
                    {/if}
                  {/each}
                {/if}
              </div>
            {/if}
          </div>
        </IntersectionObserver>
      </div>
    {/if}
  {/if}
</div>

<!-- {/if} -->
<style>
  .bg-image-profile {
    background: var(--bg-img-profile);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    /* background-clip: padding-box; */
  }

  .team-component {
    animation-name: animateIn;
    animation-duration: 350ms;
    animation-delay: calc(var(--animation-order) * 100ms);
    animation-fill-mode: both;
    animation-timing-function: ease-in-out;
  }

  @keyframes animateIn {
    0% {
      opacity: 0;
      transform: scale(0.6) translateY(-8px);
    }

    100% {
      opacity: 1;
    }
  }

  .appBar {
    animation-iteration-count: infinite;
    animation-name: animateAppBar;
    animation-duration: 2s;
  }

  @keyframes animateAppBar {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    100% {
      -webkit-transform: translateX(-100px);
      transform: translateX(-100px);
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }
  }
</style>
