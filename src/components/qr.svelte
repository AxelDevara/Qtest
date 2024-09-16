<script>
  import { onMount } from "svelte";
  import html2canvas from "html2canvas";
  export let codeValue;
  export let squareSize;

  let qrcode;

  const downloadQR = () => {
    var link = document.createElement("a");
    link.download = "qubicqr.png";

    html2canvas(document.querySelector("#qrcode")).then(function (canvas) {
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  onMount(() => {
    let script = document.createElement("script");
    script.src =
      "https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js";
    document.head.append(script);

    script.onload = function () {
      qrcode = new QRCode("qrcode", {
        text: codeValue,
        width: squareSize,
        height: squareSize,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    };
  });
</script>

<div
  on:click={downloadQR}
  class="p-4 m-4 border rounded-lg border-neutral-500"
  id="qrcode"
/>
<h1 class="my-4 cursor-pointer text-white" on:click={downloadQR}>Download QR</h1>