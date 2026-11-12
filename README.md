# Sơ đồ tương tác - Bộ Nội vụ

Trang web tĩnh thể hiện mối quan hệ tương tác giữa các đơn vị thuộc Bộ, và giữa Bộ với địa phương.

Trang chính (`index.html`) là sơ đồ cơ cấu tổ chức dạng cây: bấm vào từng ô để mở tầng bên dưới. Dữ liệu nằm ở `co-cau-data.js`.

## Cấu trúc

| File | Nội dung |
|---|---|
| `index.html` | Trang chính: sơ đồ cơ cấu tổ chức dạng cây, bấm để mở từng tầng |
| `tuong-tac.html` | Khung trang sơ đồ tương tác |
| `style.css` | Giao diện |
| `app.js` | Xử lý vẽ sơ đồ, chọn đơn vị, chạy quy trình |
| `data.js` | Dữ liệu sơ đồ tương tác: đơn vị, quan hệ, quy trình |
| `co-cau-data.js` | Dữ liệu cho sơ đồ cơ cấu tổ chức |

## Cập nhật dữ liệu (`data.js`)

- Thêm đơn vị: thêm một dòng vào `nodes`, ví dụ `{ id: "vu_moi", name: "Vụ Mới", group: "gv" }`.
- Thêm quan hệ: thêm một dòng vào `relations`, ví dụ
  `{ from: "vu_pc", to: "vu_moi", type: "kiemtra", note: "Thẩm định văn bản" }`.
  Loại quan hệ (`type`): `chidao`, `baocao`, `phoihop`, `dulieu`, `kiemtra`.
- Thêm quy trình: thêm một mục vào `processes`, mỗi bước có `from`, `to`, `type`, `note`.
- Quan hệ "Lãnh đạo Bộ → từng đơn vị" được tạo tự động, không cần khai báo.
- Quan hệ khai báo sai mã đơn vị sẽ bị bỏ qua và báo trong Console của trình duyệt (F12).

## Đưa lên GitHub Pages

1. Tạo repository mới trên GitHub (ví dụ `so-do-bnv`), chọn Public.
2. Bấm **Add file → Upload files**, kéo thả toàn bộ file trong thư mục này, bấm **Commit changes**.
3. Vào **Settings → Pages**, mục *Source* chọn **Deploy from a branch**, nhánh `main`, thư mục `/ (root)`, bấm **Save**.
4. Sau khoảng 1-2 phút, trang chạy tại `https://<tên-tài-khoản>.github.io/so-do-bnv/`.

Có thể mở thẳng `index.html` trên máy để xem trước, không cần cài đặt.

Đường dẫn có thể trỏ thẳng tới một đơn vị, ví dụ `.../tuong-tac.html#vu_tcbc`.
