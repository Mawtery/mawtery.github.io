document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Script loaded successfully");

  // Example: floating dots following mouse
  const createDot = () => {
    const dot = document.createElement("div");
    dot.className = "dot";
    document.body.appendChild(dot);
    return dot;
  };

  const dots = Array.from({ length: 10 }, createDot);

  window.addEventListener("mousemove", (e) => {
    dots.forEach((dot, i) => {
      setTimeout(() => {
        dot.style.left = e.pageX + "px";
        dot.style.top = e.pageY + "px";
      }, i * 50);
    });
  });
});
