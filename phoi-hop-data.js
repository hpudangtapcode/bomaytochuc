/*
 * DỮ LIỆU PHẦN "PHỐI HỢP" (trang chính, thẻ Phối hợp)
 * -------------------------------------------------------------
 * Nguồn: "Bảng phối hợp các đơn vị thuộc Bộ Nội vụ".
 * Mỗi đơn vị:
 *   noiBo    : danh sách { to: <id đơn vị nhận>, text } — vẽ mũi tên trong Bộ.
 *              to: null = dịch vụ chung của cả Bộ: mũi tên tới ô "Bộ Nội vụ", chữ đặt ở chỗ trống.
 *   diaPhuong: mũi tên sang khối "UBND địa phương / Sở Nội vụ".
 *   ngang    : mũi tên sang khối "Cơ quan bộ ngang hàng".
 *   capTren  : chỉ hiện ở khung chi tiết, không vẽ.
 *   note     : ghi chú cần kiểm tra lại.
 * Để trống (null) nếu không có quan hệ.
 * Chữ đặt giữa hai dấu *...* hiển thị nghiêng = nội dung bổ sung.
 */
window.PHOI_HOP = {
  groups: [
    { label: "Tổ chức và nhân sự nhà nước", units: ["tcbc", "cqdp", "ccvc", "tccb"] },
    { label: "Quản lý các đối tượng xã hội", units: ["tcpcp", "ncc", "tdkt", "tnbdg"] },
    { label: "Lao động, việc làm", units: ["tlbhxh", "vieclam", "qlldnn"] },
    { label: "Bộ phận giúp việc của Bộ", units: ["vp", "vtlt", "pc", "tt", "khtc", "htqt", "cchc"] },
    { label: "Đơn vị HCSN độc lập", units: ["cntt", "vien", "tapchi"] }
  ],

  units: {
    tcbc: {
      name: "Vụ Tổ chức - Biên chế",
      noiBo: [{ to: "tccb", text: "Phối hợp *Vụ Tổ chức cán bộ* sắp xếp nội bộ" }],
      diaPhuong: "Quy định bộ máy, cơ cấu như thế nào, bao nhiêu phòng ban",
      capTren: null,
      ngang: "Quy định bộ máy, cơ cấu như thế nào, bao nhiêu phòng ban"
    },
    cqdp: {
      name: "Vụ Chính quyền địa phương",
      noiBo: [{ to: "cchc", text: "Phối hợp *Vụ cải cách hành chính* để chia đơn vị hành chính địa phương" }],
      diaPhuong: "Quy định chỗ nào có ủy ban xã, phường, đơn vị hành chính như nào.",
      capTren: "Trình danh sách quan chức địa phương. Thẩm định, trình Thủ tướng hồ sơ phê chuẩn kết quả bầu, miễn nhiệm, bãi nhiệm Chủ tịch, Phó Chủ tịch UBND cấp tỉnh",
      ngang: "Phối hợp Công an, Tư pháp, Tài chính khi thay đổi địa giới để cập nhật dữ liệu dân cư, hộ tịch, ngân sách"
    },
    ccvc: {
      name: "Vụ Công chức - Viên chức",
      noiBo: [{ to: null, text: "Tuyển dụng cán bộ cho nội bộ" }],
      diaPhuong: "Tuyển dụng cán bộ công chức, tổ chức thi, quản lý,.. cho các cơ quan toàn bộ hệ thống",
      capTren: null,
      ngang: "Tuyển dụng cán bộ công chức, tổ chức thi, quản lý,.. cho các cơ quan toàn bộ hệ thống, trừ những cơ quan đặc thù như Bộ Quốc phòng, Bộ Công an,.."
    },
    tccb: {
      name: "Vụ Tổ chức cán bộ",
      noiBo: [{ to: "tcbc", text: "Quản lý cán bộ cho nội bộ, cũng 1 phần là kết quả của Vụ Tổ chức - Biên chế để sắp xếp nội bộ" }],
      diaPhuong: null,
      capTren: "Trình hồ sơ nhân sự đối với cán bộ thuộc diện cấp trên quản lý",
      ngang: null
    },
    tcpcp: {
      name: "Vụ Tổ chức phi chính phủ",
      noiBo: [],
      diaPhuong: "Quản lý cấp phép hội, quỹ xã hội,…",
      capTren: null,
      ngang: "Lấy ý kiến bộ quản lý ngành, lĩnh vực hoạt động chính của hội, quỹ"
    },
    ncc: {
      name: "Cục Người có công",
      noiBo: [{ to: "khtc", text: "Phối hợp Vụ Kế hoạch - Tài chính về kinh phí ưu đãi người có công" }],
      diaPhuong: "Ủy quyền cho Sở Nội vụ làm đăng ký cấp các giấy tờ, còn các thủ tục khác như thanh toán phí mai táng, giải quyết chế độ thì do UBND xã, phường.",
      capTren: null,
      ngang: "Phối hợp *Bộ Quốc phòng*, cơ quan quản lý người hy sinh. Phối hợp Bộ Tài chính về kinh phí",
      note: "Cần kiểm tra lại cụm \"Ủy quyền cho Sở Nội vụ\": kết quả tra cứu cho thấy chiều ủy quyền là Sở Nội vụ ủy quyền cho UBND cấp xã (ví dụ Hà Nội, Quyết định 71/QĐ-SNV)."
    },
    tdkt: {
      name: "Ban Thi đua - Khen thưởng Trung ương",
      noiBo: [{ to: null, text: "Hướng dẫn, thẩm định hồ sơ khen thưởng của các đơn vị thuộc Bộ" }],
      diaPhuong: "Hướng dẫn nghiệp vụ Ban Thi đua - Khen thưởng thuộc Sở Nội vụ. Thẩm định hồ sơ khen thưởng cấp Nhà nước do tỉnh đề nghị",
      capTren: "Trực thuộc Hội đồng khen thưởng trung ương. Là cơ quan thường trực giúp Hội đồng",
      ngang: "Tiếp nhận, thẩm định hồ sơ đề nghị khen thưởng cấp Nhà nước của các bộ, ngành, đoàn thể"
    },
    tnbdg: {
      name: "Vụ Công tác thanh niên và Bình đẳng giới",
      noiBo: [{ to: null, text: "Thẩm định lại các văn bản xem đã có bao gồm các điều khoản về bình đẳng giới chưa" }],
      diaPhuong: "Tổ chức tập huấn, định hướng cho tỉnh. Giao cho UBND tỉnh và Sở Nội vụ phối hợp thực hiện.",
      capTren: null,
      ngang: "Phối hợp các bộ, ngành, Trung ương Đoàn, Hội Liên hiệp Phụ nữ,... Thẩm định lại các văn bản xem đã có bao gồm các điều khoản về bình đẳng giới chưa"
    },
    tlbhxh: {
      name: "Cục Tiền lương và Bảo hiểm xã hội",
      noiBo: [
        { to: "ccvc", text: "Phối hợp *Vụ Công chức - Viên chức* về ngạch, bậc, chức danh để xếp lương" },
        { to: "khtc", text: "Phối hợp *Vụ Kế hoạch - Tài chính* về quỹ lương" }
      ],
      diaPhuong: "Giao cho Sở Nội vụ tỉnh và các cơ quan bảo hiểm xã hội xã, phường",
      capTren: null,
      ngang: "Phối hợp Bộ Tài chính về nguồn kinh phí cải cách tiền lương. Phối hợp cơ quan bảo hiểm xã hội về đóng, hưởng chế độ"
    },
    vieclam: {
      name: "Cục Việc làm",
      noiBo: [{ to: null, text: "Cung cấp dữ liệu về lao động cho hệ thống" }],
      diaPhuong: "Cùng chia sẻ dữ liệu",
      capTren: null,
      ngang: "Phối hợp *Bộ Giáo dục và Đào tạo* trong định hướng nguồn nhân lực, dự báo tình hình việc làm."
    },
    qlldnn: {
      name: "Cục Quản lý lao động ngoài nước",
      noiBo: [
        { to: "htqt", text: "Phối hợp *Vụ Hợp tác quốc tế* về thỏa thuận lao động với nước tiếp nhận" },
        { to: "vieclam", text: "Phối hợp *Cục Việc làm* về dữ liệu nguồn lao động" }
      ],
      diaPhuong: "Cho các phương án phát triển nhân sự XKLĐ tại các địa phương, chỉ tiêu địa phương này đi bao nhiêu người, công tác xuống dưới UBND, HĐND tỉnh, huyện.",
      capTren: null,
      ngang: "Phối hợp Bộ Ngoại giao (bảo hộ công dân), Bộ Công an (xuất nhập cảnh), Bộ Giáo dục và Đào tạo (đào tạo ngoại ngữ, nghề)"
    },
    vp: {
      name: "Văn phòng Bộ",
      noiBo: [{ to: null, text: "Giúp việc, nhận thông tin tất cả, thông tin lên Văn phòng Chính phủ" }],
      diaPhuong: "Tiếp nhận báo cáo, kiến nghị của Sở Nội vụ, UBND tỉnh gửi Bộ và chuyển các đơn vị xử lý",
      capTren: "Đầu mối gửi báo cáo, văn bản của Bộ tới Văn phòng Chính phủ",
      ngang: "Đầu mối trao đổi văn bản"
    },
    vtlt: {
      name: "Cục Văn thư và Lưu trữ nhà nước",
      noiBo: [{ to: null, text: "Lưu trữ cho hệ thống" }],
      diaPhuong: "Lưu trữ cho hệ thống",
      capTren: "Lưu trữ cho hệ thống",
      ngang: "Lưu trữ cho hệ thống"
    },
    pc: {
      name: "Vụ Pháp chế",
      noiBo: [{ to: null, text: "Thẩm định văn bản pháp chế của tất cả những văn bản được ban hành, quan hệ với tất cả các phòng ban về mặt văn bản" }],
      diaPhuong: "Kiểm tra, xử lý văn bản của địa phương thuộc lĩnh vực Bộ quản lý có dấu hiệu trái luật",
      capTren: null,
      ngang: "Phối hợp Bộ Tư pháp lấy ý kiến và thẩm định"
    },
    tt: {
      name: "Thanh tra",
      noiBo: [{ to: null, text: "Thanh tra, kiểm tra công vụ, giải quyết khiếu nại, tố cáo, phòng chống tham nhũng trong Bộ" }],
      diaPhuong: "Thanh tra chuyên ngành tại địa phương",
      capTren: "Nhận hướng dẫn nghiệp vụ của Thanh tra Chính phủ",
      ngang: null
    },
    khtc: {
      name: "Vụ Kế hoạch - Tài chính",
      noiBo: [{ to: null, text: "Cấp quỹ, kế kiểm,… cho tất cả các ban" }],
      diaPhuong: null,
      capTren: null,
      ngang: "Phối hợp Bộ Tài chính về dự toán ngân sách, đầu tư"
    },
    htqt: {
      name: "Vụ Hợp tác quốc tế",
      noiBo: [{ to: "qlldnn", text: "Học hỏi, bổ trợ cho *Cục Quản lý lao động ngoài nước* để cho nhân sự ra nước ngoài học" }],
      diaPhuong: null,
      capTren: null,
      ngang: "Phối hợp Bộ Ngoại giao về ký kết thỏa thuận quốc tế, thủ tục đoàn ra, đoàn vào"
    },
    cchc: {
      name: "Vụ Cải cách hành chính",
      noiBo: [
        { to: "cqdp", text: "Làm cùng với *Vụ Chính quyền địa phương* để tham mưu, theo dõi sau cải cách" },
        { to: "tcbc", text: "Làm cùng với *Vụ Tổ chức - Biên chế* để tham mưu, theo dõi sau cải cách" }
      ],
      diaPhuong: "Hướng dẫn, đôn đốc, đánh giá chỉ số cải cách hành chính của các tỉnh",
      capTren: null,
      ngang: null
    },
    cntt: {
      name: "Trung tâm Công nghệ thông tin",
      noiBo: [{ to: null, text: "Share service CNTT cho Bộ" }],
      diaPhuong: "Chia sẻ dữ liệu",
      capTren: null,
      ngang: null
    },
    vien: {
      name: "Viện KH Tổ chức nhà nước và Lao động",
      noiBo: [{ to: null, text: "Tham mưu về cơ sở lý luận khoa học cho tất cả đơn vị" }],
      diaPhuong: "Sử dụng thông tin để thực hiện nghiên cứu",
      capTren: null,
      ngang: "Hợp tác nghiên cứu với các viện, trường"
    },
    tapchi: {
      name: "Tạp chí TCNNLĐ; Báo Dân trí",
      noiBo: [], diaPhuong: null, capTren: null, ngang: null,
      note: "Chưa có dữ liệu phối hợp trong bảng."
    }
  }
};
