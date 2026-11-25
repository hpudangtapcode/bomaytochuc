# Bộ máy tổ chức chính trị - BNV & BTCTW

Trang web tĩnh gồm hai thẻ:

- **Bộ máy tổ chức chính trị - BNV & BTCTW**: phía trên là Ban Chấp hành TW và Ban Tổ chức TW (bấm để đóng/mở các vụ, cục); khung đỏ nét đứt "Địa phương" gồm Tỉnh ủy, Ban tổ chức tỉnh ủy, UBND/HĐND, Sở Nội vụ; phía dưới là Bộ Nội vụ trong Bộ máy Chính phủ (bấm để mở từng tầng). Mũi tên cam là chỉ đạo, định hướng. Bên phải có sơ đồ màu vàng đối chiếu với doanh nghiệp mô hình tương tự.
- **Phối hợp trong nội bộ BNV**: bấm vào một đơn vị để thấy mũi tên chỉ tới các đơn vị khác trong Bộ, tới khối *UBND địa phương / Sở Nội vụ* và khối *Cơ quan bộ ngang hàng*, kèm nội dung phối hợp; các ô không liên quan được làm mờ. Bấm vào một trong hai khối để xem mọi đơn vị có quan hệ với khối đó.

Mở thẳng một thẻ bằng đường dẫn `.../#co-cau` hoặc `.../#phoi-hop`.

## Cấu trúc

| File | Nội dung |
|---|---|
| `index.html` | Khung trang, hai thẻ |
| `site.css` | Giao diện |
| `co-cau-data.js` | **Dữ liệu sơ đồ cây Bộ Nội vụ và các khối bao quanh** (`BAO_QUANH`) |
| `co-cau.js` | Vẽ sơ đồ cây Bộ Nội vụ |
| `bao-quanh.js` | Vẽ khối Đảng, khối Nhà nước và mũi tên chỉ đạo |
| `doi-chieu.js` | Vẽ sơ đồ đối chiếu với doanh nghiệp mô hình tương tự (dữ liệu `DOI_CHIEU` trong `co-cau-data.js`) |
| `phoi-hop-data.js` | **Dữ liệu phối hợp** (lấy từ "Bảng phối hợp các đơn vị thuộc Bộ Nội vụ") |
| `phoi-hop.js` | Vẽ mũi tên phối hợp |

Thường chỉ cần sửa hai file dữ liệu. Hướng dẫn chi tiết nằm ở đầu mỗi file.

## Xem trang

Trang chạy trên GitHub Pages của kho này. Có thể mở thẳng `index.html` trên máy để xem trước, không cần cài đặt.
