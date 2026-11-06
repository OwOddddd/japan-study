// 排序題元件：依序點選項目，排完自動批改
// <div class="exercise order" data-solution="奈良,平安,鎌倉">
//   <p class="q">題目</p>
// </div>
(function () {
  function initOrder() {
    document.querySelectorAll(".order").forEach((box) => {
      const solution = box.dataset.solution.split(",");
      const pool = document.createElement("div");
      pool.className = "pool";
      const picked = document.createElement("div");
      picked.className = "picked";
      const feedback = document.createElement("div");
      feedback.className = "feedback";
      const controls = document.createElement("div");
      controls.className = "controls";
      const reset = document.createElement("button");
      reset.textContent = "重來";
      controls.appendChild(reset);
      box.append(pool, picked, controls, feedback);

      function build() {
        pool.innerHTML = "";
        picked.innerHTML = "";
        feedback.textContent = "";
        feedback.className = "feedback";
        const items = [...solution].sort(() => Math.random() - 0.5);
        items.forEach((label) => {
          const b = document.createElement("button");
          b.textContent = label;
          b.addEventListener("click", () => {
            picked.appendChild(b);
            b.disabled = true;
            if (picked.children.length === solution.length) check();
          });
          pool.appendChild(b);
        });
      }

      function check() {
        let allRight = true;
        [...picked.children].forEach((b, i) => {
          const right = b.textContent === solution[i];
          b.classList.add(right ? "correct" : "wrong");
          if (!right) allRight = false;
        });
        if (allRight) {
          feedback.className = "feedback ok";
          feedback.textContent = "完全正確。";
        } else {
          feedback.className = "feedback no";
          feedback.textContent = "紅色的位置不對。正確順序：" + solution.join(" → ") + "。按「重來」再試一次。";
        }
      }

      reset.addEventListener("click", build);
      build();
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initOrder);
  else initOrder();
})();
