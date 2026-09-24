const IP = "play.axioris.cloud";

function copyIP() {
  const done = () => showToast("Server IP copied — " + IP);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(IP).then(done).catch(fallbackCopy);
  } else {
    fallbackCopy();
  }
}

function fallbackCopy() {
  const el = document.createElement("textarea");
  el.value = IP;
  document.body.appendChild(el);
  el.select();
  try { document.execCommand("copy"); } catch (e) {}
  el.remove();
  showToast("Server IP copied — " + IP);
}

function showToast(msg) {
  let t = document.querySelector(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

function toggleMenu() {
  const menu = document.querySelector(".mobile-menu");
  if (menu) menu.classList.toggle("open");
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-copy-ip]");
  if (btn) {
    e.preventDefault();
    copyIP();
  }
});
