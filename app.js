(function () {
  "use strict";
  const D = window.DATA;
  const SVGNS = "http://www.w3.org/2000/svg";
  const $ = (s) => document.querySelector(s);

  const T = Object.fromEntries(D.types.map((t) => [t.id, t]));
  const G = Object.fromEntries(D.groups.map((g) => [g.id, g]));
  const N = Object.fromEntries(D.nodes.map((n) => [n.id, n]));

  // ---- Chuẩn hóa dữ liệu quan hệ
  const valid = (r) => {
    const ok = N[r.from] && N[r.to] && T[r.type];
    if (!ok) console.warn("Bỏ qua quan hệ không hợp lệ:", r);
    return ok;
  };
  let RELS = D.relations.filter(valid);
  const unitGroups = D.groups.filter((g) => g.tier === "bo" && g.id !== "bo").map((g) => g.id);
  D.nodes.filter((n) => unitGroups.includes(n.group)).forEach((n) => {
    if (!RELS.some((r) => r.from === "ldb" && r.to === n.id)) {
      RELS.push({ from: "ldb", to: n.id, type: "chidao", note: "Giao nhiệm vụ; đơn vị tham mưu, báo cáo kết quả", auto: true });
    }
  });
  D.processes.forEach((p) => (p.steps = p.steps.filter(valid)));

  // ---- Trạng thái
  const S = {
    selected: null, hover: null, group: null, showAll: false,
    types: new Set(D.types.map((t) => t.id)),
    proc: null, step: 0, timer: null,
  };
  const EL = {};

  // ---- Dựng nút
  function makeNode(n) {
    const d = document.createElement("div");
    d.className = "node g-" + n.group;
    d.textContent = n.name;
    d.dataset.id = n.id;
    d.addEventListener("click", (e) => { e.stopPropagation(); select(S.selected === n.id ? null : n.id); });
    d.addEventListener("mouseenter", () => { S.hover = n.id; if (!S.selected && !S.proc && !S.group) render(); });
    d.addEventListener("mouseleave", () => { S.hover = null; if (!S.selected && !S.proc && !S.group) render(); });
    EL[n.id] = d;
    return d;
  }
  function build() {
    $("#title").textContent = D.title;
    document.title = D.title;
    D.nodes.filter((n) => G[n.group].tier === "bottom").forEach((n) => $("#row-bottom").appendChild(makeNode(n)));
    D.nodes.filter((n) => n.group === "bo").forEach((n) => $("#row-ldb").appendChild(makeNode(n)));
    const groupsEl = $("#groups");
    groupsEl.style.gridTemplateColumns = `repeat(${unitGroups.length}, 1fr)`;
    unitGroups.forEach((gid) => {
      const col = document.createElement("div");
      col.className = "group-col";
      const h = document.createElement("div");
      h.className = "group-title";
      h.textContent = G[gid].label;
      h.title = "Xem toàn bộ quan hệ của nhóm";
      h.addEventListener("click", (e) => { e.stopPropagation(); selectGroup(S.group === gid ? null : gid); });
      col.appendChild(h);
      D.nodes.filter((n) => n.group === gid).forEach((n) => col.appendChild(makeNode(n)));
      groupsEl.appendChild(col);
    });

    // chú giải + bộ lọc
    const lg = $("#legend");
    D.types.forEach((t) => {
      const lab = document.createElement("label");
      lab.innerHTML = `<input type="checkbox" checked data-t="${t.id}">
        <svg width="44" height="10"><line x1="2" y1="5" x2="40" y2="5" stroke="${t.color}" stroke-width="2.5" stroke-dasharray="${t.dash}"/></svg>
        <span>${t.label}</span>`;
      lab.querySelector("input").addEventListener("change", (e) => {
        e.target.checked ? S.types.add(t.id) : S.types.delete(t.id);
        render();
      });
      lg.appendChild(lab);
    });

    // quy trình
    const sel = $("#process");
    sel.innerHTML = `<option value="">— Chọn quy trình để chạy từng bước —</option>` +
      D.processes.map((p) => `<option value="${p.id}">${p.name}</option>`).join("");
    sel.addEventListener("change", () => startProcess(sel.value || null));
    $("#p-prev").onclick = () => goStep(S.step - 1);
    $("#p-next").onclick = () => goStep(S.step + 1);
    $("#p-play").onclick = togglePlay;

    $("#btn-all").onclick = () => { S.showAll = !S.showAll; render(); };
    $("#btn-clear").onclick = clearAll;

    // tìm kiếm
    const inp = $("#search"), out = $("#search-results");
    const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
    inp.addEventListener("input", () => {
      const q = norm(inp.value.trim());
      out.innerHTML = "";
      if (!q) return;
      D.nodes.filter((n) => norm(n.name).includes(q)).slice(0, 8).forEach((n) => {
        const b = document.createElement("button");
        b.textContent = n.name;
        b.onclick = () => { select(n.id); inp.value = ""; out.innerHTML = ""; };
        out.appendChild(b);
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT") return;
      if (e.key === "Escape") clearAll();
      if (S.proc && e.key === "ArrowRight") goStep(S.step + 1);
      if (S.proc && e.key === "ArrowLeft") goStep(S.step - 1);
    });
    $(".canvas-wrap").addEventListener("click", (e) => { if (e.target.closest(".node")) return; if (S.selected || S.group) { S.selected = null; S.group = null; render(); } });
    window.addEventListener("resize", render);
  }

  // ---- Hành động
  function stopPlay() { clearInterval(S.timer); S.timer = null; $("#p-play").textContent = "▶ Tự chạy"; }
  function select(id) {
    if (S.proc) startProcess(null);
    S.selected = id; S.group = null; S.showAll = false;
    history.replaceState(null, "", id ? "#" + id : location.pathname);
    render();
  }
  function selectGroup(gid) {
    if (S.proc) startProcess(null);
    S.group = gid; S.selected = null; S.showAll = false;
    render();
  }
  function clearAll() {
    S.selected = null; S.group = null; S.showAll = false;
    if (S.proc) startProcess(null);
    history.replaceState(null, "", location.pathname);
    render();
  }
  function startProcess(pid) {
    stopPlay();
    S.proc = pid ? D.processes.find((p) => p.id === pid) : null;
    S.step = 0; S.selected = null; S.group = null; S.showAll = false;
    $("#process").value = pid || "";
    $("#process-box").classList.toggle("hidden", !S.proc);
    render();
  }
  function goStep(i) {
    if (!S.proc) return;
    const n = S.proc.steps.length;
    S.step = Math.max(0, Math.min(n - 1, i));
    render();
  }
  function togglePlay() {
    if (S.timer) return stopPlay();
    if (S.step >= S.proc.steps.length - 1) S.step = -1;
    $("#p-play").textContent = "❚❚ Dừng";
    const tick = () => {
      if (S.step >= S.proc.steps.length - 1) return stopPlay();
      goStep(S.step + 1);
    };
    tick();
    S.timer = setInterval(tick, 2200);
  }

  // ---- Tính toán hình học
  function box(id, base) {
    const r = EL[id].getBoundingClientRect();
    return { x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height, cx: r.left - base.left + r.width / 2, cy: r.top - base.top + r.height / 2 };
  }
  function edgePoint(b, tx, ty, gap) {
    const dx = tx - b.cx, dy = ty - b.cy;
    if (!dx && !dy) return { x: b.cx, y: b.cy };
    const s = Math.min((b.w / 2 + gap) / Math.abs(dx || 1e-9), (b.h / 2 + gap) / Math.abs(dy || 1e-9));
    return { x: b.cx + dx * s, y: b.cy + dy * s };
  }
  function curve(a, b, bend) {
    const p1 = edgePoint(a, b.cx, b.cy, 3), p2 = edgePoint(b, a.cx, a.cy, 6);
    const mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;
    const dx = p2.x - p1.x, dy = p2.y - p1.y, len = Math.hypot(dx, dy) || 1;
    const k = bend * Math.min(len, 400);
    const cx = mx - (dy / len) * k, cy = my + (dx / len) * k;
    // điểm giữa đường cong (t = 0.5) để gắn số bước
    const midX = 0.25 * p1.x + 0.5 * cx + 0.25 * p2.x, midY = 0.25 * p1.y + 0.5 * cy + 0.25 * p2.y;
    return { d: `M${p1.x},${p1.y} Q${cx},${cy} ${p2.x},${p2.y}`, midX, midY };
  }

  function el(tag, attrs, parent) {
    const e = document.createElementNS(SVGNS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  // ---- Vẽ
  function edgesToShow() {
    if (S.proc) {
      return S.proc.steps.slice(0, S.step + 1).map((r, i) => ({ ...r, cls: i === S.step ? "flow" : "past", num: i + 1 }));
    }
    const focus = S.selected || S.hover;
    if (S.group) {
      const ids = new Set(D.nodes.filter((n) => n.group === S.group).map((n) => n.id));
      return RELS.filter((r) => S.types.has(r.type) && (ids.has(r.from) || ids.has(r.to)) && !(r.auto)).map((r) => ({ ...r }));
    }
    if (focus) {
      return RELS.filter((r) => S.types.has(r.type) && (r.from === focus || r.to === focus)).map((r) => ({ ...r, cls: S.selected ? "" : "faint" }));
    }
    if (S.showAll) return RELS.filter((r) => S.types.has(r.type) && !r.auto).map((r) => ({ ...r, cls: "faint" }));
    return [];
  }

  function drawEdges(list) {
    const stage = $("#stage"), svg = $("#edges");
    svg.innerHTML = "";
    svg.setAttribute("width", stage.scrollWidth);
    svg.setAttribute("height", stage.scrollHeight);
    const defs = el("defs", {}, svg);
    D.types.forEach((t) => {
      const m = el("marker", { id: "m-" + t.id, viewBox: "0 0 10 10", refX: "8", refY: "5", markerWidth: "7", markerHeight: "7", orient: "auto-start-reverse" }, defs);
      el("path", { d: "M0,1 L9,5 L0,9 z", fill: t.color }, m);
    });
    const base = stage.getBoundingClientRect();

    // tách các đường trùng cặp để không chồng lên nhau
    const count = {}, idx = {};
    list.forEach((r) => { const k = [r.from, r.to].sort().join("|"); count[k] = (count[k] || 0) + 1; });
    const nums = [];
    list.forEach((r) => {
      const t = T[r.type];
      const k = [r.from, r.to].sort().join("|");
      const i = (idx[k] = (idx[k] || 0) + 1) - 1;
      // cùng hệ số cong: hai chiều ngược nhau tự cong về hai phía khác nhau
      const bend = 0.14 + 0.1 * i;
      const c = curve(box(r.from, base), box(r.to, base), bend);
      const attrs = { d: c.d, class: "e " + (r.cls || ""), stroke: t.color, "marker-end": `url(#m-${t.id})` };
      if (t.dash && r.cls !== "flow") attrs["stroke-dasharray"] = t.dash;
      if (t.both) attrs["marker-start"] = `url(#m-${t.id})`;
      el("path", attrs, svg);
      const hit = el("path", { d: c.d, class: "hit" }, svg);
      hit.addEventListener("mousemove", (e) => tip(e, r));
      hit.addEventListener("mouseleave", () => $("#tooltip").classList.add("hidden"));
      if (r.num) nums.push({ x: c.midX, y: c.midY, n: r.num, color: t.color });
    });
    nums.forEach((p) => {
      const g = el("g", { class: "stepnum" }, svg);
      el("circle", { cx: p.x, cy: p.y, r: 11, fill: p.color }, g);
      el("text", { x: p.x, y: p.y }, g).textContent = p.n;
    });
  }

  function tip(e, r) {
    const t = $("#tooltip");
    t.innerHTML = `<b>${N[r.from].name} → ${N[r.to].name}</b><br>${T[r.type].label}${r.note ? ": " + r.note : ""}`;
    t.style.left = e.clientX + 14 + "px";
    t.style.top = e.clientY + 14 + "px";
    t.classList.remove("hidden");
  }

  function styleNodes(list) {
    const active = new Set();
    let focus = null;
    if (S.proc) {
      list.forEach((r) => { active.add(r.from); active.add(r.to); });
      const cur = S.proc.steps[S.step];
      focus = cur ? [cur.from, cur.to] : [];
    } else if (S.group) {
      D.nodes.filter((n) => n.group === S.group).forEach((n) => active.add(n.id));
      list.forEach((r) => { active.add(r.from); active.add(r.to); });
      focus = D.nodes.filter((n) => n.group === S.group).map((n) => n.id);
    } else if (S.selected || S.hover) {
      const f = S.selected || S.hover;
      active.add(f);
      list.forEach((r) => { active.add(r.from); active.add(r.to); });
      focus = [f];
    }
    D.nodes.forEach((n) => {
      const e = EL[n.id];
      const dimOn = focus !== null && (S.selected || S.proc || S.group);
      e.classList.toggle("dim", !!dimOn && !active.has(n.id));
      e.classList.toggle("selected", !!focus && focus.includes(n.id) && !!(S.selected || S.proc || S.group));
      e.classList.toggle("related", !!dimOn && active.has(n.id) && !focus.includes(n.id));
    });
  }

  function relItem(r, otherId) {
    const t = T[r.type];
    const b = document.createElement("button");
    b.className = "rel";
    b.style.setProperty("--c", t.color);
    b.innerHTML = `<div class="t">${t.label}</div><div class="n">${N[otherId].name}</div>${r.note ? `<div class="d">${r.note}</div>` : ""}`;
    b.onclick = () => select(otherId);
    return b;
  }

  function renderDetail() {
    const box = $("#detail");
    box.innerHTML = "";
    if (S.proc) {
      const cur = S.proc.steps[S.step];
      box.innerHTML = `<h2>${S.proc.name}</h2><div class="grp">Bước ${S.step + 1}/${S.proc.steps.length}</div>
        <div class="empty"><b>${N[cur.from].name} → ${N[cur.to].name}</b><br>${cur.note || ""}</div>`;
      return;
    }
    if (S.group) {
      const ids = D.nodes.filter((n) => n.group === S.group);
      box.innerHTML = `<h2>${G[S.group].label}</h2><div class="grp">${ids.length} đơn vị · bấm từng đơn vị để xem chi tiết</div>`;
      return;
    }
    const id = S.selected;
    if (!id) {
      box.innerHTML = `<div class="empty">Chọn một đơn vị trên sơ đồ hoặc tìm theo tên để xem đơn vị đó nhận từ ai, chuyển cho ai và phối hợp với ai.<br><br>Bấm vào tiêu đề nhóm để xem quan hệ của cả nhóm. Rê chuột vào đường nối để xem nội dung.</div>`;
      return;
    }
    const n = N[id];
    box.innerHTML = `<h2>${n.name}</h2><div class="grp">${G[n.group].label}</div>`;
    const mine = RELS.filter((r) => S.types.has(r.type) && (r.from === id || r.to === id));
    const sections = [
      ["Nhận từ", mine.filter((r) => r.to === id && !T[r.type].both), (r) => r.from],
      ["Chuyển cho", mine.filter((r) => r.from === id && !T[r.type].both), (r) => r.to],
      ["Phối hợp với", mine.filter((r) => T[r.type].both), (r) => (r.from === id ? r.to : r.from)],
    ];
    let any = false;
    sections.forEach(([title, arr, other]) => {
      if (!arr.length) return;
      any = true;
      const h = document.createElement("h3");
      h.textContent = `${title} (${arr.length})`;
      box.appendChild(h);
      arr.forEach((r) => box.appendChild(relItem(r, other(r))));
    });
    if (!any) box.insertAdjacentHTML("beforeend", `<div class="empty">Chưa có quan hệ nào được khai báo (hoặc đang bị ẩn bởi bộ lọc).</div>`);
  }

  function renderSteps() {
    const ol = $("#steps");
    ol.innerHTML = "";
    if (!S.proc) return;
    S.proc.steps.forEach((r, i) => {
      const li = document.createElement("li");
      li.className = i === S.step ? "cur" : "";
      li.innerHTML = `<span class="who">${N[r.from].name} → ${N[r.to].name}</span><br><span class="what">${r.note || T[r.type].label}</span>`;
      li.onclick = () => { stopPlay(); goStep(i); };
      ol.appendChild(li);
    });
  }

  function render() {
    const list = edgesToShow();
    styleNodes(list);
    drawEdges(list);
    renderDetail();
    renderSteps();
    $("#btn-all").classList.toggle("on", S.showAll);
  }

  build();
  const start = location.hash.slice(1);
  if (N[start]) S.selected = start;
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(render);
  render();
})();
