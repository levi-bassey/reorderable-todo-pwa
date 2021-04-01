import App from "./App.svelte";

let app = new App({
  target: document.body,
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/serviceWorker.js")
    .then(() => console.log("Service worker registered"))
    .catch(() => console.log("Service worker registration "));
}

export default app;
