/*
 * DỮ LIỆU SƠ ĐỒ TƯƠNG TÁC - BỘ NỘI VỤ
 * -------------------------------------------------------------
 * Đây là file duy nhất cần sửa khi cập nhật nội dung.
 *  - nodes:     danh sách đơn vị (id, tên, nhóm)
 *  - relations: các mối quan hệ (from -> to, loại, nội dung)
 *  - processes: các quy trình mẫu, chạy từng bước
 * Lưu ý: nội dung quan hệ hiện là BẢN DỰ THẢO, cần rà soát theo
 * quy định về chức năng, nhiệm vụ của từng đơn vị.
 */
window.DATA = {
  title: "Sơ đồ tương tác - Bộ Nội vụ",

  types: [
    { id: "chidao",  label: "Chỉ đạo, hướng dẫn",          color: "#1F4E9A", dash: "" },
    { id: "baocao",  label: "Báo cáo, đề xuất",            color: "#C2410C", dash: "7 5" },
    { id: "phoihop", label: "Phối hợp",                    color: "#0F766E", dash: "", both: true },
    { id: "dulieu",  label: "Cung cấp dữ liệu, kết quả",   color: "#7C3AED", dash: "2 4" },
    { id: "kiemtra", label: "Thẩm định, kiểm tra, giám sát", color: "#B91C1C", dash: "10 4 2 4" }
  ],

  groups: [
    { id: "bo",   label: "Lãnh đạo Bộ",                   tier: "bo" },
    { id: "tcns", label: "Tổ chức và nhân sự nhà nước",   tier: "bo" },
    { id: "xh",   label: "Quản lý các đối tượng xã hội",  tier: "bo" },
    { id: "ld",   label: "Lao động, việc làm",            tier: "bo" },
    { id: "gv",   label: "Bộ phận giúp việc của Bộ",      tier: "bo" },
    { id: "sn",   label: "Đơn vị HCSN độc lập",           tier: "bo" },
    { id: "dp",   label: "Địa phương",                    tier: "bottom" }
  ],

  nodes: [

    { id: "ldb",     name: "Lãnh đạo Bộ",                   group: "bo" },

    { id: "vu_tcbc",  name: "Vụ Tổ chức - Biên chế",         group: "tcns" },
    { id: "vu_cqdp",  name: "Vụ Chính quyền địa phương",     group: "tcns" },
    { id: "vu_ccvc",  name: "Vụ Công chức - Viên chức",      group: "tcns" },
    { id: "vu_tccb",  name: "Vụ Tổ chức cán bộ",             group: "tcns" },

    { id: "vu_tcpcp", name: "Vụ Tổ chức phi chính phủ",      group: "xh" },
    { id: "cuc_ncc",  name: "Cục Người có công",             group: "xh" },
    { id: "ban_tdkt", name: "Ban Thi đua - Khen thưởng TW",  group: "xh" },
    { id: "vu_tnbdg", name: "Vụ Công tác thanh niên và BĐG", group: "xh" },

    { id: "cuc_tlbhxh", name: "Cục Tiền lương và BHXH",       group: "ld" },
    { id: "cuc_vl",     name: "Cục Việc làm",                 group: "ld" },
    { id: "cuc_qlldnn", name: "Cục QL lao động ngoài nước",   group: "ld" },

    { id: "vp",       name: "Văn phòng Bộ",                  group: "gv" },
    { id: "cuc_vtlt", name: "Cục Văn thư và Lưu trữ NN",     group: "gv" },
    { id: "vu_pc",    name: "Vụ Pháp chế",                   group: "gv" },
    { id: "thanhtra", name: "Thanh tra Bộ",                  group: "gv" },
    { id: "vu_khtc",  name: "Vụ Kế hoạch - Tài chính",       group: "gv" },
    { id: "vu_htqt",  name: "Vụ Hợp tác quốc tế",            group: "gv" },
    { id: "vu_cchc",  name: "Vụ Cải cách hành chính",        group: "gv" },

    { id: "ttcntt",   name: "Trung tâm Công nghệ thông tin", group: "sn" },
    { id: "vien",     name: "Viện KH Tổ chức NN và LĐ",      group: "sn" },
    { id: "baochi",   name: "Tạp chí TCNN&LĐ; Báo Dân trí",  group: "sn" },

    { id: "dp_tinh",  name: "UBND cấp tỉnh",                 group: "dp" },
    { id: "dp_so",    name: "Sở Nội vụ",                     group: "dp" },
    { id: "dp_xa",    name: "UBND cấp xã",                   group: "dp" }
  ],

  // Quan hệ Lãnh đạo Bộ -> từng đơn vị thuộc Bộ được tạo tự động (xem app.js).
  relations: [
    // ---- Trong Bộ
    { from: "vu_tcbc", to: "vu_cqdp",  type: "phoihop", note: "Tổ chức, biên chế của chính quyền địa phương" },
    { from: "vu_tcbc", to: "vu_ccvc",  type: "phoihop", note: "Biên chế gắn với vị trí việc làm, tuyển dụng" },
    { from: "vu_tcbc", to: "vu_cchc",  type: "phoihop", note: "Sắp xếp tổ chức bộ máy trong cải cách hành chính" },
    { from: "vu_ccvc", to: "cuc_tlbhxh", type: "phoihop", note: "Chế độ tiền lương công chức, viên chức" },
    { from: "vu_tccb", to: "vu_ccvc",  type: "phoihop", note: "Áp dụng quy định chung về tuyển dụng, đánh giá" },
    { from: "vu_tccb", to: "vien",     type: "phoihop", note: "Đào tạo, bồi dưỡng cán bộ của Bộ" },
    { from: "vu_tcpcp", to: "ban_tdkt", type: "phoihop", note: "Khen thưởng đối với hội, quỹ" },
    { from: "cuc_ncc", to: "vu_khtc",  type: "phoihop", note: "Dự toán, kinh phí chi trả chế độ ưu đãi" },
    { from: "ban_tdkt", to: "vp",      type: "phoihop", note: "Tổ chức hội nghị, lễ khen thưởng" },
    { from: "vu_tnbdg", to: "cuc_vl",  type: "phoihop", note: "Việc làm cho thanh niên; lồng ghép bình đẳng giới" },
    { from: "cuc_tlbhxh", to: "cuc_vl", type: "phoihop", note: "Chính sách bảo hiểm thất nghiệp" },
    { from: "cuc_vl", to: "cuc_qlldnn", type: "phoihop", note: "Thông tin thị trường lao động trong và ngoài nước" },
    { from: "cuc_qlldnn", to: "vu_htqt", type: "phoihop", note: "Hợp tác lao động với nước tiếp nhận" },
    { from: "vp",     to: "cuc_vtlt",  type: "phoihop", note: "Văn thư, lưu trữ hồ sơ của Bộ" },
    { from: "vu_pc",  to: "vu_ccvc",   type: "kiemtra", note: "Thẩm định dự thảo văn bản quy phạm pháp luật" },
    { from: "vu_pc",  to: "cuc_tlbhxh", type: "kiemtra", note: "Thẩm định dự thảo văn bản quy phạm pháp luật" },
    { from: "vu_pc",  to: "cuc_ncc",   type: "kiemtra", note: "Thẩm định dự thảo văn bản quy phạm pháp luật" },
    { from: "thanhtra", to: "cuc_qlldnn", type: "phoihop", note: "Giải quyết khiếu nại, tố cáo lĩnh vực lao động ngoài nước" },
    { from: "ttcntt", to: "vp",        type: "dulieu",  note: "Hệ thống quản lý văn bản và điều hành" },
    { from: "ttcntt", to: "vu_ccvc",   type: "dulieu",  note: "Cơ sở dữ liệu cán bộ, công chức, viên chức" },
    { from: "ttcntt", to: "cuc_ncc",   type: "dulieu",  note: "Cơ sở dữ liệu người có công" },
    { from: "ttcntt", to: "cuc_tlbhxh", type: "dulieu", note: "Hạ tầng dữ liệu tiền lương, bảo hiểm xã hội" },
    { from: "vien",   to: "vu_tcbc",   type: "dulieu",  note: "Kết quả nghiên cứu làm cơ sở xây dựng chính sách" },
    { from: "vien",   to: "cuc_tlbhxh", type: "dulieu", note: "Nghiên cứu chính sách tiền lương, lao động" },
    { from: "baochi", to: "vp",        type: "phoihop", note: "Thông tin, tuyên truyền hoạt động của Bộ" },

    // ---- Bộ <-> Địa phương
    { from: "vu_cqdp", to: "dp_tinh",  type: "chidao",  note: "Hướng dẫn tổ chức chính quyền, đơn vị hành chính" },
    { from: "dp_tinh", to: "vu_cqdp",  type: "baocao",  note: "Đề án sắp xếp đơn vị hành chính" },
    { from: "vu_tcbc", to: "dp_tinh",  type: "chidao",  note: "Hướng dẫn, thẩm định biên chế" },
    { from: "dp_tinh", to: "vu_tcbc",  type: "baocao",  note: "Đề nghị giao biên chế" },
    { from: "vu_ccvc", to: "dp_so",    type: "chidao",  note: "Hướng dẫn tuyển dụng, quản lý công chức, viên chức" },
    { from: "cuc_ncc", to: "dp_so",    type: "chidao",  note: "Hướng dẫn chế độ ưu đãi người có công" },
    { from: "dp_so",   to: "cuc_ncc",  type: "baocao",  note: "Báo cáo số liệu, kinh phí người có công" },
    { from: "ban_tdkt", to: "dp_tinh", type: "chidao",  note: "Hướng dẫn công tác thi đua, khen thưởng" },
    { from: "dp_tinh", to: "ban_tdkt", type: "baocao",  note: "Hồ sơ đề nghị khen thưởng" },
    { from: "cuc_vl",  to: "dp_so",    type: "chidao",  note: "Hướng dẫn chính sách việc làm, bảo hiểm thất nghiệp" },
    { from: "dp_so",   to: "cuc_vl",   type: "baocao",  note: "Báo cáo tình hình thị trường lao động" },
    { from: "cuc_tlbhxh", to: "dp_so", type: "chidao",  note: "Hướng dẫn tiền lương tối thiểu, quan hệ lao động" },
    { from: "vu_tcpcp", to: "dp_tinh", type: "chidao",  note: "Hướng dẫn quản lý hội, quỹ" },
    { from: "vu_tnbdg", to: "dp_so",   type: "chidao",  note: "Hướng dẫn công tác thanh niên, bình đẳng giới" },
    { from: "cuc_vtlt", to: "dp_so",   type: "chidao",  note: "Hướng dẫn nghiệp vụ văn thư, lưu trữ" },
    { from: "thanhtra", to: "dp_so",   type: "kiemtra", note: "Thanh tra chuyên ngành nội vụ, lao động" },
    { from: "vu_cchc", to: "dp_tinh",  type: "kiemtra", note: "Đánh giá chỉ số cải cách hành chính" },

    // ---- Trong địa phương
    { from: "dp_tinh", to: "dp_so",    type: "chidao",  note: "Chỉ đạo thực hiện nhiệm vụ nội vụ tại địa phương" },
    { from: "dp_so",   to: "dp_tinh",  type: "baocao",  note: "Tham mưu, báo cáo UBND tỉnh" },
    { from: "dp_tinh", to: "dp_xa",    type: "chidao",  note: "Chỉ đạo, điều hành" },
    { from: "dp_xa",   to: "dp_tinh",  type: "baocao",  note: "Báo cáo kết quả thực hiện" },
    { from: "dp_so",   to: "dp_xa",    type: "chidao",  note: "Hướng dẫn chuyên môn, nghiệp vụ" }
  ],

  processes: [
    {
      id: "vbqppl",
      name: "Xây dựng, ban hành nghị định (ví dụ: lĩnh vực công chức)",
      steps: [
        { from: "ldb",     to: "vu_ccvc", type: "chidao",  note: "Giao đơn vị chủ trì soạn thảo" },
        { from: "vu_ccvc", to: "vu_pc",   type: "phoihop", note: "Gửi hồ sơ đề nghị thẩm định nội bộ" },
        { from: "vu_pc",   to: "vu_ccvc", type: "kiemtra", note: "Ý kiến thẩm định" },
        { from: "vu_ccvc", to: "ldb",     type: "baocao",  note: "Hoàn thiện, trình Lãnh đạo Bộ" },
        { from: "vu_ccvc", to: "dp_so",   type: "chidao",  note: "Hướng dẫn triển khai tại địa phương" }
      ]
    },
    {
      id: "bienche",
      name: "Giao biên chế cho địa phương",
      steps: [
        { from: "dp_so",   to: "dp_tinh", type: "baocao",  note: "Tổng hợp nhu cầu biên chế" },
        { from: "dp_tinh", to: "vu_tcbc", type: "baocao",  note: "Đề nghị giao biên chế" },
        { from: "vu_tcbc", to: "vu_ccvc", type: "phoihop", note: "Đối chiếu vị trí việc làm" },
        { from: "vu_tcbc", to: "ldb",     type: "baocao",  note: "Trình phương án giao biên chế" },
        { from: "vu_tcbc", to: "dp_tinh", type: "chidao",  note: "Thông báo, hướng dẫn thực hiện" }
      ]
    },
    {
      id: "ncc",
      name: "Giải quyết chế độ ưu đãi người có công",
      steps: [
        { from: "dp_xa",   to: "dp_so",   type: "baocao",  note: "Tiếp nhận, chuyển hồ sơ" },
        { from: "dp_so",   to: "cuc_ncc", type: "baocao",  note: "Báo cáo số liệu, đề nghị kinh phí" },
        { from: "cuc_ncc", to: "vu_khtc", type: "phoihop", note: "Lập dự toán kinh phí" },
        { from: "vu_khtc", to: "ldb",     type: "baocao",  note: "Trình phân bổ kinh phí" },
        { from: "cuc_ncc", to: "dp_so",   type: "chidao",  note: "Hướng dẫn chi trả" },
        { from: "thanhtra", to: "dp_so",  type: "kiemtra", note: "Thanh tra việc thực hiện chế độ" }
      ]
    },
    {
      id: "khenthuong",
      name: "Khen thưởng cấp nhà nước",
      steps: [
        { from: "dp_tinh", to: "ban_tdkt", type: "baocao", note: "Gửi hồ sơ đề nghị khen thưởng" },
        { from: "ban_tdkt", to: "ldb",     type: "baocao", note: "Thẩm định, trình Lãnh đạo Bộ" },
        { from: "ban_tdkt", to: "vp",      type: "phoihop", note: "Tổ chức trao tặng" }
      ]
    }
  ]
};
