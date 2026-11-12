# Sơ đồ tương tác - Bộ Nội vụ

Trang web tĩnh thể hiện mối quan hệ tương tác giữa các đơn vị thuộc Bộ, giữa Bộ với tầng trên và với địa phương.

## Cấu trúc

| File | Nội dung |
|---|---|
| `index.html` | Khung trang |
| `style.css` | Giao diện |
| `app.js` | Xử lý vẽ sơ đồ, chọn đơn vị, chạy quy trình |
| `data.js` | **Toàn bộ dữ liệu: đơn vị, quan hệ, quy trình. Chỉ cần sửa file này.** |

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
2. Bấm **Add file → Upload files**, kéo thả 5 file trong thư mục này, bấm **Commit changes**.
3. Vào **Settings → Pages**, mục *Source* chọn **Deploy from a branch**, nhánh `main`, thư mục `/ (root)`, bấm **Save**.
4. Sau khoảng 1-2 phút, trang chạy tại `https://<tên-tài-khoản>.github.io/so-do-bnv/`.

Có thể mở thẳng `index.html` trên máy để xem trước, không cần cài đặt.

Đường dẫn có thể trỏ thẳng tới một đơn vị, ví dụ `.../#vu_tcbc`.
