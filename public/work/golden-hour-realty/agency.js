
"use strict";

const menu = document.querySelector(".mobile-menu");
if (menu) {
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menu.open) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });
  document.addEventListener("click", event => {
    if (!menu.contains(event.target) || event.target.closest("a")) menu.open = false;
  });
}
