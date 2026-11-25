/* Sơ đồ đối chiếu với doanh nghiệp (bên phải thẻ "Bộ máy tổ chức chính trị").
 * Dữ liệu: window.DOI_CHIEU trong co-cau-data.js */
(function () {
  "use strict";
  const D = window.DOI_CHIEU;
  if (!D) return;
  const svg = document.getElementById("dc-svg");
  document.getElementById("dc-title").textContent = D.title;
  const COLOR = { vang: "#EBB91E", do: "#E53935", xam: "#A3ACB8" };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  svg.setAttribute("viewBox", `0 0 ${D.W} ${D.H}`);
  svg.setAttribute("width", D.W);
  svg.setAttribute("height", D.H);
  let html = "<defs>" + Object.entries(COLOR).map(([k, c]) =>
    `<marker id="dc-${k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="${c}"/></marker>`).join("") + "</defs>";

  D.edges.forEach((e) => {
    const d = e.points.map((p, i) => (i ? "L" : "M") + p[0] + "," + p[1]).join(" ");
    html += `<path class="dc-edge" d="${d}" stroke="${COLOR[e.color]}" marker-end="url(#dc-${e.color})"/>`;
    if (e.label) html += `<text class="dc-label" x="${e.at[0]}" y="${e.at[1]}">${esc(e.label)}</text>`;
  });
  D.boxes.forEach((b) => {
    html += `<rect class="dc-box" x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}"/>
      <text class="dc-text" x="${b.x + b.w / 2}" y="${b.y + b.h / 2}">${esc(b.label)}</text>`;
  });
  (D.notes || []).forEach((n) => { html += `<text class="dc-label" x="${n.at[0]}" y="${n.at[1]}">${esc(n.text)}</text>`; });
  svg.innerHTML = html;
})();
