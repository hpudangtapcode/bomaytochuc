/*
 * DỮ LIỆU SƠ ĐỒ CƠ CẤU TỔ CHỨC - BỘ NỘI VỤ (trang co-cau.html)
 * -------------------------------------------------------------
 * Mỗi mục là một ô trên sơ đồ:
 *   name     : chữ hiển thị trong ô
 *   items    : (tùy chọn) danh sách gạch đầu dòng, thay cho name
 *   children : (tùy chọn) các ô ở tầng dưới, hiện ra khi bấm vào ô
 * Kiểu ô được tự xác định theo tầng: 1 = Bộ, 2 = nhóm, 3 = đơn vị,
 * từ tầng 4 trở xuống = ô mô tả.
 */
window.CO_CAU = {
  name: "Bộ Nội vụ",
  children: [
    {
      name: "Nhóm Tổ chức và nhân sự của nhà nước",
      children: [
        { name: "Vụ Tổ chức - Biên chế", children: [
          { name: "Các cơ quan (bộ, sở, đơn vị sự nghiệp,...)", children: [
            { name: "Thiết kế cấu trúc các cơ quan trong nhà nước, quyết định sáp nhập, giải thể, biên chế,... cho từng cơ quan → Lo phần cấu trúc bộ máy, cơ quan có bao nhiêu phòng ban, bao nhiêu người,..." }
          ] }
        ] },
        { name: "Vụ Chính quyền địa phương", children: [
          { name: "Cấp chính quyền tại địa phương (UBND, HĐND, địa giới hành chính)", children: [
            { name: "Xem 1 địa phương có cấu trúc như nào, bao nhiêu xã phường; phê chuẩn lãnh đạo UBND, HĐND; quy định bầu cử" }
          ] }
        ] },
        { name: "Vụ Công chức - Viên chức", children: [
          { name: "Toàn bộ công chức viên chức trên cả nước", children: [
            { name: "Tuyển dụng, bố trí, thi cử, đào tạo, đánh giá cán bộ" }
          ] }
        ] },
        { name: "Vụ Tổ chức cán bộ", children: [
          { name: "Nhân sự trong Bộ Nội vụ", children: [
            { name: "Quản lý cán bộ trong nội bộ, quy hoạch, đào tạo" }
          ] }
        ] }
      ]
    },
    {
      name: "Nhóm Quản lý các đối tượng xã hội",
      children: [
        { name: "Vụ Tổ chức phi chính phủ", children: [
          { name: "Hội, quỹ xã hội, từ thiện, y tế, tổ chức phi Chính phủ", children: [
            { name: "Cho phép thành lập, cấp quỹ, theo dõi hoạt động, báo cáo" }
          ] }
        ] },
        { name: "Cục Người có công", children: [
          { name: "Người có công và gia đình", children: [
            { name: "Lập chế độ đãi ngộ, hồ sơ, cơ sở điều dưỡng, tìm kiếm và quy tập hài cốt liệt sỹ", children: [
              { items: ["Chính sách", "Dữ liệu người có công", "Kế hoạch tài chính", "Văn phòng", "Trung tâm điều dưỡng"] }
            ] }
          ] }
        ] },
        { name: "Ban Thi đua - Khen thưởng Trung ương", children: [
          { name: "Tổ chức trên phạm vi cả nước", children: [
            { name: "Thường vụ cho HĐ Thi đua khen thưởng, quản lý nhà nước về khen thưởng thi đua, tham mưu, đôn đốc thực hiện" }
          ] }
        ] },
        { name: "Vụ Công tác thanh niên và bình đẳng giới", children: [
          { name: "Thanh niên và các quy phạm về bình đẳng giới", children: [
            { name: "Kiểm tra với các văn bản luật,... đã có các điều khoản về bình đẳng giới chưa. Xây dựng các chương trình phát triển thanh niên, đặt các mục tiêu cho ĐTNCSHCM" }
          ] }
        ] }
      ]
    },
    {
      name: "Lao động, việc làm",
      children: [
        { name: "Cục Tiền lương và Bảo hiểm xã hội", children: [
          { name: "Tiền và phúc lợi của người lao động", children: [
            { name: "Quy định lương tối thiểu vùng, lương cơ sở, mức đóng BHXH, ...", children: [
              { items: ["Tiền lương khu vực công", "Tiền lương khu vực sản xuất kinh doanh", "Quan hệ lao động", "Chính sách lao động", "BHXH", "Hỗ trợ phát triển QHLĐ"] }
            ] }
          ] }
        ] },
        { name: "Cục Việc làm", children: [
          { name: "Cơ hội việc làm trong nước và quản lý an toàn người lao động", children: [
            { name: "Tham mưu về quy hoạch người lao động, dự báo việc làm; quy định bảo hiểm thất nghiệp, giờ làm tối thiểu, an toàn vệ sinh lao động", children: [
              { items: [
                "Chính sách việc làm.", "Thị trường lao động.", "Bảo hiểm thất nghiệp.", "Điều kiện lao động.",
                "Quy chuẩn và Kiểm định kỹ thuật.", "Huấn luyện và Thông tin an toàn, vệ sinh lao động.",
                "Kiểm tra và Kiểm soát rủi ro.", "Trung tâm Quốc gia về Dịch vụ việc làm.",
                "Trung tâm Quốc gia về An toàn - Vệ sinh lao động.", "Trung tâm Kiểm định Kỹ thuật an toàn Khu vực I II III"
              ] }
            ] }
          ] }
        ] },
        { name: "Cục Quản lý lao động ngoài nước", children: [
          { name: "Người Việt Nam đi làm việc ở nước ngoài theo hợp đồng", children: [
            { name: "Ra chính sách đào tạo, định hướng, trung tâm tuyển dụng chọn lọc, theo dõi, hợp tác quốc tế (như là hợp tác lao động điều dưỡng với Nhật Bản)", children: [
              { items: ["Thị trường Châu Âu, Châu Mỹ, Trung Quốc", "Thị trường Châu Á, Châu Phi", "Pháp chế", "Kiểm tra, giải quyết khiếu nại, tố cáo"] }
            ] }
          ] }
        ] }
      ]
    },
    {
      name: "Bộ phận giúp việc của Bộ",
      children: [
        { name: "Văn phòng Bộ", children: [
          { name: "Nội bộ Bộ", children: [
            { name: "Các công việc văn thư, hành chính tổng hợp, giúp việc" }
          ] }
        ] },
        { name: "Cục Văn thư và Lưu trữ nhà nước", children: [
          { name: "Văn bản trên cả nước", children: [
            { name: "Lưu trữ tài liệu hồ sơ văn thư trên cả nước" }
          ] }
        ] },
        { name: "Vụ Pháp chế", children: [
          { name: "Văn bản trước khi ban hành của nội bộ Bộ", children: [
            { name: "Soạn thảo, thẩm định văn bản, tư vấn pháp lý cho Bộ" }
          ] }
        ] },
        { name: "Thanh tra", children: [
          { name: "Văn bản trước khi ban hành của nội bộ Bộ" }
        ] },
        { name: "Vụ Kế hoạch - Tài chính", children: [
          { name: "Tài sản nội bộ: tài chính, tài sản công,...", children: [
            { name: "Quản lý quy hoạch, kế hoạch, tài chính, kế toán, giá, tài sản công, đấu thầu, đầu tư công, kiểm toán nội bộ và thống kê của Bộ" }
          ] }
        ] },
        { name: "Vụ Hợp tác quốc tế", children: [
          { name: "Người trong ngành và đối tác quốc tế", children: [
            { name: "Hợp tác quốc tế về lĩnh vực Nội vụ, cử người đi học, cho người đến học, tham gia tổ chức quốc tế có liên quan" }
          ] }
        ] },
        { name: "Vụ Cải cách hành chính", children: [
          { name: "Bộ máy tổ chức, nhưng ở giai đoạn thực thi và sau thực thi", children: [
            { name: "Tham mưu, thủ tục, thường trực cho các công tác nhà nước về cải cách hành chính, báo cáo cải cách hành chính, khảo sát thực tế sau cải cách" }
          ] }
        ] }
      ]
    },
    {
      name: "Đơn vị HCSN độc lập",
      children: [
        { name: "Trung tâm Công nghệ thông tin", children: [
          { name: "Hạ tầng CNTT dùng chung cho BNV" }
        ] },
        { name: "Viện KH Tổ chức NN và LĐ", children: [
          { name: "Nội bộ Bộ", children: [
            { name: "Nghiên cứu khoa học làm cơ sở cho các chính sách", children: [
              { items: [
                "Phòng QLKH", "Nghiên cứu tổ chức bộ máy", "Nghiên cứu cán bộ công chức viên chức",
                "Nghiên cứu chính sách việc làm lao động tiền lương", "Nghiên cứu chính sách xã hội và bình đẳng giới",
                "Phân tích chiến lược, dự báo,.."
              ] }
            ] }
          ] }
        ] },
        { name: "Tạp chí TCNNLĐ; Báo Dân trí", children: [
          { name: "Cơ quan ngôn luận" }
        ] }
      ]
    }
  ]
};

/*
 * KHỐI ĐẢNG VÀ KHỐI NHÀ NƯỚC bao quanh sơ đồ Bộ Nội vụ (thẻ "Cơ cấu tổ chức").
 * Mũi tên cam = chỉ đạo, định hướng.
 */
window.BAO_QUANH = {
  bch: "Tham mưu đến Ban Chấp hành Trung ương",
  tctw: {
    name: "Ban Tổ chức Trung ương",
    units: [
      { name: "Vụ Tổ chức - Điều lệ", desc: "Bộ máy, biên chế cơ quan Đảng, cơ cấu cán bộ" },
      { name: "Vụ Cơ sở đảng, đảng viên", desc: "Dữ liệu Đảng viên, nghiệp vụ công tác Đảng" },
      { name: "Vụ Cán bộ", desc: "Nhận hồ sơ phê duyệt danh sách người đứng đầu các địa phương. Tham mưu chiến lược bổ nhiệm, luân chuyển, bố trí cán bộ" },
      { name: "Vụ Chính sách Cán bộ", desc: "Chế độ, tiền lương, khen thưởng bậc cao; cán bộ cao cấp, lão thành cách mạng" },
      { name: "Các Vụ địa phương I, II, III", desc: "Quản lý theo các vùng, đi công tác các hội nghị của tỉnh, là đầu mối nhân sự Trung Ương" },
      { name: "Vụ NCKH Tổ chức Cán bộ", desc: "Cung cấp NCKH về tổ chức bộ máy đảng, công tác đảng, cán bộ" },
      { name: "Cục Đào tạo, bồi dưỡng cán bộ", desc: "Chỉ đạo kế hoạch tổ chức bồi dưỡng cho các cán bộ thuộc Đảng (lãnh đạo cấp cao, bí thư thành ủy,..)" },
      { name: "Cục Bảo vệ chính trị nội bộ", desc: "Tham mưu công tác bảo vệ, tiếp nhận khiếu nại tố cáo, kiểm tra xác minh" },
      { name: "Văn phòng Ban", desc: null }
    ],
    // mũi tên nhỏ bên phải thanh Ban Tổ chức Trung ương
    side: { label: "Các văn bản hướng dẫn", name: "Đảng viên" }
  },
  // chữ ghi chú: cạnh Ban Tổ chức TW (cấp tỉnh) và trong khung Địa phương (cấp xã)
  phanCap: {
    trungUong: "Quy định, tiêu chuẩn, số tối đa, tổng biên chế nhân sự chủ chốt cấp tỉnh",
    diaPhuong: "Nhân sự chủ chốt cấp xã, nhân sự trong bộ máy địa phương"
  },
  tinhUy: {
    name: "Tỉnh ủy",
    ban: "Ban tổ chức tỉnh ủy",
    note: "Là cơ quan tham mưu, giúp việc tỉnh ủy những đầu mục tương tự BTCTW nhưng giới hạn ở cấp địa phương được ủy quyền",
    children: ["Tổ chức cán bộ", "Tổ chức Đảng, Đảng viên", "Bảo vệ chính trị nội bộ", "Văn phòng"],
    deNghi: "Đề nghị ký và cấp thẻ Đảng hằng tháng" // mũi tên từ Ban tổ chức tỉnh ủy lên Ban Tổ chức Trung ương
  },
  nhaNuoc: {
    chinhPhu: "Bộ máy Chính phủ",
    ubnd: "UBND, HĐND",
    soNoiVu: "Sở Nội vụ",
    ubndToSnv: "Chỉ đạo trực tiếp",           // UBND, HĐND → Sở Nội vụ
    bnvToUbnd: "Chỉ đạo đường lối định hướng", // Bộ Nội vụ → UBND, HĐND
    bnvToSnv: "Chỉ đạo chuyên môn",            // Bộ Nội vụ → Sở Nội vụ
    // đường có dấu ✕ giữa Ban Tổ chức TW và Bộ Nội vụ
    khongTrucTiep: "Không có quan hệ chỉ đạo trực tiếp"
  }
};

/*
 * SƠ ĐỒ ĐỐI CHIẾU (bên phải thẻ "Bộ máy tổ chức chính trị")
 * Toạ độ tính theo khung rộng W x cao H. Mỗi ô: x, y (góc trên trái), w, h.
 * Mỗi mũi tên: điểm đi qua [[x,y], ...], màu (vang | do | xam), chữ và vị trí chữ.
 */
window.DOI_CHIEU = {
  title: "Đối chiếu với doanh nghiệp mô hình tương tự",
  W: 700, H: 440,
  boxes: [
    { id: "ctdh",     label: "CTĐH",               x: 220, y: 20,  w: 220, h: 42 },
    { id: "thammuu",  label: "Các ban tham mưu",   x: 400, y: 110, w: 220, h: 44 },
    { id: "uyquyen",  label: "Ủy quyền điều hành", x: 20,  y: 195, w: 230, h: 44 },
    { id: "chucnang", label: "Các ban chức năng",  x: 450, y: 200, w: 150, h: 34 },
    { id: "cttv1",    label: "CTTV",               x: 360, y: 285, w: 100, h: 32 },
    { id: "cttv2",    label: "CTTV",               x: 570, y: 278, w: 100, h: 32 },
    { id: "dm1",      label: "Đầu mối đối ứng",    x: 330, y: 345, w: 160, h: 32 },
    { id: "dm2",      label: "Đầu mối đối ứng",    x: 520, y: 395, w: 160, h: 32 }
  ],
  edges: [
    { color: "do",   points: [[510, 110], [510, 86], [330, 86], [330, 64]] },
    { color: "vang", points: [[330, 62], [330, 128], [135, 128], [135, 193]] },
    { color: "vang", points: [[330, 128], [330, 186], [525, 186], [525, 198]] },
    { color: "vang", points: [[250, 212], [448, 212]], label: "chỉ đạo", at: [345, 204] },
    { color: "vang", points: [[250, 226], [408, 283]], label: "chỉ đạo", at: [318, 238] },
    { color: "xam",  points: [[525, 234], [525, 250], [410, 250], [410, 283]] },
    { color: "xam",  points: [[525, 250], [620, 250], [620, 276]], label: "hướng dẫn, quy định", at: [515, 267] },
    { color: "xam",  points: [[410, 317], [410, 343]] },
    { color: "xam",  points: [[620, 310], [620, 393]] }
  ],
  // chữ đứng riêng
  notes: [
    { text: "hướng dẫn tất cả đối tượng liên quan", at: [510, 174] }
  ]
};
