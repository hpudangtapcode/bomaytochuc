/* Thẻ "Phối hợp": bấm một ô để xem mũi tên phối hợp. Dữ liệu: phoi-hop-data.js */
(function () {
  "use strict";
  const D = window.PHOI_HOP;
  const U = D.units;
  const SVGNS = "http://www.w3.org/2000/svg";
  const $ = (id) => document.getElementById(id);
  const stage = $("ph-stage"), svg = $("ph-edges"), labels = $("ph-labels"), detail = $("ph-detail");

  const EXT = {
    dp: { name: "Địa phương / Cấp dưới", key: "diaPhuong", type: "dp" },
    ngang: { name: "Cơ quan bộ ngang hàng", key: "ngang", type: "ngang" }
  };
  const COLOR = { noibo: "#133A7C", dp: "#2E62AE", ngang: "#5B8ACB" }; // cùng dải xanh, đậm → nhạt
  const TITLE = { noibo: "Trong Bộ", dp: "Địa phương / Cấp dưới", ngang: "Cơ quan bộ ngang hàng" };

  // ---- Danh sách mũi tên
  const EDGES = [];
  Object.entries(U).forEach(([id, u]) => {
    (u.noiBo || []).forEach((r) => {
      // không ghi đơn vị cụ thể = dịch vụ chung, nối tới cả ô Bộ Nội vụ
      if (!r.to) { EDGES.push({ from: id, to: "bo", type: "noibo", text: r.text, chung: true }); return; }
      if (!U[r.to]) { console.warn("Không có đơn vị:", r.to); return; }
      EDGES.push({ from: id, to: r.to, type: "noibo", text: r.text });
    });
    if (u.diaPhuong) EDGES.push({ from: id, to: "dp", type: "dp", text: u.diaPhuong });
    if (u.ngang) EDGES.push({ from: id, to: "ngang", type: "ngang", text: u.ngang });
  });

  // ---- Chữ: *nghiêng* = nội dung bổ sung
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const rich = (s) => esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>");
  const nameOf = (id) => (U[id] ? U[id].name : id === "bo" ? "Tất cả đơn vị trong Bộ" : EXT[id].name);

  // ---- Dựng ô
  const EL = { dp: $("ph-dp"), ngang: $("ph-ngang") };
  D.groups.forEach((g) => {
    const col = document.createElement("div");
    const h = document.createElement("div");
    h.className = "ph-group-title";
    h.textContent = g.label;
    col.appendChild(h);
    g.units.forEach((id) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "ph-unit";
      b.dataset.id = id;
      b.textContent = U[id].name;
      const has = EDGES.some((e) => e.from === id || e.to === id) || (U[id].noiBo || []).length;
      if (!has) b.classList.add("nodata");
      col.appendChild(b);
      EL[id] = b;
    });
    $("ph-groups").appendChild(col);
  });
  Object.entries(EL).forEach(([id, el]) =>
    el.addEventListener("click", (e) => { e.stopPropagation(); select(sel === id ? null : id); }));
  EL.bo = stage.querySelector(".ph-bo-title"); // đích của mũi tên "chung", không bấm được
  $("ph-canvas").addEventListener("click", () => sel && select(null));
  $("ph-clear").addEventListener("click", () => select(null));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && $("view-phoi-hop").classList.contains("active")) select(null);
  });

  // ---- Trạng thái
  let sel = null;
  function select(id) {
    sel = id;
    render();
    renderDetail();
  }

  // ---- Hình học
  function box(el) {
    const s = stage.getBoundingClientRect(), r = el.getBoundingClientRect();
    const x = r.left - s.left, y = r.top - s.top;
    return { x, y, w: r.width, h: r.height, r: x + r.width, b: y + r.height, cx: x + r.width / 2, cy: y + r.height / 2 };
  }
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const bez = (p, t) => {
    const m = 1 - t;
    return {
      x: m * m * m * p[0].x + 3 * m * m * t * p[1].x + 3 * m * t * t * p[2].x + t * t * t * p[3].x,
      y: m * m * m * p[0].y + 3 * m * m * t * p[1].y + 3 * m * t * t * p[2].y + t * t * t * p[3].y
    };
  };

  // trả về 4 điểm điều khiển, vị trí nhãn và cách neo nhãn
  function geometry(e, boBox) {
    const A = box(EL[e.from]);
    if (e.type === "ngang") {
      const N = box(EL.ngang);
      const s = { x: A.r, y: A.cy }, t = { x: N.x - 2, y: clamp(A.cy, N.y + 18, N.b - 18) };
      const p = [s, { x: s.x + (t.x - s.x) * 0.55, y: s.y }, { x: t.x - 70, y: t.y }, t];
      return { p, lx: (boBox.r + N.x) / 2, ly: t.y - 8, anchor: "bottom" };
    }
    if (e.type === "dp") {
      const P = box(EL.dp);
      const s = { x: A.cx, y: A.b }, t = { x: clamp(A.cx, P.x + 20, P.r - 20), y: P.y - 2 };
      const p = [s, { x: s.x, y: s.y + (t.y - s.y) * 0.6 }, { x: t.x, y: t.y - 60 }, t];
      return { p, lx: t.x, ly: (boBox.b + P.y) / 2, anchor: "center" };
    }
    const B = box(EL[e.to]);
    let p;
    if (Math.abs(A.cx - B.cx) < 10) {
      // cùng cột: đi xuống vòng bên trái, đi lên vòng bên phải
      const down = B.cy > A.cy, k = 46 + Math.abs(B.cy - A.cy) * 0.12;
      const s = down ? { x: A.x, y: A.cy } : { x: A.r, y: A.cy };
      const t = down ? { x: B.x - 2, y: B.cy } : { x: B.r + 2, y: B.cy };
      const dx = down ? -k : k;
      p = [s, { x: s.x + dx, y: s.y }, { x: t.x + dx, y: t.y }, t];
    } else {
      const right = B.cx > A.cx, bend = right ? -28 : 28;
      const s = right ? { x: A.r, y: A.cy } : { x: A.x, y: A.cy };
      const t = right ? { x: B.x - 2, y: B.cy } : { x: B.r + 2, y: B.cy };
      const dx = (t.x - s.x) * 0.4;
      p = [s, { x: s.x + dx, y: s.y + bend }, { x: t.x - dx, y: t.y + bend }, t];
    }
    const m = bez(p, 0.5);
    return { p, lx: m.x, ly: m.y, anchor: "center" };
  }

  // ---- Vẽ
  function defs() {
    return `<defs>${Object.entries(COLOR).map(([k, c]) =>
      `<marker id="ah-${k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="${c}"/></marker>`).join("")}
      <marker id="ah-fan" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="${COLOR.noibo}"/></marker></defs>`;
  }

  let cleanup = [];
  function render() {
    cleanup.forEach((f) => f());
    cleanup = [];
    const W = stage.scrollWidth, H = stage.scrollHeight;
    svg.setAttribute("width", W); svg.setAttribute("height", H);
    svg.innerHTML = defs();
    labels.innerHTML = "";
    stage.classList.toggle("has-sel", !!sel);
    Object.values(EL).forEach((el) => el.classList.remove("sel", "rel"));
    if (!sel) return;

    const isExt = !!EXT[sel];
    const list = EDGES.filter((e) => e.from === sel || e.to === sel);
    EL[sel].classList.add("sel");
    list.forEach((e) => { EL[e.from].classList.add("rel"); EL[e.to].classList.add("rel"); });
    stage.querySelectorAll(".ph-group-title").forEach((t) => t.classList.remove("rel"));
    if (list.some((e) => e.chung)) {
      // dịch vụ chung: mọi đơn vị trong Bộ đều liên quan
      Object.keys(U).forEach((id) => EL[id].classList.add("rel"));
      stage.querySelectorAll(".ph-group-title").forEach((t) => t.classList.add("rel"));
    }

    const boBox = box(stage.querySelector(".ph-bo"));
    const placed = [];
    list.forEach((e) => {
      if (e.chung) { fanOut(e.from); }
      const g = e.chung ? null : geometry(e, boBox), c = COLOR[e.type];
      if (e.chung) {
        const lab = document.createElement("div");
        lab.className = "ph-label" + (isExt ? " hidden" : "");
        lab.style.setProperty("--c", c);
        lab.innerHTML = (isExt ? `<b>${esc(nameOf(e.from))}:</b> ` : "") + rich(e.text);
        labels.appendChild(lab);
        if (!isExt) placeFree(lab, e);
        return;
      }
      const d = `M${g.p[0].x},${g.p[0].y} C${g.p[1].x},${g.p[1].y} ${g.p[2].x},${g.p[2].y} ${g.p[3].x},${g.p[3].y}`;
      const path = document.createElementNS(SVGNS, "path");
      path.setAttribute("d", d);
      path.setAttribute("stroke", c);
      path.setAttribute("marker-end", `url(#ah-${e.type})`);
      svg.appendChild(path);

      const lab = document.createElement("div");
      lab.className = "ph-label" + (isExt ? " hidden" : "");
      lab.style.setProperty("--c", c);
      lab.innerHTML = (isExt ? `<b>${esc(nameOf(e.from))}:</b> ` : "") + rich(e.text);
      labels.appendChild(lab);
      place(lab, g);
      placed.push(lab);

      // với khối bên ngoài: rê chuột vào mũi tên / đơn vị để xem nội dung
      const hit = document.createElementNS(SVGNS, "path");
      hit.setAttribute("d", d);
      hit.setAttribute("class", "hit");
      svg.appendChild(hit);
      const on = () => { lab.classList.remove("hidden"); lab.classList.add("hot"); place(lab, g); };
      const off = () => { lab.classList.remove("hot"); if (isExt) lab.classList.add("hidden"); };
      hit.addEventListener("mouseenter", on); hit.addEventListener("mouseleave", off);
      const other = EL[e.from === sel ? e.to : e.from];
      other.addEventListener("mouseenter", on); other.addEventListener("mouseleave", off);
      cleanup.push(() => { other.removeEventListener("mouseenter", on); other.removeEventListener("mouseleave", off); });
    });
    if (!isExt) spread(placed);
  }

  // đẩy nhãn xuống dưới nếu chồng lên nhãn khác hoặc lên ô đang làm nổi
  function spread(list) {
    const obstacles = Object.values(EL).filter((el) => el.classList.contains("rel")).map(box);
    const r = (el) => ({ x: el.offsetLeft, y: el.offsetTop, r: el.offsetLeft + el.offsetWidth, b: el.offsetTop + el.offsetHeight });
    const hit = (a, b) => a.x < b.r && b.x < a.r && a.y < b.b && b.y < a.b;
    list.sort((a, b) => a.offsetTop - b.offsetTop);
    list.forEach((lab, i) => {
      for (let guard = 0; guard < 30; guard++) {
        const me = r(lab);
        const block = obstacles.concat(list.slice(0, i).map(r)).find((o) => hit(me, o));
        if (!block) break;
        lab.style.top = block.b + 6 + "px";
      }
    });
  }

  // dịch vụ chung: mũi tên mảnh từ đơn vị tới từng đơn vị khác trong Bộ
  function edgePoint(B, toward) {
    const dx = toward.x - B.cx, dy = toward.y - B.cy;
    const k = Math.min(Math.abs(B.w / 2 / (dx || 1e-9)), Math.abs(B.h / 2 / (dy || 1e-9)));
    return { x: B.cx + dx * k, y: B.cy + dy * k };
  }
  function fanOut(from) {
    const A = box(EL[from]);
    Object.keys(U).forEach((id) => {
      if (id === from) return;
      const B = box(EL[id]);
      const s = edgePoint(A, { x: B.cx, y: B.cy }), t = edgePoint(B, { x: A.cx, y: A.cy });
      const path = document.createElementNS(SVGNS, "path");
      path.setAttribute("d", `M${s.x},${s.y} L${t.x},${t.y}`);
      path.setAttribute("class", "fan");
      path.setAttribute("stroke", COLOR.noibo);
      path.setAttribute("marker-end", "url(#ah-fan)");
      svg.appendChild(path);
    });
  }

  // nhãn của dịch vụ chung: đặt vào khoảng trống gần nhất trong ô Bộ, nối bằng nét đứt
  function placeFree(lab, e) {
    const A = box(EL[e.from]), bo = box(stage.querySelector(".ph-bo"));
    const cols = [...$("ph-groups").children].map(box);
    lab.style.width = cols[0].w + "px";
    lab.style.maxWidth = "none";
    const h = lab.offsetHeight;
    const fit = cols.filter((c) => bo.b - 12 - (c.b + 12) >= h)
      .sort((a, b) => Math.abs(a.cx - A.cx) - Math.abs(b.cx - A.cx))[0];
    let x, y;
    if (fit) { x = fit.x; y = fit.b + 12; }
    else { lab.style.width = "220px"; x = clamp(A.cx - 110, 4, stage.scrollWidth - 224); y = bo.b + 12; }
    lab.style.left = x + "px";
    lab.style.top = y + "px";
    const L = { x, y, r: x + lab.offsetWidth, b: y + lab.offsetHeight };
    const lcx = (L.x + L.r) / 2, lcy = (L.y + L.b) / 2;
    const p1 = { x: clamp(lcx, A.x, A.r), y: clamp(lcy, A.y, A.b) };
    const p2 = { x: clamp(A.cx, L.x, L.r), y: clamp(A.cy, L.y, L.b) };
    const line = document.createElementNS(SVGNS, "path");
    line.setAttribute("d", `M${p1.x},${p1.y} L${p2.x},${p2.y}`);
    line.setAttribute("stroke", COLOR.noibo);
    line.setAttribute("stroke-dasharray", "4 4");
    line.setAttribute("style", "stroke-width:1.5");
    svg.appendChild(line);
    lab.insertAdjacentHTML("afterbegin", "<b>Chung cho cả Bộ:</b> ");
  }

  function place(lab, g) {
    const w = lab.offsetWidth, h = lab.offsetHeight;
    let x = g.lx - w / 2, y = g.anchor === "bottom" ? g.ly - h : g.ly - h / 2;
    x = clamp(x, 4, stage.scrollWidth - w - 4);
    y = clamp(y, 4, stage.scrollHeight - h - 4);
    lab.style.left = x + "px";
    lab.style.top = y + "px";
  }

  // ---- Khung chi tiết
  function renderDetail() {
    if (!sel) {
      detail.innerHTML = `<h2>Phối hợp trong nội bộ BNV</h2>
        <p class="muted">Bấm vào một đơn vị để xem đơn vị đó phối hợp với ai. Mũi tên chỉ tới đơn vị hoặc khối liên quan, kèm nội dung phối hợp; các ô không liên quan được làm mờ.</p>
        <p class="muted">Bấm vào khối <b>Địa phương / Cấp dưới</b> hoặc <b>Cơ quan bộ ngang hàng</b> để xem tất cả đơn vị có quan hệ với khối đó.</p>
        <p class="muted"><em>Chữ nghiêng</em>: nội dung bổ sung. Esc để bỏ chọn.</p>`;
      return;
    }
    if (EXT[sel]) {
      const x = EXT[sel], list = EDGES.filter((e) => e.to === sel);
      detail.innerHTML = `<h2>${esc(x.name)}</h2>
        <p class="muted">${list.length} đơn vị có quan hệ. Rê chuột vào mũi tên hoặc đơn vị để xem nội dung trên sơ đồ.</p>
        <ul>${list.map((e) => `<li><a href="#" class="link" data-go="${e.from}">${esc(nameOf(e.from))}</a>: ${rich(e.text)}</li>`).join("")}</ul>`;
    } else {
      const u = U[sel];
      const sec = (type, html) => `<h3 style="--c:${COLOR[type] || "#5B667A"}">${TITLE[type] || type}</h3>${html}`;
      const none = `<p class="muted">Không có.</p>`;
      const inner = (u.noiBo || []).map((r) =>
        `<li>${r.to ? `→ <a href="#" class="link" data-go="${r.to}">${esc(U[r.to].name)}</a>: ` : "→ Tất cả đơn vị trong Bộ: "}${rich(r.text)}</li>`);
      const incoming = EDGES.filter((e) => e.type === "noibo" && e.to === sel).map((e) =>
        `<li>← <a href="#" class="link" data-go="${e.from}">${esc(U[e.from].name)}</a>: ${rich(e.text)}</li>`);
      detail.innerHTML = `<h2>${esc(u.name)}</h2>` +
        sec("noibo", inner.length || incoming.length ? `<ul>${inner.join("")}${incoming.join("")}</ul>` : none) +
        sec("dp", u.diaPhuong ? `<p>${rich(u.diaPhuong)}</p>` : none) +
        sec("ngang", u.ngang ? `<p>${rich(u.ngang)}</p>` : none) +
        (u.capTren ? `<h3>Với cấp trên (không vẽ trên sơ đồ)</h3><p>${rich(u.capTren)}</p>` : "") +
        (u.note ? `<div class="note">${esc(u.note)}</div>` : "");
    }
    detail.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); select(b.dataset.go); }));
  }

  window.phoiHopShow = () => render();
  window.addEventListener("resize", () => { if (sel) render(); });
  renderDetail();
})();
