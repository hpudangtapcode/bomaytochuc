/* Sơ đồ cơ cấu tổ chức dạng cây (thẻ "Cơ cấu tổ chức"). Dữ liệu: co-cau-data.js */
(function () {
    "use strict";
    const root = window.CO_CAU;
    const treeEl = document.getElementById("tree");
    const canvas = document.getElementById("tree-canvas");

    // Ô đơn vị (tầng 3) có một ô "đối tượng hướng đến", bên trong là ô "công việc thực hiện".
    // Khi đóng: dưới ô hiện hai nút nhỏ để chọn xem phần nào.
    const isUnit = (item, level) => level === 3 && item.children && item.children.length === 1 && !item.children[0].items;

    function build(item, level) {
      const li = document.createElement("li");
      const unit = isUnit(item, level);
      const hasKids = item.children && item.children.length > 0;
      const node = document.createElement(hasKids ? "button" : "div");
      node.className = "node lv" + Math.min(level, 4) + (item.items ? " list" : "") + (unit ? " unit" : "");

      if (item.label) {
        const cap = document.createElement("span");
        cap.className = "cap";
        cap.textContent = item.label;
        node.appendChild(cap);
      }
      if (item.items) {
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
        if (unit) {
          const dt = item.children[0], cv = dt.children && dt.children[0];
          const co = cv && cv.children && cv.children[0] && cv.children[0].items ? cv.children[0] : null;
          node._unit = { dt, cv, co };
          const picks = document.createElement("div");
          picks.className = "picks";
          const pick = (label, mode) => {
            const b = document.createElement("button");
            b.type = "button";
            b.className = "pick";
            b.textContent = label;
            b.addEventListener("click", (e) => {
              e.stopPropagation();
              if (moved) return;
              setOpen(node, true, true, mode);
              requestAnimationFrame(() => reveal(ul));
            });
            picks.appendChild(b);
          };
          pick("Đối tượng hướng đến", "dt");
          if (cv) pick("Công việc thực hiện", "cv");
          if (co) pick("Cơ quan trực thuộc", "co");
          li.appendChild(picks);
        } else item.children.forEach((c) => ul.appendChild(build(c, level + 1)));
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

    const ulOf = (node) => node.parentNode.querySelector(":scope > ul");

    // mode (chỉ với ô đơn vị): "dt" = chỉ đối tượng, "cv" = chỉ công việc, bỏ trống = cả hai
    function setOpen(node, open, animate, mode) {
      const ul = ulOf(node);
      node.classList.toggle("open", open);
      node.setAttribute("aria-expanded", String(open));
      node.querySelector(".toggle").textContent = open ? "−" : "+";
      if (node._unit) {
        const { dt, cv, co } = node._unit;
        ul.innerHTML = "";
        if (open) {
          const DT = { name: dt.name, label: "Đối tượng hướng đến" };
          const CV = cv && { name: cv.name, label: "Công việc thực hiện" };
          const CO = co && { items: co.items, label: "Cơ quan trực thuộc" };
          let item;
          if (mode === "dt") item = DT;
          else if (mode === "cv") item = CV;
          else if (mode === "co") item = CO;
          else { // cả chuỗi: đối tượng → công việc → cơ quan trực thuộc
            if (CV && CO) CV.children = [CO];
            if (CV) DT.children = [CV];
            item = DT;
          }
          ul.appendChild(build(item, 4));
          if (!mode) ul.querySelectorAll("button.node").forEach((b) => setOpen(b, true));
        }
      }
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
      treeEl.querySelectorAll("button.node:not(.open)").forEach((b) => setOpen(b, true)); // ô mới dựng của đơn vị
    };
    document.getElementById("close-all").onclick = () => {
      treeEl.querySelectorAll("button.node").forEach((b) => b.isConnected && setOpen(b, b === rootBtn));
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
