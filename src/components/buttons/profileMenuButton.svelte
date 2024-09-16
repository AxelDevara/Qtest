<script>
  import supabase from '@lib/db';
  const handleLogout = async () => await supabase.auth.signOut();
</script>

<div
  class="z-50 absolute border shadow-xl text-sm right-0 flex flex-col md:right-2 top-[55px] w-[98.5%] md:w-[263px] sm:mx-2 md:mx-0 p-4 md:p-2 bg-white text-black h-auto"
>
  <a class="p-2 border-b" href="/pages/contactus">Contact Support</a>
  <a class="p-2" href="/products#howitworks">Tutorial</a>
  <button class=" text-white bg-black p-2 w-full" on:click={handleLogout}
    >Log Out</button
  >
</div>
