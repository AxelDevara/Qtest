<script>
  import Spinner from "@comp/loading/spinner.svelte";
  import supabase from "@lib/db.js";
  import { toastSuccess, toastFailed } from "@lib/utils/toast";
  import { page } from "$app/stores";
  import Cookies from "js-cookie";
  import { checkIsRegistered } from "@lib/query/activate";
  import { fade } from "svelte/transition";
  import { goto } from "$app/navigation";
  import Input from "@comp/input.svelte";
  import Dummy from "@lib/dummy.json";

  let loading = false;
  let email = "";
  let password = "";
  let fname = "";
  let lname = "";
  let company = "";
  let confirmPassword = "";
  let doneRegister = false;
  let resendEmail = "";
  let lockResend = false;
  let isAgree = false;
  let hasRead = false;
  let isContainNumber = false;
  let cardId = $page.params.slug;

  const updateResend = async () => {
    if (lockResend == false) {
      const { data, error } = await supabase.auth.updateUser({
        email: resendEmail,
      });
      toastSuccess("email sent");
      lockResend = true;
    }
  };

  const redirectToProfilePreview = () =>
    goto("/qbc/" + cardId + "?type=Preview");

  const handleActiveCard = async (uid) => {
    try {
      const today = new Date();
      today.setFullYear(today.getFullYear() + 1);
      const { data, error } = await supabase
        .from("card_connection")
        .insert([
          {
            uid: uid,
            card_id: $page.params.slug,
            subs_end: today.toISOString().split("T")[0],
          },
        ]);

      if (error) throw error;
    } catch (err) {
      console.log(err);
      toastFailed();
    }
  };

  const updateProfile = async (uid) => {
    try {
      const { data, error } = await supabase
        .from("profile")
        .update(
          {
            metadata: {
              firstname: fname,
              lastname: lname,
              company: company ?? "",
              job: Dummy.job,
              avatar: Dummy.avatar,
              design: Dummy.design,
              links: Dummy.links,
              socials: [
                {
                  data: email,
                  type: "email",
                  isActive: true,
                },
              ],
              isShowMetaImage: false,
              isBusiness: false,
            },
          },
          // {
          //   returning: 'minimal',
          // }
        )
        .eq("uid", uid);

      if (error) throw error;
    } catch (err) {
      console.log(err);
      toastFailed();
    }
  };

  const handleSignUp = async () => {
    if (isAgree && hasRead) {
      if (email === "" || fname === "" || lname === "") {
        toastFailed("Please fill required field");
      } else if (password.length < 8) {
        toastFailed("Password needs to be more than 8 characters");
        return;
      } else if (!isContainNumber) {
        toastFailed("Password needs to contain at least one number");
        return;
      } else if (password !== confirmPassword && confirmPassword !== "") {
        toastFailed("Password doesn't match");
      } else {
        try {
          loading = true;
          const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
              data: {
                firstname: fname,
                lastname: lname,
                company: company ?? "",
              },
            },
          });

          if (error) {
            toastFailed(error.message);
            loading = false;
          } else {
            if (await checkIsRegistered(data.user.id)) {
              toastFailed("Email is already registered");
              loading = false;
            } else {
              await updateProfile(data.user.id);
              await handleActiveCard(data.user.id);
              toastSuccess("Please confirm your email");
              Cookies.set("activate", true);
              loading = false;
              doneRegister = true;
            }
          }
        } catch (error) {
          toastFailed();
          loading = false;
        }
      }
    } else {
      toastFailed("Please agree to our conditions");
    }
  };

  const passwordMustNumberRegex = () => {
    const regex = /^(?=.*[0-9])/;
    regex.test(password) ? (isContainNumber = true) : (isContainNumber = false);
  };

  $: password, passwordMustNumberRegex();
</script>

<section class="flex w-full min-h-screen">
  {#if !doneRegister}
    <div
      class="lg:w-1/2 xl:w-1/3 w-full bg-black px-6 md:px-12 py-8 md:py-24 mx-6 md:mx-14 lg:mx-auto"
    >
      <a href="/" class="flex items-center w-32 mb-4 font-medium md:mb-0">
        <img src="/qubic.svg" alt="" />
      </a>
      <h1
        class="mt-6 text-2xl font-semibold text-white tracking-tighter text-left sm:text-3xl title-font"
      >
        Join the Circle!
      </h1>
      <div class="mt-6">
        <div>
          <div class="flex gap-2 mb-1">
            <Input
              inputbg="bg-neutral-800"
              inputText="text-white"
              bind:value={fname}
              title="First Name"
              placeholder="First Name"
              isEmptyChecking
            />

            <Input
              inputbg="bg-neutral-800"
              inputText="text-white"
              bind:value={lname}
              title="Last Name"
              placeholder="Last Name"
            />
          </div>
          <Input
            inputbg="bg-neutral-800"
            inputText="text-white"
            bind:value={company}
            title="Company (Optional)"
            placeholder="Company (Optional)"
          />

          <Input
            inputbg="bg-neutral-800"
            inputText="text-white"
            bind:value={email}
            title="Email"
            placeholder="Email"
            isEmptyChecking
            isEmailInput
          />
          <p class="block text-sm font-medium mb-1 text-left text-neutral-600">
            Email will be permanent and cannot be changed afterwards
          </p>

          <p
            class="block text-sm font-medium mt-1 text-left text-gray-400 after:content-['*'] after:text-red-500 after:ml-0.5"
          >
            Password
          </p>
          <input
            bind:value={password}
            type="password"
            name=""
            id=""
            placeholder="Your Password "
            class="w-full px-4 py-2 mt-2 text-base text-white transition rounded-md duration-500 ease-in-out transform border-transparent bg-neutral-800"
          />
          {#if password.length < 8 && password !== ""}
            <small class="text-red-600">
              Password needs to be more than 8 characters
            </small>
          {/if}
          <br />
          {#if isContainNumber === false && password !== ""}
            <small class="text-red-600">
              Password needs to contain at least one number
            </small>
          {/if}
          <p
            class="block text-sm font-medium mt-2 text-left text-gray-400 after:content-['*'] after:text-red-500 after:ml-0.5"
          >
            Confirm Password
          </p>
          <input
            bind:value={confirmPassword}
            type="password"
            name=""
            id=""
            placeholder="Confirm Password"
            class="w-full px-4 py-2 mt-2 text-base text-white transition rounded-md duration-500 ease-in-out transform border-transparent bg-neutral-800"
          />
          {#if password !== confirmPassword && confirmPassword !== ""}
            <small class="block mt-3 text-left text-red-500">
              Password doesn't match
            </small>
          {/if}
        </div>

        <div class="flex flex-col text-gray-400 my-6 text-sm gap-2">
          <label class="cursor-pointer flex items-start gap-2">
            <input
              class="cursor-pointer mt-1"
              type="checkbox"
              bind:checked={isAgree}
            />
            <p>
              I have verified that the account above is correct and that this
              card will
              <span class="underline text-green-300">connect</span> to the email
              above.
            </p>
          </label>
          <label class="cursor-pointer flex gap-2 items-start">
            <input
              class="cursor-pointer mt-1"
              type="checkbox"
              bind:checked={hasRead}
            />
            <p>
              I have read the
              <a class="underline text-green-300" href="/pages/privacy"
                >Privacy Policy</a
              >
              and
              <a class="underline text-green-300" href="/pages/terms"
                >Terms of Service</a
              >.
            </p>
          </label>
        </div>

        <button
          disabled={loading}
          on:click={async () => (doneRegister ? null : await handleSignUp())}
          class="flex justify-between items-center gap-2 w-full rounded-md px-4 py-3 mt-6 text-white transition duration-500 ease-in-out transform bg-blue-600 hover:bg-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
          >{#if loading}
            <Spinner class="w-6 h-6" />
          {/if} Sign Up & Connect Card
          <span class="text-lg">&#8594;</span></button
        >
      </div>
    </div>
  {:else}
    <div
      class="lg:w-1/3 w-full border-2 bg-black border-neutral-700 px-16 py-32 my-auto mx-6 md:mx-14 lg:mx-auto text-white"
      in:fade|local
    >
      <h1 class="text-4xl font-bold">Thank you</h1>
      <h2 class="text-lg text-neutral-300 mt-2">
        We sent a confirmation email to {email}, please proceed with the
        confirmation instructions.
      </h2>
      <p class="mt-4 text-xs text-neutral-400">
        Wrong email? Let's send to another address
      </p>
      <form class="flex flex-col max-w-sm">
        <input
          required
          class="bg-neutral-800 mt-2 py-2 px-2 rounded-md"
          bind:value={resendEmail}
          type="text"
        />
        <button
          disabled={lockResend}
          on:click={updateResend}
          class="bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 mt-8 rounded-md text-white py-2"
          >Resend</button
        >
      </form>
      <button
        on:click={redirectToProfilePreview}
        class="border w-full hover:bg-neutral-800 max-w-sm border-neutral-800 mt-2 rounded-md text-white py-2"
        >Preview profile</button
      >
    </div>
  {/if}
</section>
