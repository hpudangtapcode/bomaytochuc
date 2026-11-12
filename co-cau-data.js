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
