/* Sơ đồ đối chiếu với doanh nghiệp (bên phải thẻ "Bộ máy tổ chức chính trị").
 * Dữ liệu: window.DOI_CHIEU trong co-cau-data.js */
(function () {
  "use strict";
  const D = window.DOI_CHIEU;
  if (!D) return;
  const $ = (id) => document.getElementById(id);
  const stage = $("dc-stage"), svg = $("dc-svg"), panel = $("doichieu"), map = $("map");
  $("dc-title").textContent = D.title;
  const COLOR = { vang: "#EBB91E", do: "#E53935", xam: "#A3ACB8" };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  stage.style.width = D.W + "px";
  stage.style.height = D.H + "px";
  svg.setAttribute("viewBox", `0 0 ${D.W} ${D.H}`);
  svg.setAttribute("width", D.W);
  svg.setAttribute("height", D.H);

  // ---- Sơ đồ: mũi tên, ô, chữ
  let html = "<defs>" + Object.entries(COLOR).map(([k, c]) =>
    `<marker id="dc-${k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="${c}"/></marker>`).join("") + "</defs>";
  const pathOf = (pts) => pts.map((p, i) => (i ? "L" : "M") + p[0] + "," + p[1]).join(" ");
  (D.notes || []).forEach((n) => {
    if (n.link) html += `<path class="dc-link" d="${pathOf(n.link)}"/>`;
  });
  D.edges.forEach((e) => {
    html += `<path class="dc-edge" d="${pathOf(e.points)}" stroke="${COLOR[e.color]}" marker-end="url(#dc-${e.color})"/>`;
    if (e.label) html += `<text class="dc-label" x="${e.at[0]}" y="${e.at[1]}">${esc(e.label)}</text>`;
  });
  D.boxes.forEach((b) => {
    html += `<rect class="dc-box" x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}"/>
      <text class="dc-text" x="${b.x + b.w / 2}" y="${b.y + b.h / 2}">${esc(b.label)}</text>`;
  });
  (D.labels || []).forEach((n) => { html += `<text class="dc-label" x="${n.at[0]}" y="${n.at[1]}">${esc(n.text)}</text>`; });
  svg.innerHTML = html;

  // ---- Ô chú giải
  const list = (arr) => `<ul>${arr.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
  (D.notes || []).forEach((n) => {
    const d = document.createElement("div");
    d.className = "dc-note";
    d.style.left = n.x + "px";
    d.style.top = n.y + "px";
    d.style.width = n.w + "px";
    d.innerHTML = `<span class="dc-no">${n.no}</span>` +
      (n.title ? `<div class="dc-note-title">${esc(n.title)}</div>` : "") +
      (n.text ? `<p>${esc(n.text)}</p>` : "") +
      (n.points ? list(n.points) : "") +
      (n.loi ? `<div class="dc-h loi">Lợi</div>${list(n.loi)}` : "") +
      (n.hai ? `<div class="dc-h hai">Hại</div>${list(n.hai)}` : "") +
      (n.ket ? `<p class="dc-ket">${esc(n.ket)}</p>` : "");
    stage.appendChild(d);
  });

  // ---- Khung đối chiếu cao ít nhất bằng sơ đồ gốc bên cạnh
  const fit = () => {
    const cs = getComputedStyle(map);
    const h = map.offsetHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    panel.style.minHeight = Math.max(0, h) + "px";
  };
  new ResizeObserver(fit).observe(map);
  fit();

  // ---- Nút to để đóng/mở khung đối chiếu
  const btn = $("dc-toggle"), canvas = $("tree-canvas"), small = btn.querySelector("small");
  function setOpen(open) {
    panel.hidden = !open;
    btn.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    small.textContent = open ? "mô hình tương tự · bấm để đóng" : "mô hình tương tự · bấm để mở";
    requestAnimationFrame(() => {
      const c = canvas.getBoundingClientRect();
      const target = open ? panel : map;
      const r = target.getBoundingClientRect();
      const left = open ? canvas.scrollLeft + r.left - c.left - 40
        : canvas.scrollLeft + r.left - c.left + (r.width - c.width) / 2;
      canvas.scrollTo({ left: Math.max(0, left), top: open ? 0 : canvas.scrollTop, behavior: "smooth" });
    });
  }
  btn.addEventListener("click", () => setOpen(panel.hidden));
})();
