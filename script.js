function handleSubscribe() {
  const input = document.querySelector("#subscribe-form input");
  const message = document.getElementById("subscribe-message");

  if (input.value.trim() !== "") {
    message.style.display = "block";
    message.textContent = "✅ Subscribed successfully! (Demo only)";
    input.value = "";
  }
}
