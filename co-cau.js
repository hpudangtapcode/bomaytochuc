/* Sơ đồ cơ cấu tổ chức dạng cây (thẻ "Cơ cấu tổ chức"). Dữ liệu: co-cau-data.js */
(function () {
    "use strict";
    const root = window.CO_CAU;
    const treeEl = document.getElementById("tree");
    const canvas = document.getElementById("tree-canvas");

    // Ô đơn vị (tầng 3): dữ liệu theo chuỗi đối tượng → công việc → (danh sách) cơ quan trực thuộc,
    // gộp lại thành một ô duy nhất bên dưới.
    function combine(item) {
      const c = item.children;
      if (!c || c.length !== 1 || c[0].items) return null;
      const dt = c[0], cv = dt.children && dt.children[0];
      const co = cv && cv.children && cv.children[0] && cv.children[0].items;
      return { combo: true, dt: dt.name, cv: cv && cv.name, co };
    }

    function build(item, level) {
      const li = document.createElement("li");
      const kids = level === 3 && combine(item) ? [combine(item)] : item.children;
      const hasKids = kids && kids.length > 0;
      const node = document.createElement(hasKids ? "button" : "div");
      node.className = "node lv" + Math.min(level, 4) + (item.items ? " list" : "") + (item.combo ? " combo" : "");

      if (item.combo) {
        const row = (label, html) => {
          const d = document.createElement("div");
          d.className = "row";
          d.innerHTML = `<b>${label}:</b> `;
          if (typeof html === "string") d.appendChild(document.createTextNode(html));
          else d.appendChild(html);
          node.appendChild(d);
        };
        row("Đối tượng hướng đến", item.dt);
        if (item.cv) row("CNNV", item.cv);
        if (item.co) {
          const ul = document.createElement("ul");
          item.co.forEach((t) => { const i = document.createElement("li"); i.textContent = t; ul.appendChild(i); });
          row("Cơ quan trực thuộc", ul);
        }
      } else if (item.items) {
        const ul = document.createElement("ul");
        item.items.forEach((t) => { const i = document.createElement("li"); i.textContent = t; ul.appendChild(i); });
        node.appendChild(ul);
      } else {
        const span = document.createElement("span");
        span.textContent = item.name;
        node.appendChild(span);
      }
      li.appendChild(node);

      if (hasKids) {
        node.type = "button";
        const tg = document.createElement("span");
        tg.className = "toggle";
        tg.setAttribute("aria-hidden", "true");
        node.appendChild(tg);

        const ul = document.createElement("ul");
        ul.className = "closed";
        kids.forEach((c) => ul.appendChild(build(c, level + 1)));
        li.appendChild(ul);
        setOpen(node, false);

        node.addEventListener("click", () => {
          if (moved) return;
          const open = !node.classList.contains("open");
          if (open) {
            setOpen(node, true, true);
            requestAnimationFrame(() => reveal(ul));
          } else {
            // thu gọn cả các tầng con bên dưới
            li.querySelectorAll("button.node").forEach((b) => setOpen(b, false));
          }
        });
      }
      return li;
    }

    function setOpen(node, open, animate) {
      const ul = node.parentNode.querySelector(":scope > ul");
      node.classList.toggle("open", open);
      node.setAttribute("aria-expanded", String(open));
      node.querySelector(".toggle").textContent = open ? "−" : "+";
      ul.classList.toggle("closed", !open);
      ul.classList.remove("opening");
      if (open && animate) { void ul.offsetWidth; ul.classList.add("opening"); }
    }

    // cuộn để thấy tầng vừa mở
    function reveal(ul) {
      const c = canvas.getBoundingClientRect(), r = ul.getBoundingClientRect();
      let dx = 0, dy = 0;
      if (r.right > c.right - 16) dx = Math.min(r.right - c.right + 16, r.left - c.left - 16);
      else if (r.left < c.left + 16) dx = r.left - c.left - 16;
      if (r.bottom > c.bottom - 16) dy = Math.min(r.bottom - c.bottom + 16, r.top - c.top - 80);
      if (dx || dy) canvas.scrollBy({ left: dx, top: dy, behavior: "smooth" });
    }

    const top = document.createElement("ul");
    top.appendChild(build(root, 1));
    treeEl.appendChild(top);
    // mở sẵn tầng nhóm dưới "Bộ Nội vụ"
    const rootBtn = treeEl.querySelector(".lv1");
    setOpen(rootBtn, true);
    // căn giữa khi thẻ được hiện lần đầu
    let centered = false;
    window.coCauShow = () => {
      if (centered || !canvas.clientWidth) return;
      canvas.scrollLeft = (canvas.scrollWidth - canvas.clientWidth) / 2;
      centered = true;
    };

    document.getElementById("open-all").onclick = () => {
      treeEl.querySelectorAll("button.node").forEach((b) => setOpen(b, true));
    };
    document.getElementById("close-all").onclick = () => {
      treeEl.querySelectorAll("button.node").forEach((b) => setOpen(b, b === rootBtn));
      canvas.scrollTo({ left: (canvas.scrollWidth - canvas.clientWidth) / 2, top: 0, behavior: "smooth" });
    };

    // kéo để di chuyển
    let drag = null, moved = false;
    window.coCauMoved = () => moved; // khối bao quanh dùng để bỏ qua cú bấm sau khi kéo
    canvas.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      drag = { x: e.clientX, y: e.clientY, l: canvas.scrollLeft, t: canvas.scrollTop };
      moved = false;
    });
    window.addEventListener("pointermove", (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!moved && Math.abs(dx) + Math.abs(dy) < 5) return;
      moved = true;
      canvas.classList.add("dragging");
      canvas.scrollLeft = drag.l - dx;
      canvas.scrollTop = drag.t - dy;
    });
    window.addEventListener("pointerup", () => {
      drag = null;
      canvas.classList.remove("dragging");
      setTimeout(() => (moved = false), 0);
    });
  })();
