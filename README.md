# Bộ máy tổ chức - Bộ Nội vụ

Trang web tĩnh gồm hai thẻ:

- **Cơ cấu tổ chức**: sơ đồ cây, bấm vào từng ô để mở tầng bên dưới.
- **Phối hợp**: bấm vào một đơn vị để thấy mũi tên chỉ tới các đơn vị khác trong Bộ, tới khối *Địa phương / Cấp dưới* và khối *Cơ quan bộ ngang hàng*, kèm nội dung phối hợp; các ô không liên quan được làm mờ. Bấm vào một trong hai khối để xem mọi đơn vị có quan hệ với khối đó.

Mở thẳng một thẻ bằng đường dẫn `.../#co-cau` hoặc `.../#phoi-hop`.

## Cấu trúc

| File | Nội dung |
|---|---|
| `index.html` | Khung trang, hai thẻ |
| `site.css` | Giao diện |
| `co-cau-data.js` | **Dữ liệu sơ đồ cây** |
| `co-cau.js` | Vẽ sơ đồ cây |
| `phoi-hop-data.js` | **Dữ liệu phối hợp** (lấy từ "Bảng phối hợp các đơn vị thuộc Bộ Nội vụ") |
| `phoi-hop.js` | Vẽ mũi tên phối hợp |

Thường chỉ cần sửa hai file dữ liệu. Hướng dẫn chi tiết nằm ở đầu mỗi file.

## Xem trang

Trang chạy trên GitHub Pages của kho này. Có thể mở thẳng `index.html` trên máy để xem trước, không cần cài đặt.
