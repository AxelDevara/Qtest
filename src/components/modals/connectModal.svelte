<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { toastFailed, toastSuccess } from "@lib/utils/toast";
  import { location, user } from "@lib/stores/userStore";
  import supabase from "@lib/db";
  import Cookies from "js-cookie";
  import Input from "@comp/input.svelte";
  import Spinner from "@comp/loading/spinner.svelte";
  import { log } from "@lib/qubic-core/logger";
  import AuthWrapper from "@comp/auth/authWrapper.svelte";
  import ChooseProfile from "@comp/chooseProfile.svelte";
  import getUserEmail from "@lib/query/getUserEmail";
  import { Dialog } from "@rgossiaux/svelte-headlessui";
  import { fade, fly, slide } from "svelte/transition";

  export let showModal;
  export let profileUid;
  export let cardId;
  export let data;
  export let isTeam;
  export let memberId;
  export let teamId;

  onMount(() => {
    connectorCookie = Cookies.get("connector")
      ? JSON.parse(Cookies.get("connector"))
      : null;
    if (connectorCookie) {
      // console.log("test: ", JSON.parse(connectorCookie))
      firstName = connectorCookie?.firstName ?? "";
      lastName = connectorCookie?.lastName ?? "";
      email = connectorCookie?.email ?? "";
      phone = connectorCookie?.phone ?? "";
      company = connectorCookie?.company ?? "";
      job = connectorCookie?.job ?? "";
      link = connectorCookie?.link ?? "";
    }
  });
  let connectorCookie;
  const firstname = data.firstname;
  const lastname = data.lastname;
  let currentUser = null;
  let showMore = false;
  let firstName = "";
  let lastName = "";
  let email = "";
  let phone = "";
  let company = "";
  let job = "";
  let link = "";
  let message = null;
  let loading = false;
  let loginEmail = "";
  let loginPassword = "";
  let loginLoading = false;
  let teamMemberData = null;
  let selectedTeamData = null;
  let isSelected = false;
  let userData = null;
  let isLoading = false;
  let isHaveTeams = false;
  let teamCardCon = {
    memberId: null,
    display_personal: false,
  };
  $: currentUser = $user;

  const connectWithMeUrl = "/api/connect";
  const dispatch = createEventDispatcher();
  const toggleModal = () => {
    dispatch("showModal");
    showMore = false;
  };

  const resetForm = () => {
    firstName = "";
    lastName = "";
    email = "";
    phone = "";
    company = "";
    job = "";
    link = "";
    message = null;
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toastFailed(error);
    currentUser = null;
    userData = null;
  };

  const connected = () => {
    // if(Cookies.get(profileUid)) {
    //   return true;
    // } else {
    //   return false;
    // }
    return false;
  }

  const removeDuplicate = (arr) => {
    let res = arr.filter(
      (thing, index, self) =>
        index === self.findIndex((t) => t.team_id.id === thing.team_id.id)
    );

    return res;
  };

  const getTeamsData = async (uid) => {
    isLoading = true;
    let { data, error } = await supabase
      .from("team_cardcon")
      .select(
        "display_personal, card_id, team_member_id(uid,team_profile, id, team_id(name,id,metadata))"
      )
      .eq("status", true)
      .filter("team_member_id.uid", "eq", uid);
    if (error) console.log(error);

    if (data?.length > 0) {
      data = data.filter((c) => c.team_member_id?.uid === uid);
      if (data?.length > 0) {
        teamMemberData = data.map((m) => m.team_member_id);

        teamMemberData = removeDuplicate(teamMemberData);

        isHaveTeams = true;
        isLoading = false;
      } else {
        isHaveTeams = false;
        isLoading = false;
      }
    } else {
      isHaveTeams = false;
      isLoading = false;
    }
  };

  const handleLogin = async () => {
    try {
      loginLoading = true;
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (error) throw error;
      currentUser = data.user;
      await getUserData();
      loginLoading = false;
      loginEmail = "";
      loginPassword = "";
      toastSuccess("Logged in");
    } catch (error) {
      loginLoading = false;
      toastFailed(error.message);
    }
  };

  const getUserData = async () => {
    if ($user) {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("uid", $user?.id);
      if (error) console.log(error);
      if (data) userData = data[0];
    }
  };

  const getConnectedAcc = async () => {
    if (profileUid !== undefined) {
      const { data: connection, error: connection_err } = await supabase
        .from("connection_acc")
        .select("*")
        .eq("uid", profileUid);
      if (connection_err) console.log(connection_err);
    }
  };

  $: if (showModal) getConnectedAcc();

  const teamConnectHandler = async () => {
    const lat = $location != null ? $location.latitude : null;
    const long = $location != null ? $location.longitude : null;
    let member = data;
    const { email: memberEmail } = await getUserEmail(profileUid);
    if (firstName === "" || email === "" || phone === "") {
      toastFailed("Please fill in all the required fields");
    } else {
      loading = true;
      let res = await fetch(connectWithMeUrl, {
        method: "POST",
        body: JSON.stringify({
          pos: lat == null && long == null ? null : {latitude: lat, longitude: long},
          connector: {
            data: {
              by: memberId,
              team_id: teamId,
              message: message,
              link: link,
              profileData: {
                firstname: firstName,
                lastname: lastName,
                company: company ?? "-",
                job: job ?? "-",
                links: [],
                socials: [
                  email != null
                    ? {
                        data: email,
                        type: "email",
                        isActive: true,
                      }
                    : {},
                  phone != null
                    ? {
                        data: phone,
                        type: "phone",
                        isActive: true,
                      }
                    : {},
                ],
              },
            },
            email: email,
            mode: "noacc",
          },
          cardowner: {
            data: {
              profileData: {
                firstname: member.firstname,
                lastname: member.lastname,
              },
            },
            email: memberEmail?.user,
            mode: "team",
          },
        }),
      });

      const status = await res.status;

      if (status === 200) {
        toastSuccess(
          `Successfully shared your info to ${firstname} ${lastname}`
        );
        log(
          `Your have connected with ${firstName}`,
          "INFO",
          null,
          cardId,
          profileUid
        );
      } else {
        toastFailed("Service unavailable");
      }

      loading = false;
      toggleModal();
    }
  };

  let selectedTeamDataModified;
  $: if (isSelected)
    selectedTeamDataModified = Object.assign({}, selectedTeamData, teamCardCon);

  const personalConnectHandler = async () => {
    loading = true;
    const qubic = data;
    const { email: profileEmail } = await getUserEmail(profileUid);

    if ($user) {
      const { email: userEmail } = await getUserEmail(userData.uid);

      let isBusinessProfile = selectedTeamData === null && qubic.isBusiness;
      let isBusinessUser =
        selectedTeamData === null && userData.metadata?.isBusiness;
      let socialsTeam = selectedTeamData?.team_id?.metadata?.socials?.map(
        (item) => {
          return {
            data: item.data,
            type: item.type,
            isActive: item.isActive,
          };
        }
      );

      let linksTeam = selectedTeamData?.team_id?.metadata?.links?.map(
        (item) => {
          return {
            link: item.link,
            title: item.title + " Company",
            isActive: item.isActive,
          };
        }
      );

      let socialsMember = selectedTeamData?.team_profile?.socials?.map(
        (item) => {
          return {
            data: item.data,
            type: item.type,
            isActive: item.isActive,
          };
        }
      );

      let linksMember = selectedTeamData?.team_profile?.links?.map((item) => {
        return {
          link: item.link,
          title: item.title,
          isActive: item.isActive,
        };
      });
      let socialsPersonal = userData.metadata?.socials?.filter(
        (social) => !social.type.includes("business")
      );
      let socialsBusiness = userData.metadata?.socials?.filter((social) =>
        social.type.includes("business")
      );
      let linksPersonal = userData.metadata?.links?.filter(
        (link) => link.isPersonal === true
      );
      let linksBusiness = userData.metadata?.links?.filter(
        (link) => link.isPersonal === false
      );
      let profileSocialsPersonal = qubic?.socials?.filter(
        (social) => !social.type.includes("business")
      );
      let profileSocialsBusiness = qubic?.socials?.filter((social) =>
        social.type.includes("business")
      );
      let profileLinksPersonal = qubic.links?.filter(
        (link) => link.isPersonal === true
      );
      let profileLinksBusiness = qubic.links?.filter(
        (link) => link.isPersonal === false
      );

      let profileTeams = {
        by: selectedTeamData?.id,
        team_id: selectedTeamData?.team_id.id,
        profileData: {
          avatar: qubic.avatar,
          company: isBusinessProfile
            ? qubic.companyBusiness ?? ""
            : qubic.company,
          firstname: isBusinessProfile
            ? qubic.firstnameBusiness ?? ""
            : qubic.firstname,
          lastname: isBusinessProfile
            ? qubic.lastnameBusiness ?? ""
            : qubic.lastname,
          job: isBusinessProfile ? qubic.jobBusiness ?? "" : qubic.job,
          links: isBusinessProfile
            ? profileLinksBusiness
            : profileLinksPersonal,
          socials: isBusinessProfile
            ? profileSocialsBusiness
            : profileSocialsPersonal,
        },
      };

      let profileBasic = {
        uid: userData.uid,
        profileData: {
          avatar: qubic.avatar,
          company: isBusinessProfile
            ? qubic.companyBusiness ?? ""
            : qubic.company,
          firstname: isBusinessProfile
            ? qubic.firstnameBusiness ?? ""
            : qubic.firstname,
          lastname: isBusinessProfile
            ? qubic.lastnameBusiness ?? ""
            : qubic.lastname,
          job: isBusinessProfile ? qubic.jobBusiness ?? "" : qubic.job,
          links: isBusinessProfile
            ? profileLinksBusiness
            : profileLinksPersonal,
          socials: isBusinessProfile
            ? profileSocialsBusiness
            : profileSocialsPersonal,
        },
      };
      let res = await fetch(connectWithMeUrl, {
        method: "POST",
        body: JSON.stringify({
          cardowner: {
            data: selectedTeamData ? profileTeams : profileBasic,
            email: profileEmail?.user,
            mode: "basic",
          },
          connector: {
            data: {
              message: message,
              link: link,
              uid: profileUid,
              profileData: {
                avatar:
                  selectedTeamData !== null
                    ? selectedTeamData.team_profile.avatar
                    : userData.metadata?.avatar,
                company:
                  selectedTeamData !== null
                    ? selectedTeamData.team_profile.company
                    : isBusinessUser
                    ? userData.metadata?.companyBusiness ?? ""
                    : userData.metadata?.company ?? "",
                firstname:
                  selectedTeamData !== null
                    ? selectedTeamData.team_profile.firstname
                    : isBusinessUser
                    ? userData.metadata?.firstnameBusiness ?? ""
                    : userData.metadata?.firstname ?? "",
                lastname:
                  selectedTeamData !== null
                    ? selectedTeamData.team_profile.lastname
                    : isBusinessUser
                    ? userData.metadata?.lastnameBusiness ?? ""
                    : userData.metadata?.lastname ?? "",
                job:
                  selectedTeamData !== null
                    ? selectedTeamData.team_profile.job
                    : isBusinessUser
                    ? userData.metadata?.jobBusiness ?? ""
                    : userData.metadata?.job ?? "",
                links:
                  selectedTeamData !== null
                    ? selectedTeamDataModified?.display_personal
                      ? linksTeam?.concat(linksMember)
                      : linksTeam
                    : isBusinessUser
                    ? linksBusiness
                    : linksPersonal,
                socials:
                  selectedTeamData !== null
                    ? selectedTeamDataModified?.display_personal
                      ? socialsTeam?.concat(socialsMember)
                      : socialsTeam
                    : isBusinessUser
                    ? socialsBusiness
                    : socialsPersonal,
              },
            },
            email: userEmail?.user,
            mode: selectedTeamData !== null ? "team" : "basic",
          },
        }),
      });

      const status = await res.status;

      if (status === 200) {
        toastSuccess("Successfully added to your contact list");
        log(
          `Your have connected with ${userData["metadata"]["firstname"]}${
            userData["metadata"]["company"] != null
              ? " from " + userData["metadata"]["company"]
              : ""
          }`,
          "INFO",
          null,
          cardId,
          profileUid
        );
      } else {
        toastFailed("Service unavailable");
      }
    } else {
      if (firstName === "" || email === "" || phone === "") {
        toastFailed("Please fill in all the required fields");
      } else {
        let res = await fetch(connectWithMeUrl, {
          method: "POST",
          body: JSON.stringify({
            cardowner: {
              data: {
                profileData: {
                  firstname: qubic.firstname,
                  lastname: qubic.lastname ?? "",
                  ...(qubic.company ? { "company": qubic.company } : {})
                }
              },
              email: profileEmail?.user,
              mode: "basic",
            },
            connector: {
              data: {
                uid: profileUid,
                message: message,
                link: link,
                profileData: {
                  firstname: firstName,
                  lastname: lastName,
                  company: company ?? "-",
                  job: job ?? "-",
                  links: [],
                  socials: [
                    email != null
                      ? {
                          data: email,
                          type: "email",
                          isActive: true,
                        }
                      : {},
                    phone != null
                      ? {
                          data: phone,
                          type: "phone",
                          isActive: true,
                        }
                      : {},
                  ],
                },
              },
              email: email,
              mode: "noacc",
            },
          }),
        });

        const status = await res.status;
        if (status === 200) {
          toastSuccess("Successfully added to your contact list");
          log(
            `Your have connected with ${firstName}`,
            "INFO",
            null,
            cardId,
            profileUid
          );
        } else {
          toastFailed("Service unavailable");
        }
      }
    }

    loading = false;
    toggleModal();
    selectedTeamData = null;
  };

  const submitHandler = async () => {
    Cookies.set(
      "connector",
      JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        link: link,
        company: company,
        job: job,
        message: message,
      })
    );

    Cookies.set(
      profileUid,
      true,
      { expires: 3 }
    );
    
    if (!isTeam) {
      await personalConnectHandler();
    } else if (isTeam) {
      await teamConnectHandler();
    }

    resetForm();
  };

  $: if (showModal) getUserData();

  let connectorBasicMode = "";

  $: if (showModal && userData)
    connectorBasicMode = userData.metadata?.isBusiness
      ? "business"
      : "personal";

  const setConnectorProfileMode = async () => {
    let isConnectorBusinessProfile = userData.metadata?.isBusiness;
    userData.metadata.isBusiness =
      connectorBasicMode === "business" ? true : false;
    isConnectorBusinessProfile = !isConnectorBusinessProfile;

    const { error } = await supabase
      .from("profile")
      .update(
        {
          metadata: userData.metadata,
        }
        // { returning: 'minimal' }
      )
      .eq("uid", $user?.id);

    if (error) {
      toastFailed();
      console.log(error);
    } else {
      await getUserData();
      toastSuccess(
        `Switched to ${
          connectorBasicMode === "business" ? "Business Mode" : "Personal Mode"
        }`
      );
    }
  };

</script>

<AuthWrapper>
  <!-- {#if showModal} -->
  <Dialog
    static
    class="md:max-w-lg mx-auto max-w-full fixed bottom-0 right-0 pb-4 left-0 rounded-t-xl overflow-y-auto max-h-[80%] bg-white z-50"
    open={showModal}
    on:close={() => {
      showModal = false;
      toggleModal();
    }}
  >
    <div
      class="flex w-full justify-end px-3 items-center h-10 shadow-sm bg-white sticky top-0"
    >
      <button
        on:click={() => {
          showModal = false;
          toggleModal();
        }}
        class="bg-neutral-300 p-0 m-0 opacity-20 rounded-full"
        ><img
          width="32"
          height="32"
          src="/icons/close.svg"
          alt="close"
        /></button
      >
    </div>
    <!--header-->
    <div class="border-b border-solid rounded-t py-2">
      {#if !isTeam}
        {#if currentUser == null}
          <div class="text-black px-4 md:px-8">
            <div class="flex flex-row items-center">
              <p class="text-lg font-bold flex-grow">Have a Qubic card?</p>
            </div>
            <p class="text-sm">
              Would you like to connect this to your account?
            </p>
            <div class="grid grid-cols-2 py-3 w-full">
              <div class="pr-1">
                <input
                  bind:value={loginEmail}
                  type="text"
                  class="bg-neutral-100 p-2 w-full"
                  placeholder="Email"
                />
              </div>
              <div class="pl-1">
                <input
                  bind:value={loginPassword}
                  type="password"
                  class="bg-neutral-100 p-2 w-full"
                  placeholder="Password"
                />
              </div>
            </div>
            <button
              on:click={handleLogin}
              class="bg-black text-white rounded-md px-3 py-2 text-sm md:text-base w-full"
            >
              {#if loginLoading}
                <Spinner class="h-6 w-6 mx-auto" />
              {:else}
                Login
              {/if}
            </button>
          </div>
        {/if}
      {/if}
    </div>
    <!--END of header-->

    <!--BODY-->
    <div class="flex flex-col gap-2 mx-4">
      {#if currentUser == null && !isTeam}
        <p class="text-sm text-neutral-400 mt-4">
          Connect <span class="font-bold text-neutral-500"
            >without an account</span
          >
        </p>
      {/if}
      {#if isTeam}
        <p class="font-semibold text-lg pt-2">Let's Connect</p>
      {/if}
      <!-- </div> -->
      <div class="flex flex-col rounded-md border p-2 text-black">
        <div
          transition:slide|local={{ duration: 500 }}
          class="overflow-y-auto scrollable transition-all flex flex-col justify-between ease-in-out duration-500 {showMore
            ? 'h-[350px] md:h-[360px]'
            : $user?.id
            ? 'h-[450px] md:h-[315px]'
            : 'h-[290px] md:h-[315px]'}"
        >
          {#if currentUser != null && !isTeam}
            {#if !loginLoading}
              <h1 class={"text-md lg:text-lg break-all"}>
                Connecting with your account <br />
                <span class="font-bold">{currentUser.email}</span>
              </h1>
              <!-- Choose your profile -->

              <!-- {#if isTeamMember} -->
              {#if selectedTeamData === null}
                <div class="flex w-full my-2 gap-2" transition:fade|local>
                  <button
                    disabled={connectorBasicMode === "personal"}
                    class={`p-2 text-xs md:text-md rounded-md w-1/2 border-2 hover:border-neutral-700 hover:text-neutral-700 ${
                      connectorBasicMode === "personal"
                        ? "border-neutral-900 font-bold"
                        : "border-neutral-300 text-neutral-500"
                    }`}
                    on:click={async () => {
                      connectorBasicMode = "personal";
                      await setConnectorProfileMode();
                    }}>Use Personal Profile</button
                  >
                  <button
                    disabled={connectorBasicMode === "business"}
                    class={`p-2 text-xs md:text-md rounded-md w-1/2 border-2 hover:border-neutral-700 hover:text-neutral-700 ${
                      connectorBasicMode === "business"
                        ? "border-neutral-900 font-bold"
                        : "border-neutral-300 text-neutral-500"
                    }`}
                    on:click={async () => {
                      connectorBasicMode = "business";
                      await setConnectorProfileMode();
                    }}>Use Business Profile</button
                  >
                </div>
              {/if}

              <ChooseProfile
                on:click={async () => {
                  if (teamMemberData === null)
                    await getTeamsData(currentUser.id);
                }}
                {isHaveTeams}
                {isLoading}
                {teamMemberData}
                on:discard={(e) => (selectedTeamData = e.detail)}
                on:update={(e) => {
                  if (e.detail === "basic") {
                    // selectedProfile = e.detail;
                    selectedTeamData = null;
                  } else {
                    selectedTeamData = e.detail;
                  }

                  isSelected = true;
                }}
              />
              <!-- {:else}
                  <div
                    class="border border-neutral-300 rounded-md p-2 w-full text-center"
                  >
                    Basic-{userData.metadata?.isBusiness
                      ? 'Business'
                      : 'Personal'}
                  </div>
                {/if} -->
              <div class="my-4">
                <p class="text-neutral-400 text-sm">
                  Don't want to connect using this account?
                </p>
                <button
                  on:click={handleLogout}
                  class="text-red-400 cursor-pointer text-sm md:text-base"
                >
                  Sign out
                </button>
              </div>
              <div class="mt-1">
                <Input
                  placeholder="Link (Optional)"
                  title="Link"
                  bind:value={link}
                  isLinkInput={true}
                />
                <h1 class="text-gray-400 text-sm md:text-base">Message</h1>
                <textarea
                  bind:value={message}
                  name="aboutme"
                  id="aboutme"
                  maxlength="50"
                  cols="15"
                  rows="5"
                  placeholder="Add short introduction (Optional)"
                  class="h-24 w-full text-sm md:text-base text-black bg-neutral-100 rounded-md my-2 p-2"
                />
              </div>
            {/if}
          {:else}
            <div class="flex flex-row space-x-2 w-full">
              <Input
                placeholder="First Name"
                title="First Name"
                bind:value={firstName}
                isEmptyChecking={true}
              />
              <Input
                placeholder="Last Name"
                title="Last Name"
                bind:value={lastName}
              />
            </div>
            <Input
              placeholder="Email"
              title="Email"
              bind:value={email}
              isEmailInput={true}
              isEmptyChecking={true}
            />
            <Input
              placeholder="Phone"
              title="Phone"
              bind:value={phone}
              isEmptyChecking={true}
              isPhoneInput={true}
            />
            {#if showMore}
              <Input
                placeholder="Link (Optional)"
                isLinkInput={true}
                title="Link"
                bind:value={link}
              />
              <Input
                placeholder="Company (Optional)"
                title="Company"
                bind:value={company}
              />
              <Input
                placeholder="Job (Optional)"
                title="Job"
                bind:value={job}
              />
              <div class="mt-1">
                <h1 class="text-gray-400">About me</h1>
                <textarea
                  bind:value={message}
                  name="aboutme"
                  id="aboutme"
                  maxlength="50"
                  cols="15"
                  rows="5"
                  placeholder="About me (Optional)"
                  class="h-24 w-full text-black bg-neutral-100 rounded-md my-2 p-2"
                />
              </div>
            {:else}
              <button
                class="text-sm border w-full rounded-md text-center py-2"
                on:click={() => {
                  showMore = !showMore;
                }}>+ Add More Information</button
              >
            {/if}
          {/if}
        </div>
        {#if loading}
          <button class="p-3 bg-blue-600 text-white mt-2 flex justify-center">
            <Spinner class="h-5 w-5 pr-2 border-white mr-4" />
            <p>Connecting...</p>
          </button>
        {:else}
          <button
            disabled={loading || connected()}
            class="{connected() ? "bg-green-500" : "bg-blue-600"} p-3 rounded-md text-sm md:text-base text-white mt-2 mb-4 hover:font-bold transition-all duration-500"
            on:click={submitHandler}
          >
            {connected() ? "Connected": "Connect With Me"}
          </button>
        {/if}
      </div>
    </div>
  </Dialog>
  <!-- {/if} -->
</AuthWrapper>

<style>
  .scrollable::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  .scrollable::-webkit-scrollbar-track {
    background: #ffffff;
  }

  /* Handle */
  .scrollable::-webkit-scrollbar-thumb {
    background: rgb(0, 0, 0);
  }
</style>
