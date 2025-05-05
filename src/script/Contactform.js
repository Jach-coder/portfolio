emailjs.init("VZX2i_zWFEpTuyDUY"); // e.g., 'yO_urPuBliCkEy123'

// Form submission handler
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_cnt865j",   // e.g., 'service_xxxxx'
    "template_wsx9rak",  // e.g., 'template_xxxxx'
    this
  ).then(
    function () {
      alert("✅ Message sent successfully!");
      document.getElementById("contact-form").reset();
    },
    function (error) {
      console.error("❌ Failed to send message:", error);
      alert("❌ Failed to send message. Please try again later.");
    }
  );
});