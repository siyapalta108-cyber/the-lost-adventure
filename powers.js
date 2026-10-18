
/* NOVA MAGICAL POWERS */

(function () {
  const game = document.getElementById("game");
  const player = document.getElementById("player");
  const score = document.getElementById("score");
  const jump = document.getElementById("jump");

  if (!game || !player || !score || !jump) return;

  // 🌟 Magical sparkle
  function sparkle(symbol, color) {
    const star = document.createElement("span");
    star.textContent = symbol;

    star.style.cssText = `
      position:absolute;
      z-index:9;
      pointer-events:none;
      font-size:23px;
      color:${color};
      left:${player.offsetLeft + 5}px;
      bottom:${parseFloat(player.style.bottom || 42) + 25}px;
      animation:novaSparkle .65s ease-out forwards;
    `;

    game.appendChild(star);
    setTimeout(() => star.remove(), 650);
  }

  // 🌟 STAR JUMP
  jump.addEventListener("pointerdown", () => {
    sparkle("✦", "#ffe89c");
    setTimeout(() => sparkle("✧", "#d9baff"), 100);
  });

  // 💎 CRYSTAL SPARKLE
  let previousScore = score.textContent;

  new MutationObserver(() => {
    const current = score.textContent;

    if (current !== previousScore) {
      const oldNumber = parseInt(previousScore.match(/\d+/)?.[0] || 0);
      const newNumber = parseInt(current.match(/\d+/)?.[0] || 0);

      if (newNumber > oldNumber) {
        sparkle("💎", "#8fffff");
        setTimeout(() => sparkle("✨", "#ffffff"), 120);
      }

      previousScore = current;
    }
  }).observe(score, {
    childList: true,
    characterData: true,
    subtree: true
  });

  // 🌙 MOON SHIELD (visual glow)
  player.style.boxShadow =
    "0 0 12px #d9baff, 0 0 24px #9270ff";

  player.style.borderColor = "#e8d5ff";

  const style = document.createElement("style");

  style.textContent = `
    @keyframes novaSparkle {
      0% {
        opacity:1;
        transform:translateY(0) scale(.5);
      }
      100% {
        opacity:0;
        transform:translateY(-45px) scale(1.6);
      }
    }

    #player {
      animation:novaShield 2s ease-in-out infinite alternate;
    }

    @keyframes novaShield {
      from {
        filter:drop-shadow(0 0 3px #b99aff);
      }
      to {
        filter:drop-shadow(0 0 13px #e8caff);
      }
    }
  `;

  document.head.appendChild(style);
})();
