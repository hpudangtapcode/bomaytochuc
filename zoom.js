/* Phóng to / thu nhỏ sơ đồ: nút +/−, chụm hai ngón trên điện thoại, Ctrl + lăn chuột trên máy tính.
 * window.makeZoom({ canvas, content, initial }) → { set, fit, scale }
 *  - canvas: khung cuộn; content: phần sơ đồ được phóng to.
 *  - Các file vẽ mũi tên đo vị trí bằng getBoundingClientRect nên phải chia cho window.zoomOf(el). */
(function () {
  "use strict";
  const MIN = 0.2, MAX = 2;
  const clamp = (v) => Math.max(MIN, Math.min(MAX, v));

  // tỉ lệ đang phóng của một phần tử (1 nếu không phóng)
  window.zoomOf = (el) => (el.offsetWidth ? el.getBoundingClientRect().width / el.offsetWidth : 1) || 1;

  window.makeZoom = function ({ canvas, content, initial }) {
    // khung bọc có kích thước bằng sơ đồ sau khi phóng, để thanh cuộn đúng
    const sizer = document.createElement("div");
    sizer.className = "zoom-sizer";
    content.parentNode.insertBefore(sizer, content);
    sizer.appendChild(content);
    content.style.transformOrigin = "0 0";
    let s = 1;

    function apply() {
      content.style.transform = s === 1 ? "" : `scale(${s})`;
      sizer.style.width = content.offsetWidth * s + "px";
      sizer.style.height = content.offsetHeight * s + "px";
    }
    new ResizeObserver(apply).observe(content);

    // phóng quanh một điểm trên màn hình (giữ điểm đó đứng yên)
    function zoomAt(next, x, y) {
      next = clamp(next);
      const r = sizer.getBoundingClientRect();
      const px = (x - r.left) / s, py = (y - r.top) / s;
      s = next;
      apply();
      const r2 = sizer.getBoundingClientRect();
      canvas.scrollLeft += r2.left + px * s - x;
      canvas.scrollTop += r2.top + py * s - y;
    }
    const center = () => {
      const c = canvas.getBoundingClientRect();
      return [c.left + c.width / 2, c.top + Math.min(c.height, 600) / 2];
    };
    const set = (v) => zoomAt(v, ...center());
    const fit = () => {
      set(canvas.clientWidth / content.offsetWidth);
      canvas.scrollLeft = (canvas.scrollWidth - canvas.clientWidth) / 2;
    };

    // chụm hai ngón
    let pinch = null;
    const mid = (t) => [(t[0].clientX + t[1].clientX) / 2, (t[0].clientY + t[1].clientY) / 2];
    const dist = (t) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    canvas.addEventListener("touchstart", (e) => {
      if (e.touches.length === 2) pinch = { d: dist(e.touches), s, m: mid(e.touches) };
    }, { passive: true });
    canvas.addEventListener("touchmove", (e) => {
      if (!pinch || e.touches.length !== 2) return;
      e.preventDefault();
      const m = mid(e.touches);
      zoomAt(pinch.s * dist(e.touches) / pinch.d, m[0], m[1]);
      // kéo hai ngón để di chuyển
      canvas.scrollLeft -= m[0] - pinch.m[0];
      canvas.scrollTop -= m[1] - pinch.m[1];
      pinch.m = m;
    }, { passive: false });
    canvas.addEventListener("touchend", (e) => { if (e.touches.length < 2) pinch = null; });
    // Safari: chặn phóng cả trang khi chụm trên sơ đồ
    canvas.addEventListener("gesturestart", (e) => e.preventDefault());
    // Ctrl + lăn chuột / chụm trên bàn di chuột
    canvas.addEventListener("wheel", (e) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      zoomAt(s * Math.exp(-e.deltaY * 0.01), e.clientX, e.clientY);
    }, { passive: false });

    if (initial && initial !== 1) { s = clamp(initial); }
    apply();
    return { set, fit, zoomAt, refresh: apply, scale: () => s };
  };

  // nút +, −, vừa khung trong thanh công cụ
  window.zoomButtons = function (tools, z) {
    const mk = (label, title, fn) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "btn zoom-btn";
      b.textContent = label;
      b.title = title;
      b.setAttribute("aria-label", title);
      b.addEventListener("click", fn);
      tools.appendChild(b);
    };
    mk("−", "Thu nhỏ", () => z.set(z.scale() / 1.25));
    mk("+", "Phóng to", () => z.set(z.scale() * 1.25));
    mk("⤢", "Vừa màn hình", () => z.fit());
  };
})();
