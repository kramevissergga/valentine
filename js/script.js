"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const slavaEl = document.querySelector(`.slava`);
  const buttonsEl = document.querySelector(`.buttons`);
  const messageEl = document.querySelector(`.message`);
  const envelopeEl = document.querySelector(`.envelope`);
  const yesImgEl = document.querySelector(`.yes-img`);

  document.addEventListener("click", documentClick);

  let rejectCounter = 0;
  function documentClick(e) {
    const targetElement = e.target;
    if (targetElement.closest(".envelope")) {
      if (!targetElement.classList.contains(`envelope--opened`)) {
        updateEnvelope(targetElement);
      }
    }
    if (!document.body.classList.contains("motion")) {
      if (targetElement.closest(".button--no")) {
        hideEnvelope();
        switch (rejectCounter) {
          case 0:
            showSlava();
            break;
          case 1:
            slavaAttack();
            break;
        }
        rejectCounter++;
      }
      if (targetElement.closest(".button--yes")) {
        yesAction();
      }
    }
  }
  let envelopeCounter = 1;
  function updateEnvelope(targetElement) {
    removeModifiers(targetElement);
    switch (envelopeCounter) {
      case 1:
        targetElement.classList.add("envelope--closed");
        const audio = new Audio("sound/sound.m4a");
        audio.play();
        break;
      case 2:
        targetElement.classList.add("envelope--opened");
        showMessage();
        setTimeout(function () {
          showButtons();
        }, 500);
        break;
    }
    envelopeCounter++;
  }

  function showMessage() {
    messageEl.classList.add(`message--show`);
  }

  function showButtons() {
    buttonsEl.classList.add(`buttons--show`);
  }

  function hideEnvelope() {
    envelopeEl.style.display = "none";
  }

  function removeModifiers(element) {
    element.className = element.className
      .split(" ")
      .filter((className) => !className.includes("--"))
      .join(" ");
  }

  function showSlava() {
    document.body.classList.add("motion");
    messageEl.innerText = `Не шути зо мнов, ослепе`;
    slavaEl.style.display = "block";
    setTimeout(function () {
      messageEl.innerText = `Будеш мойов валентинков?`;
    }, 2000);
    setTimeout(function () {
      document.body.classList.remove("motion");
    }, 2000);
  }
  function slavaAttack() {
    document.body.classList.add("motion");
    slavaEl.style.display = "block";
    slavaEl.style.backgroundImage = 'url("img/slava/attack.webp")';
    messageEl.innerText = `Бога ти с тов кнопков`;
    const noButton = document.querySelector(".button--no");
    setTimeout(function () {
      noButton.style.opacity = `0`;
    }, 2000);
    setTimeout(function () {
      noButton.style.display = `none`;
    }, 2500);
    setTimeout(function () {
      slavaEl.style.backgroundImage = 'url("img/slava/standing.webp")';
    }, 3000);
    setTimeout(function () {
      messageEl.innerText = `Будеш мойов валентинков?`;
    }, 3500);
    setTimeout(function () {
      document.body.classList.remove("motion");
    }, 3500);
  }

  function yesAction() {
    slavaEl.style.display = `none`;
    buttonsEl.style.display = `none`;
    envelopeEl.style.display = `none`;
    yesImgEl.style.display = `inline-block`;
    messageEl.innerText = `Подзвони ми, мала`;
  }
});
