import React from "react";
import "./toggleTheme.css";
import Moon from "@/Libs/moon-style";

type Props = {};

const ToggleThemeBtn = (props: Props) => {
  return (
    <div
      className="btn"
      onClick={() => {
        toggle();
      }}>
      <div className="btn__indicator">
        <div className="btn__icon-container">
          <i className={`btn__icon fa-solid ${Moon.currentTheme === "dark" ? "fa-moon" : "fa-sun"}`}></i>
        </div>
      </div>
    </div>
  );
};

export default ToggleThemeBtn;

const toggle = () => {
  const isDark = Moon.currentTheme === "light";
  //   const darkmode = localStorage.getItem("darkmode");
  const icon = document.querySelector(".btn__icon");

  //if the dark mode was never activated
  //   if (!darkmode) {
  //     icon.classList.add("fa-sun");
  //   } else if (darkmode == "true") {
  //     //if the dark mode is activated
  //     body.classList.add("darkmode");
  //     icon.classList.add("fa-moon");
  //   } else if (darkmode == "false") {
  //     //if the dark mode exists but is disabled
  //     icon.classList.add("fa-sun");
  //   }

  icon.classList.add("animated");

  Moon.setTheme(isDark ? "dark" : "light");
  if (isDark) {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  } else {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }

  setTimeout(() => {
    icon.classList.remove("animated");
  }, 500);
};
