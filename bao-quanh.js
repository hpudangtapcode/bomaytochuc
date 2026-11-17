/* Khối Đảng và khối Nhà nước bao quanh sơ đồ Bộ Nội vụ (thẻ "Cơ cấu tổ chức").
 * Dữ liệu: window.BAO_QUANH trong co-cau-data.js */
(function () {
  "use strict";
  const D = window.BAO_QUANH;
  const SVGNS = "http://www.w3.org/2000/svg";
  const $ = (id) => document.getElementById(id);
  const map = $("map"), svg = $("map-edges"), labels = $("map-labels");
  const ORANGE = "#E8742C", TM = "#9DBCE6", GREY = "#9AA6B8";

  // ---- Dựng ô
  const div = (cls, text) => { const d = document.createElement("div"); d.className = cls; d.textContent = text; return d; };
  $("m-bch").textContent = D.bch;
  // Ban Tổ chức TW: bấm thanh để đóng/mở các vụ, cục; bấm từng vụ, cục để đóng/mở mô tả (giống Bộ Nội vụ)
  const toggles = []; // { btn, target }
  function setOpen(t, open, animate) {
    t.btn.classList.toggle("open", open);
    t.btn.setAttribute("aria-expanded", String(open));
    t.btn.querySelector(".toggle").textContent = open ? "−" : "+";
    t.target.classList.toggle("closed", !open);
    t.target.classList.remove("opening");
    if (open && animate) { void t.target.offsetWidth; t.target.classList.add("opening"); }
  }
  function makeToggle(btn, target, open) {
    const tg = document.createElement("span");
    tg.className = "toggle top";
    tg.setAttribute("aria-hidden", "true");
    btn.appendChild(tg);
    const t = { btn, target };
    toggles.push(t);
    setOpen(t, open);
    btn.addEventListener("click", () => {
      if (window.coCauMoved && window.coCauMoved()) return; // vừa kéo sơ đồ, không phải bấm
      const now = !btn.classList.contains("open");
      setOpen(t, now, true);
      if (!now && target.id === "m-tctw-units") unitToggles().forEach((u) => setOpen(u, false));
    });
    return t;
  }
  const unitToggles = () => toggles.filter((t) => t.btn.classList.contains("m-unit"));

  D.tctw.units.forEach((u) => {
    const col = div("tctw-col", "");
    const btn = document.createElement(u.desc ? "button" : "div");
    btn.className = "m-unit";
    btn.textContent = u.name;
    if (u.desc) {
      btn.type = "button";
      const d = div("m-desc", u.desc);
      col.appendChild(d);
      col.appendChild(btn);
      makeToggle(btn, d, false);
    } else col.appendChild(btn);
    $("m-tctw-units").appendChild(col);
  });
  $("m-tctw").textContent = D.tctw.name;
  makeToggle($("m-tctw"), $("m-tctw-units"), true);
  $("open-all").addEventListener("click", () => toggles.forEach((t) => setOpen(t, true)));
  $("close-all").addEventListener("click", () => toggles.forEach((t) => setOpen(t, t.btn.id === "m-tctw")));
  $("m-side").textContent = D.tctw.side.name;
  $("m-pc-tw").textContent = D.phanCap.trungUong;
  $("m-pc-dp").textContent = D.phanCap.diaPhuong;
  $("m-tinhuy").textContent = D.tinhUy.name;
  $("m-btctu").textContent = D.tinhUy.ban;
  $("m-btctu-note").textContent = D.tinhUy.note;
  D.tinhUy.children.forEach((c) => $("m-btctu-children").appendChild(div("m-child", c)));
  $("m-cp-label").textContent = D.nhaNuoc.chinhPhu;
  $("m-ubnd").textContent = D.nhaNuoc.ubnd;

  // ---- Vẽ mũi tên
  function box(el) {
    const m = map.getBoundingClientRect(), r = el.getBoundingClientRect();
    const x = r.left - m.left, y = r.top - m.top;
    return { x, y, w: r.width, h: r.height, r: x + r.width, b: y + r.height, cx: x + r.width / 2, cy: y + r.height / 2 };
  }
  const P = (x, y) => ({ x, y });
  const bez = (p, t) => {
    const m = 1 - t;
    return P(m * m * m * p[0].x + 3 * m * m * t * p[1].x + 3 * m * t * t * p[2].x + t * t * t * p[3].x,
             m * m * m * p[0].y + 3 * m * m * t * p[1].y + 3 * m * t * t * p[2].y + t * t * t * p[3].y);
  };

  function marker(id, color, size) {
    return `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="${size}" markerHeight="${size}" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="${color}"/></marker>`;
  }
  const STYLE = {
    chidao: { stroke: ORANGE, width: 2.2, marker: "mk-o" },
    dexuat: { stroke: ORANGE, width: 2, dash: "7 5", marker: "mk-o" },
    thammuu: { stroke: TM, width: 1.4, marker: "mk-b" },
    noi: { stroke: GREY, width: 1, marker: null }
  };

  // p: 2 điểm (thẳng) hoặc 4 điểm (cong)
  function line(p, kind, label, labelClass) {
    const s = STYLE[kind];
    const d = p.length === 2 ? `M${p[0].x},${p[0].y} L${p[1].x},${p[1].y}`
      : `M${p[0].x},${p[0].y} C${p[1].x},${p[1].y} ${p[2].x},${p[2].y} ${p[3].x},${p[3].y}`;
    const path = document.createElementNS(SVGNS, "path");
    path.setAttribute("d", d);
    path.setAttribute("stroke", s.stroke);
    path.setAttribute("stroke-width", s.width);
    if (s.dash) path.setAttribute("stroke-dasharray", s.dash);
    if (s.marker) path.setAttribute("marker-end", `url(#${s.marker})`);
    svg.appendChild(path);
    if (label) {
      const m = p.length === 2 ? P((p[0].x + p[1].x) / 2, (p[0].y + p[1].y) / 2) : bez(p, 0.5);
      const l = div("map-label" + (labelClass ? " " + labelClass : ""), label);
      l.style.left = m.x + "px";
      l.style.top = m.y + "px";
      labels.appendChild(l);
    }
  }

  function draw() {
    if (!map.offsetWidth) return; // thẻ đang ẩn
    svg.setAttribute("width", map.scrollWidth);
    svg.setAttribute("height", map.scrollHeight);
    svg.innerHTML = `<defs>${marker("mk-o", ORANGE, 7)}${marker("mk-b", TM, 6)}</defs>`;
    labels.innerHTML = "";

    const bch = box($("m-bch")), tctw = box($("m-tctw")), side = box($("m-side"));
    const tinh = box($("m-tinhuy")), btctu = box($("m-btctu")), note = box($("m-btctu-note"));
    const cp = box($("m-cp")), ubnd = box($("m-ubnd"));
    const rootEl = document.querySelector("#tree .lv1");
    const root = rootEl ? box(rootEl) : null;

    // các vụ, cục của Ban Tổ chức TW tham mưu lên Ban Chấp hành TW
    const cols = [...$("m-tctw-units").children];
    if ($("m-tctw-units").classList.contains("closed")) {
      // đang thu gọn: Ban Tổ chức TW tham mưu thẳng lên Ban Chấp hành
      line([P(tctw.x + tctw.w * 0.3, tctw.y), P(tctw.x + tctw.w * 0.3, bch.b + 1)], "thammuu");
    } else cols.forEach((c, i) => {
      const first = [...c.children].find((el) => !el.classList.contains("closed"));
      const top = box(first);
      const t = P(bch.x + bch.w * (0.12 + 0.76 * (cols.length > 1 ? i / (cols.length - 1) : 0.5)), bch.b + 1);
      line([P(top.cx, top.y), t], "thammuu");
    });
    // Ban Tổ chức TW → Đảng viên
    line([P(tctw.r, tctw.cy), P(side.x - 2, side.cy)], "thammuu", D.tctw.side.label, "blue");

    // Ban Chấp hành TW → Tỉnh ủy
    line([P(tinh.cx, bch.b), P(tinh.cx, tinh.y - 2)], "chidao");
    // Tỉnh ủy → Ban tổ chức tỉnh ủy → các bộ phận
    line([P(btctu.cx, tinh.b), P(btctu.cx, btctu.y - 2)], "chidao");
    line([P(btctu.r, btctu.cy), P(note.x, note.cy)], "noi");
    [...$("m-btctu-children").children].forEach((c) => {
      const b = box(c);
      line([P(btctu.cx, btctu.b), P(b.cx, b.y - 2)], "chidao");
    });
    // Ban tổ chức tỉnh ủy → Ban Tổ chức TW: đề nghị
    {
      const s = P(btctu.x, btctu.cy);
      const t = P(tctw.w > 600 ? tctw.x + tctw.w * 0.18 : tctw.x + 24, tctw.b + 2);
      const lx = Math.min(s.x, t.x) - 160;
      line([s, P(lx, s.y), P(lx, t.y + 120), t], "dexuat", D.tinhUy.deNghi);
    }

    // Ban Chấp hành TW → Bộ máy Chính phủ (vòng bên trái)
    {
      const left = Math.min(cp.x, tctw.x, bch.x) - 120;
      const s = P(bch.x, bch.cy), t = P(cp.x + 70, cp.y - 2);
      line([s, P(left, s.y), P(left + 20, t.y - 200), t], "chidao");
    }
    // Ban Chấp hành TW → UBND, HĐND (vòng bên phải)
    {
      const right = Math.max(ubnd.r, side.r, note.r, tctw.r) + 120;
      const s = P(bch.r, bch.cy), t = P(ubnd.cx + 40, ubnd.y - 2);
      line([s, P(right, s.y), P(right - 20, t.y - 200), t], "chidao");
    }
    // Bộ máy Chính phủ → UBND, HĐND
    {
      const s = P(cp.r - 70, cp.y), t = P(ubnd.x + 50, ubnd.y - 2);
      line([s, P(s.x + 30, s.y - 90), P(t.x - 30, t.y - 90), t], "chidao");
    }
    // Bộ Nội vụ → UBND, HĐND
    if (root) {
      const s = P(root.r, root.cy), t = P(ubnd.x - 2, ubnd.cy), dx = (t.x - s.x) * 0.4;
      line([s, P(s.x + dx, s.y), P(t.x - dx, t.y), t], "chidao", D.nhaNuoc.chiDao);
    }
  }

  // vẽ lại khi bố cục thay đổi (mở/thu cây, đổi cỡ cửa sổ, hiện thẻ)
  let pending = 0;
  const schedule = () => { if (!pending) pending = requestAnimationFrame(() => { pending = 0; draw(); }); };
  const ro = new ResizeObserver(schedule);
  ro.observe(map);
  ro.observe($("m-cp"));
  map.addEventListener("click", schedule);
  map.addEventListener("animationend", schedule);
  window.addEventListener("resize", schedule);
  schedule();
})();
