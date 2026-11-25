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
  $("m-snv").textContent = D.nhaNuoc.soNoiVu;

  // ---- Vẽ mũi tên
  function box(el) {
    const m = map.getBoundingClientRect(), r = el.getBoundingClientRect(), z = window.zoomOf ? window.zoomOf(map) : 1;
    const x = (r.left - m.left) / z, y = (r.top - m.top) / z, w = r.width / z, h = r.height / z;
    return { x, y, w, h, r: x + w, b: y + h, cx: x + w / 2, cy: y + h / 2 };
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
    noi: { stroke: GREY, width: 1, marker: null },
    khong: { stroke: "#4B5563", width: 1.2, dash: "4 4", marker: null }
  };

  // p: 2 điểm (thẳng) hoặc 4 điểm (cong)
  function line(p, kind, label, labelClass) {
    const s = STYLE[kind];
    const d = p.d ? p.d : p.length === 2 ? `M${p[0].x},${p[0].y} L${p[1].x},${p[1].y}`
      : `M${p[0].x},${p[0].y} C${p[1].x},${p[1].y} ${p[2].x},${p[2].y} ${p[3].x},${p[3].y}`;
    const path = document.createElementNS(SVGNS, "path");
    path.setAttribute("d", d);
    path.setAttribute("stroke", s.stroke);
    path.setAttribute("stroke-width", s.width);
    if (s.dash) path.setAttribute("stroke-dasharray", s.dash);
    if (s.marker) path.setAttribute("marker-end", `url(#${s.marker})`);
    svg.appendChild(path);
    if (label) {
      const m = p.mid ? p.mid : p.length === 2 ? P((p[0].x + p[1].x) / 2, (p[0].y + p[1].y) / 2) : bez(p, 0.5);
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
    const cp = box($("m-cp")), ubnd = box($("m-ubnd")), snv = box($("m-snv"));
    const dp = box($("m-dp")), pcTw = box($("m-pc-tw"));
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

    // Ban Chấp hành TW → Tỉnh ủy (đi dọc mép trái, vào cạnh trái Tỉnh ủy)
    {
      const g = dp.x - 30, s = P(bch.x, bch.cy + 8), t = P(tinh.x - 2, tinh.cy);
      line({ d: `M${s.x},${s.y} C${g},${s.y} ${g},${s.y} ${g},${s.y + 120} L${g},${t.y - 40} C${g},${t.y} ${g},${t.y} ${t.x},${t.y}` }, "chidao");
    }
    // Ban tổ chức tỉnh ủy → Tỉnh ủy; Ban tổ chức tỉnh ủy → các bộ phận
    line([P(tinh.cx, btctu.y), P(tinh.cx, tinh.b + 2)], "chidao");
    line([P(btctu.r, btctu.cy), P(note.x, note.cy)], "noi");
    [...$("m-btctu-children").children].forEach((c) => {
      const b = box(c);
      line([P(btctu.cx, btctu.b), P(b.cx, b.y - 2)], "chidao");
    });
    // Ban tổ chức tỉnh ủy → Ban Tổ chức TW: đề nghị
    {
      // ra bên phải một đoạn ngắn rồi đi thẳng dọc lên; chữ xoay dọc, nằm sát đường
      const x = btctu.r + 34, s = P(btctu.r, btctu.cy);
      const under = x >= tctw.x + 20; // thanh Ban TCTW có nằm ngay phía trên không (khi thu gọn thì hẹp lại)
      const top = under ? tctw.b + 2 : tctw.cy;
      const tail = under ? `L${x},${top}` : `L${x},${top + 8} Q${x},${top} ${x + 8},${top} L${tctw.x - 2},${top}`;
      line({ d: `M${s.x},${s.y} L${x - 8},${s.y} Q${x},${s.y} ${x},${s.y - 8} ${tail}` }, "dexuat");
      const l = div("map-label vert", D.tinhUy.deNghi);
      l.style.left = x + 11 + "px";
      l.style.top = (top + s.y) / 2 + "px";
      labels.appendChild(l);
    }
    // Tỉnh ủy → UBND, HĐND
    {
      const s = P(tinh.r, tinh.cy), t = P(ubnd.x - 2, ubnd.cy), dx = (t.x - s.x) * 0.45;
      line([s, P(s.x + dx, s.y - 30), P(t.x - dx, t.y), t], "chidao");
    }

    // Ban Chấp hành TW → Bộ máy Chính phủ (dọc mép trái, ngoài khung Địa phương)
    {
      const g = dp.x - 70, s = P(bch.x, bch.cy - 8), t = P(cp.x + 70, cp.y - 2);
      line({ d: `M${s.x},${s.y} C${g},${s.y} ${g},${s.y} ${g},${s.y + 120} L${g},${t.y - 120} C${g},${t.y - 50} ${t.x},${t.y - 70} ${t.x},${t.y}` }, "chidao");
    }
    // Ban Chấp hành TW → UBND, HĐND (dọc mép phải, vào cạnh phải UBND)
    {
      const g = Math.max(dp.r, side.r, tctw.r) + 50, s = P(bch.r, bch.cy), t = P(ubnd.r + 2, ubnd.cy);
      line({ d: `M${s.x},${s.y} C${g},${s.y} ${g},${s.y} ${g},${s.y + 120} L${g},${t.y - 40} C${g},${t.y} ${g},${t.y} ${t.x},${t.y}` }, "chidao");
    }
    // UBND, HĐND → Sở Nội vụ
    line([P(ubnd.cx, ubnd.b), P(snv.cx, snv.y - 2)], "chidao", D.nhaNuoc.ubndToSnv, "side");

    if (root) {
      // Bộ Nội vụ → UBND, HĐND và → Sở Nội vụ (đường tới UBND đi vòng ngoài, không cắt nhau)
      {
        const s = P(root.r - 130, root.y), t = P(ubnd.x - 2, ubnd.cy);
        const p = [s, P(s.x, s.y - 140), P(t.x - 170, t.y), t];
        p.mid = bez(p, 0.22); // nhãn đặt thấp, tránh ô Văn phòng của Ban tổ chức tỉnh ủy
        line(p, "chidao", D.nhaNuoc.bnvToUbnd);
      }
      {
        const s = P(root.r - 50, root.y), t = P(snv.x - 2, snv.cy);
        line([s, P(s.x, s.y - 70), P(t.x - 70, t.y), t], "chidao", D.nhaNuoc.bnvToSnv);
      }
      // Ban Tổ chức TW ✕ Bộ Nội vụ
      {
        // đường thẳng dọc; dấu ✕ đặt ở khoảng trống giữa Ban TCTW và khung Địa phương
        const X = root.cx + root.w * 0.15, s = P(X, tctw.b), t = P(X, root.y);
        line([s, t], "khong");
        const x = div("map-x", "✕");
        x.title = D.nhaNuoc.khongTrucTiep;
        x.style.left = X + "px";
        x.style.top = (tctw.b + dp.y) / 2 + "px";
        labels.appendChild(x);
      }
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
