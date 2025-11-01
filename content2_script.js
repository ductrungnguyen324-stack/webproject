    // --- Dữ liệu Mẫu (Mock Data) ---

    // 1. Dữ liệu Sản phẩm
    const productList = [
        { stt: 1, name: 'Vợt cầu lông Yonex Astrox 100 ZZ', type: 'Vợt cầu lông Yonex', price: 4500000, status: 1 },
        { stt: 2, name: 'Vợt cầu lông Victor Thruster K BXR', type: 'Vợt cầu lông Victor', price: 3200000, status: 1 },
        { stt: 3, name: 'Vợt cầu lông Lining Windstorm 700', type: 'Vợt cầu lông Lining', price: 1850000, status: 1 },
        { stt: 4, name: 'Vợt cầu lông Mizuno Caliber VS Tour', type: 'Vợt cầu lông Mizuno', price: 2900000, status: 1 },
        { stt: 5, name: 'Vợt cầu lông Apacs Finapi 232', type: 'Vợt cầu lông Apacs', price: 850000, status: 1 },
        { stt: 6, name: 'Vợt cầu lông VNB V99', type: 'Vợt cầu lông VNB', price: 990000, status: 1 },
        { stt: 7, name: 'Vợt cầu lông Proace Sweet Spot 1000', type: 'Vợt cầu lông Proace', price: 1200000, status: 1 },
        { stt: 8, name: 'Vợt cầu lông Forza Ti-500', type: 'Vợt cầu lông Forza', price: 1500000, status: 0 }, // Đã xóa
        { stt: 9, name: 'Vợt cầu lông Kamito Aero Power', type: 'Vợt cầu lông Kamito', price: 1100000, status: 1 },
        { stt: 10, name: 'Vợt cầu lông Kumpoo Power Control K520', type: 'Vợt cầu lông Kumpoo', price: 650000, status: 1 },
    ];

    // 2. Dữ liệu Khách hàng
    const userList = [
        { stt: 1, fullName: 'Nguyễn Văn A', contact: '0901xxxxxx', joinDate: '2024-01-15', status: 1 }, 
        { stt: 2, fullName: 'Trần Thị B', contact: '0902xxxxxx', joinDate: '2024-03-20', status: 1 },
        { stt: 3, fullName: 'Lê Văn C', contact: '0903xxxxxx', joinDate: '2023-11-10', status: 0 }, 
        { stt: 4, fullName: 'Phạm Thị D', contact: '0904xxxxxx', joinDate: '2024-05-01', status: 1 },
        { stt: 5, fullName: 'Hoàng Văn E', contact: '0905xxxxxx', joinDate: '2024-06-25', status: 1 },
    ];

    // 3. Dữ liệu Đơn hàng
    const orderList = [
        { id: 'DH001', customer: 'Nguyễn Văn A', date: '2024-06-10', total: 4500000, status: 1 },
        { id: 'DH002', customer: 'Trần Thị B', date: '2024-06-15', total: 6400000, status: 1 },
        { id: 'DH003', customer: 'Lê Văn C', date: '2024-06-20', total: 990000, status: 0 }, 
        { id: 'DH004', customer: 'Phạm Thị D', date: '2024-07-01', total: 7400000, status: 1 }, // Đã chỉnh tổng tiền
        { id: 'DH005', customer: 'Hoàng Văn E', date: '2024-07-10', total: 1850000, status: 0 }, 
    ];

    // 4. Dữ liệu Chi tiết Đơn hàng (dùng cho Thống kê)
    const orderDetailsList = [
        { orderId: 'DH001', productName: 'Vợt cầu lông Yonex Astrox 100 ZZ', quantity: 1, price: 4500000 },
        { orderId: 'DH002', productName: 'Vợt cầu lông Victor Thruster K BXR', quantity: 2, price: 3200000 },
        { orderId: 'DH004', productName: 'Vợt cầu lông Mizuno Caliber VS Tour', quantity: 1, price: 2900000 },
        { orderId: 'DH004', productName: 'Vợt cầu lông Yonex Astrox 100 ZZ', quantity: 1, price: 4500000 }, // Tổng DH004: 7,400,000
    ];

    // --- Các Hàm Chung & Tiện ích ---
    function closeModal(id) {
        document.getElementById(id).style.display = "none";
    }

    function formatCurrency(amount) {
        return amount.toLocaleString('vi-VN') + ' đ';
    }

    function calculateTotalRevenue(orders) {
        return orders.reduce((sum, order) => {
            return order.status === 1 ? sum + order.total : sum;
        }, 0);
    }

    function updateOverviewCards(totalProducts, totalUsers, totalRevenue = 0) {
        document.getElementById('amount-product').textContent = totalProducts;
        document.getElementById('amount-user').textContent = totalUsers;
        document.getElementById('Doanh-thu').textContent = formatCurrency(totalRevenue);
    }


    // --- 1. LOGIC SẢN PHẨM (Product) ---

    function showProduct() {
        const tableBody = document.getElementById('show-product');
        const searchInput = document.getElementById('form-search-product').value.toLowerCase();
        const categorySelect = document.getElementById('the-loai').value;

        let filteredProducts = productList.filter(product => {
            const nameMatch = product.name.toLowerCase().includes(searchInput);
            const categoryMatch = categorySelect === 'Tất cả' || product.type === categorySelect || (categorySelect === 'Đã xóa' && product.status === 0);
            const statusMatch = categorySelect === 'Đã xóa' || product.status === 1;

            return nameMatch && categoryMatch && statusMatch;
        });

        let html = '';
        filteredProducts.forEach((product, index) => {
            const statusText = product.status === 1 ? 'Kinh doanh' : 'Đã xóa';
            const statusClass = product.status === 1 ? 'status-complete' : 'status-no-complete';

            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td>${product.type}</td>
                    <td>${formatCurrency(product.price)}</td>
                    <td><span class="${statusClass}">${statusText}</span></td>
                    <td>
                        <button class="btn-action" onclick="openEditProductModal(${product.stt})">Sửa</button>
                        <button class="btn-delete" onclick="openDeleteModal(${product.stt})">Xóa</button>
                    </td>
                </tr>
            `;
        });

        tableBody.innerHTML = html;
        
        // Cập nhật thẻ Tổng quan
        const totalRevenue = calculateTotalRevenue(orderList);
        updateOverviewCards(productList.length, userList.length, totalRevenue);
    }

    function resetSearchProduct() {
        document.getElementById('form-search-product').value = '';
        document.getElementById('the-loai').value = 'Tất cả';
        showProduct();
    }


// ***********************************
// *** LOGIC CRUD SẢN PHẨM BỔ SUNG ***
// ***********************************

// 1. Chức năng XÓA SẢN PHẨM (Soft Delete: Đổi status = 0)
function openDeleteModal(productId) {
    const deleteModal = document.getElementById('DeleteModal');
    const confirmButton = document.getElementById('ConfirmDeleteButton');
    const productNameDisplay = document.getElementById('ProductNameToDelete');

    if (!deleteModal || !confirmButton) return;  

    const product = productList.find(p => p.stt === productId);
    productNameDisplay.textContent = product.name;
    
    // GÁN HÀM XÓA KHI NHẤN NÚT XÁC NHẬN
    // Khi người dùng bấm nút 'XÓA', nó sẽ gọi hàm confirmDelete với ID của sản phẩm
    confirmButton.onclick = function() {
        deleteProduct(productId);
        closeModal('DeleteModal');
    };

    // Hiển thị Modal
    deleteModal.style.display = 'block';
}

function deleteProduct(id) {
    const productIndex = productList.findIndex(p => p.stt === id);
    if (productIndex !== -1) {
        // Chuyển trạng thái (status) sang 0 (Đã xóa)
        productList[productIndex].status = 0; 
        
        showProduct(); // Cập nhật bảng Sản phẩm
        thongke();    // Cập nhật lại Thống kê (phòng trường hợp sản phẩm này có trong chi tiết đơn hàng)
    }
}

// 2. Chức năng MỞ MODAL THÊM (Create)
function openAddProductModal() {
    const modalToOpen = document.getElementById('Modal');
    const btnSubmitForm = document.getElementById('ButtonSubmitForm');
    const modalTitle = document.getElementById('ModalTitle');
    const productForm = document.getElementById('ProductForm');
    
    if (modalToOpen) {
        // --- CÀI ĐẶT CHẾ ĐỘ THÊM ---
        if (modalTitle) modalTitle.textContent = "Thêm Sản Phẩm Mới";
        if (btnSubmitForm) btnSubmitForm.textContent = "Thêm";
        if (productForm) {
            productForm.reset(); 
            // DÒNG QUAN TRỌNG: Gán hàm xử lý submit form
            productForm.onsubmit = handleAddProductSubmit;
        }

        // --- HIỂN THỊ MODAL ---
        modalToOpen.style.display = 'block';
    }
}

function handleAddProductSubmit(event) {
    // NGĂN TRÌNH DUYỆT TẢI LẠI TRANG KHI SUBMIT
    event.preventDefault(); 

    // LẤY DỮ LIỆU TỪ CÁC TRƯỜNG INPUT
    const name = document.getElementById("ProductName").value.trim();
    const type = document.getElementById("ProductType").value.trim();
    const price = parseInt(document.getElementById("ProductPrice").value); // Chuyển sang số
    
    // KIỂM TRA DỮ LIỆU (Đảm bảo các trường bắt buộc đã được nhập)
    if (!name || !type || isNaN(price) || price <= 0) {
        alert("Vui lòng điền đầy đủ Tên, Hãng và Giá bán hợp lệ (> 0).");
        return; // Dừng hàm nếu dữ liệu không hợp lệ
    }

    // TÌM STT TIẾP THEO
    const newStt = productList.length > 0 ? Math.max(...productList.map(p => p.stt)) + 1 : 1;
    
    // TẠO ĐỐI TƯỢNG SẢN PHẨM MỚI
    const newProduct = {
        stt: newStt,
        name: name,
        type: type,
        price: price,
        status: 1, // Mặc định là đang hoạt động
    };

    // LƯU VÀO DANH SÁCH SẢN PHẨM (productList)
    productList.push(newProduct);
    
    // CẬP NHẬT GIAO DIỆN VÀ ĐÓNG MODAL
    showProduct(); // Gọi hàm hiển thị bảng Sản phẩm (cần có trong content.js)
    closeModal('Modal'); 
}

// 3. Chức năng MỞ MODAL SỬA (Update)
function openEditProductModal(id) {
    const product = productList.find(p => p.stt === id);
    if (!product) return alert("Không tìm thấy sản phẩm này.");

    const modalToOpen = document.getElementById('Modal');
    const btnSubmitForm = document.getElementById('ButtonSubmitForm');
    const modalTitle = document.getElementById('ModalTitle');
    const productForm = document.getElementById('ProductForm');

    if (!modalToOpen) return;

    // --- CÀI ĐẶT UI CHO CHẾ ĐỘ CHỈNH SỬA ---
    if (modalTitle) modalTitle.textContent = "Chỉnh Sửa Sản Phẩm";
    if (btnSubmitForm) btnSubmitForm.textContent = "Lưu Thay Đổi";

    // 3. Đổ dữ liệu sản phẩm vào Form
    if (productForm) {
        // Gán ID sản phẩm vào trường hidden để biết đang sửa sản phẩm nào
        document.getElementById('ProductID').value = product.stt; 
        
        // Đổ dữ liệu vào các trường nhập liệu
        document.getElementById('ProductName').value = product.name;
        document.getElementById('ProductType').value = product.type; 
        document.getElementById('ProductPrice').value = product.price;
        
        // --- GÁN LOGIC CẬP NHẬT DỮ LIỆU VÀO onsubmit ---
        productForm.onsubmit = function(event) {
            event.preventDefault(); // Ngăn trình duyệt tải lại trang

            // LẤY DỮ LIỆU MỚI TỪ FORM
            const updatedName = document.getElementById('ProductName').value.trim();
            const updatedType = document.getElementById('ProductType').value.trim();
            const updatedPrice = parseInt(document.getElementById('ProductPrice').value);
            
            // KIỂM TRA DỮ LIỆU BẮT BUỘC
            if (!updatedName || !updatedType || isNaN(updatedPrice) || updatedPrice <= 0) { 
                alert("LỖI CẬP NHẬT: Vui lòng điền đầy đủ Tên, Loại Sản phẩm và Giá bán hợp lệ (> 0).");
                return; 
            }

            // TÌM SẢN PHẨM TRONG MẢNG VÀ CẬP NHẬT THUỘC TÍNH
            const productIndex = productList.findIndex(p => p.stt === id);

            if (productIndex !== -1) {
                productList[productIndex].name = updatedName;
                productList[productIndex].type = updatedType;
                productList[productIndex].price = updatedPrice;
            }

            // LƯU VÀ CẬP NHẬT GIAO DIỆN
            showProduct(); 
            closeModal('Modal'); 
        };
    }
    modalToOpen.style.display = 'block';
}


    // --- 2. LOGIC KHÁCH HÀNG (User) ---

    function showUser() {
        const tableBody = document.getElementById('show-user');
        const searchInput = document.getElementById('form-search-user').value.toLowerCase();
        const statusSelect = parseInt(document.getElementById('tinh-trang-user').value);
        const timeStart = document.getElementById('time-start-user').value;
        const timeEnd = document.getElementById('time-end-user').value;

        let filteredUsers = userList.filter(user => {
            const searchMatch = user.fullName.toLowerCase().includes(searchInput) || user.contact.includes(searchInput);
            const statusMatch = statusSelect === 2 || user.status === statusSelect; 
            const dateMatchStart = !timeStart || user.joinDate >= timeStart;
            const dateMatchEnd = !timeEnd || user.joinDate <= timeEnd;

            return searchMatch && statusMatch && dateMatchStart && dateMatchEnd;
        });

        let html = '';
        filteredUsers.forEach((user, index) => {
            const statusText = user.status === 1 ? 'Hoạt động' : 'Bị khóa';
            const statusClass = user.status === 1 ? 'status-complete' : 'status-no-complete';
            const actionButtonText = user.status === 1 ? 'Khóa' : 'Mở khóa';
            const actionButtonClass = user.status === 1 ? 'btn-delete' : 'btn-action';

            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.fullName}</td>
                    <td>${user.contact}</td>
                    <td>${user.joinDate}</td>
                    <td><span class="${statusClass}">${statusText}</span></td>
                    <td>
                        <button class="${actionButtonClass}" onclick="openStatusModal(${user.stt}, ${user.status})">${actionButtonText}</button>
                        <button class="btn-detail" onclick="viewUserDetail(${user.stt})">Chi tiết</button>
                    </td>
                </tr>
            `;
        });

        tableBody.innerHTML = html;
        
        // Cập nhật thẻ Tổng quan
        const totalRevenue = calculateTotalRevenue(orderList);
        updateOverviewCards(productList.length, userList.length, totalRevenue);
    }

    function cancelSearchUser() {
        document.getElementById('form-search-user').value = '';
        document.getElementById('tinh-trang-user').value = 2;
        document.getElementById('time-start-user').value = '';
        document.getElementById('time-end-user').value = '';
        showUser();
    }

// Thay thế các hàm mẫu trong LOGIC KHÁCH HÀNG (User)

// 1. Chức năng KHÓA/MỞ KHÓA (Toggle Status)
function openStatusModal(userId, currentStatus) {
    const statusModal = document.getElementById('StatusModal');
    const confirmButton = document.getElementById('ConfirmStatusButton');
    const userDisplay = document.getElementById('UserToChangeStatus');
    const actionText = document.getElementById('StatusActionText');

    if (!statusModal || !confirmButton) {
        console.error("Lỗi: Modal Xác nhận Trạng thái không được tìm thấy.");
        return;
    }
    
    // Tìm khách hàng để lấy tên (Giả định userList là biến toàn cục)
    const user = userList.find(u => u.stt === userId);
    if (!user) return alert("Không tìm thấy khách hàng.");

    // Xác định hành động và trạng thái MỚI
    const action = currentStatus === 1 ? "KHÓA" : "MỞ KHÓA";
    const newStatus = currentStatus === 1 ? 0 : 1;
    
    // Cập nhật nội dung Modal
    document.getElementById('StatusModalTitle').textContent = `Xác nhận ${action} khách hàng?`;
    actionText.textContent = action;
    userDisplay.textContent = user.fullName;
    
    // Khi người dùng bấm nút 'XÁC NHẬN', nó sẽ gọi hàm changeUserStatus
    confirmButton.onclick = function() {
        changeUserStatus(userId, newStatus, action);
    };

    //Hiển thị Modal
    statusModal.style.display = 'block';
}

function changeUserStatus(id, newStatus, actionText) {
    // Giả định userList là biến toàn cục
    const userIndex = userList.findIndex(u => u.stt === id);
    
    if (userIndex !== -1) {
        // Cập nhật trạng thái
        userList[userIndex].status = newStatus; 
        
        // Cập nhật lại giao diện bảng Khách hàng
        showUser();
    }
    
    // Đóng Modal
    closeModal('StatusModal');
}

// 2. Chức năng MỞ MODAL THÊM (Create)
function openAddUserModal() {
    const userModal = document.getElementById('AddUserModal');
    const btnSubmitForm = document.getElementById('ButtonSubmitUserForm');
    const modalTitle = document.getElementById('AddUserModalTitle');
    const userForm = document.getElementById('AddUserForm');

    if (!userModal) return; 

    // --- CÀI ĐẶT UI CHO CHẾ ĐỘ THÊM ---
    if (modalTitle) modalTitle.textContent = "Thêm Khách Hàng Mới";
    if (btnSubmitForm) btnSubmitForm.textContent = "Thêm";
    
    if (userForm) {
        userForm.reset(); 
        
        // --- GÁN LOGIC LƯU DỮ LIỆU VÀO onsubmit ---
        userForm.onsubmit = function(event) {
            event.preventDefault(); // Ngăn trình duyệt tải lại trang

            // LẤY DỮ LIỆU
            const name = document.getElementById('UserName').value.trim();
            const phone = document.getElementById('UserPhone').value.trim();
            
            // KIỂM TRA DỮ LIỆU
            if (!name || !phone) { 
                alert("Vui lòng điền đầy đủ Tên và Số điện thoại.");
                return; 
            }

            // TÌM STT TIẾP THEO
            const newStt = userList.length > 0 ? Math.max(...userList.map(u => u.stt)) + 1 : 1;
            
            // TẠO ĐỐI TƯỢNG MỚI
            const newUser = {
                stt: newStt,
                fullName: name,
                contact: phone,
                joinDate: new Date().toISOString().slice(0, 10),
                status: 1 // Mặc định là đang hoạt động
            };

            // LƯU VÀO DANH SÁCH & CẬP NHẬT GIAO DIỆN
            userList.push(newUser);
            showUser(); // Cập nhật bảng Khách hàng
            closeModal('AddUserModal'); 
        };
    }

    // --- HIỂN THỊ MODAL ---
    userModal.style.display = 'block';
}

// 3. Chức năng XEM CHI TIẾT (View Detail)
function viewUserDetail(id) {
    alert(`Chức năng: Xem chi tiết Khách hàng ID ${id}`);
}


    // --- 3. LOGIC ĐƠN HÀNG (Order) ---

    function findOrder() {
        const tableBody = document.getElementById('show-order');
        const searchInput = document.getElementById('form-search-order').value.toLowerCase();
        const statusSelect = parseInt(document.getElementById('tinh-trang-order').value);
        const timeStart = document.getElementById('time-start').value;
        const timeEnd = document.getElementById('time-end').value;

        let filteredOrders = orderList.filter(order => {
            const searchMatch = order.id.toLowerCase().includes(searchInput) || order.customer.toLowerCase().includes(searchInput);
            const statusMatch = statusSelect === 2 || order.status === statusSelect; 
            const dateMatchStart = !timeStart || order.date >= timeStart;
            const dateMatchEnd = !timeEnd || order.date <= timeEnd;

            return searchMatch && statusMatch && dateMatchStart && dateMatchEnd;
        });

        let html = '';
        filteredOrders.forEach(order => {
            const statusText = order.status === 1 ? 'Đã xử lý' : 'Chưa xử lý';
            const statusClass = order.status === 1 ? 'status-complete' : 'status-no-complete';
            const currentStatus = order.status; // Lấy trạng thái hiện tại (0 hoặc 1)
            const buttonText = currentStatus === 1 ? 'Hủy' : 'Xử lý';

            html += `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.customer}</td>
                    <td>${order.date}</td>
                    <td>${formatCurrency(order.total)}</td>
                    <td><span class="${statusClass}">${statusText}</span></td>
                    <td>
                        <button class="btn-detail" onclick="viewOrderDetail('${order.id}')">Chi tiết</button>
                        <button onclick="showConfirmStatusModal('${order.id}', ${currentStatus})">${buttonText}</button>                   
                    </td>
                </tr>
            `;
        });

        tableBody.innerHTML = html;

        // Cập nhật thẻ Tổng quan (được gọi lại để đảm bảo trạng thái mới nhất)
        const totalRevenue = calculateTotalRevenue(orderList);
        updateOverviewCards(productList.length, userList.length, totalRevenue);
    }

    function cancelSearchOrder() {
        document.getElementById('form-search-order').value = '';
        document.getElementById('tinh-trang-order').value = 2;
        document.getElementById('time-start').value = '';
        document.getElementById('time-end').value = '';
        findOrder();
    }

// Chức năng XEM CHI TIẾT ĐƠN HÀNG
function viewOrderDetail(id) { 
   const order = orderList.find(o => o.id === id);
    if (!order) {
        alert("Không tìm thấy đơn hàng này.");
        return;
    }

    // 1. Lấy Modal
    const modal = document.getElementById('DetailOrder');
    if (!modal) return;

    // Lấy Chi tiết các mặt hàng của đơn hàng này
    const orderDetails = orderDetailsList.filter(detail => detail.orderId === id);
    
    let calculatedTotal = 0;
    let html = '';

    // 2. Tạo nội dung bảng chi tiết đơn hàng
    orderDetails.forEach((item, index) => {
        const lineTotal = item.quantity * item.price;
        calculatedTotal += lineTotal;
        
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.productName}</td>
                <td>${formatCurrency(item.price)}</td>
                <td>${item.quantity}</td>
                <td>${formatCurrency(lineTotal)}</td>
            </tr>
        `;
    });
    
    // Nếu không có chi tiết đơn hàng, hiển thị thông báo
    if (orderDetails.length === 0) {
        html = '<tr><td colspan="5" style="text-align: center; color: gray;">Không tìm thấy chi tiết sản phẩm cho đơn hàng này.</td></tr>';
    }


    // 3. Cập nhật Tiêu đề và Thông tin Đơn hàng
    
    // Tiêu đề
    document.getElementById('DetailModalTitle').textContent = `Chi Tiết Đơn Hàng #${order.id}`;

    // Thông tin Đơn hàng (Order_Info_Left)
    const statusText = order.status === 1 ? '<span class="status-complete">Đã xử lý</span>' : '<span class="status-no-complete">Chưa xử lý</span>';
    
    document.getElementById('infoOrderDate').textContent = order.date;
    document.getElementById('infoStatus').innerHTML = statusText;

    // Thông tin Người nhận (Order_Info_Right)
    // *Lưu ý: Giả định dữ liệu orderList có các trường 'customer', 'phone', 'address'
    document.getElementById('infoCustomerName').textContent = order.customer || 'N/A';
    document.getElementById('infoSDT').textContent = order.phone || 'N/A';
    document.getElementById('infoAddress').textContent = order.address || 'N/A';
    
    // 4. Cập nhật Bảng Sản phẩm và Tổng kết
    document.getElementById('ProductsTableBody').innerHTML = html;
    
    // Tổng Thanh Toán
    document.getElementById('summaryTotal').textContent = formatCurrency(calculatedTotal); 

    // 5. Hiển thị Modal
    modal.style.display = 'block';
}

// 1. Chức năng XỬ LÝ/HỦY ĐƠN HÀNG (Toggle Status)
function showConfirmStatusModal(id, currentStatus) {
    const order = orderList.find(o => o.id === id);
    if (!order) {
        alert("Không tìm thấy đơn hàng này.");
        return;
    }

    const modal = document.getElementById('ConfirmOrderStatusModal');
    const titleElement = document.getElementById('ConfirmStatusModalTitle');
    const actionTextElement = document.getElementById('StatusActionOrderText');
    const orderIdElement = document.getElementById('OrderToChangeStatus');
    const customerElement = document.getElementById('CustomerToChangeStatus');

    let actionName;
    
    // Đơn hàng đang ở trạng thái 'Chưa xử lý' (0), hành động tiếp theo là Xử lý (1)
    if (currentStatus === 0) {
        actionName = 'XỬ LÝ';
        titleElement.textContent = 'Xác nhận Xử lý Đơn hàng?';
    } 
    // Đơn hàng đang ở trạng thái 'Đã xử lý' (1), hành động tiếp theo là Hủy (0)
    else {
        actionName = 'HỦY';
        titleElement.textContent = 'Xác nhận HỦY Đơn hàng?';
    }
    
    // Cập nhật nội dung modal
    actionTextElement.textContent = actionName;
    orderIdElement.textContent = `#${order.id}`;
    customerElement.textContent = order.customer;
    
    modal.style.display = 'block';
}

function toggleOrderStatus(id, currentStatus) {
    // 1. Đóng modal xác nhận
    closeModal('ConfirmOrderStatusModal');

    // 2. Kiểm tra ID đơn hàng tạm thời
    if (!currentOrderIdForStatus) return;

    // 3. Tìm và cập nhật trạng thái đơn hàng
    const orderIndex = orderList.findIndex(o => o.id === currentOrderIdForStatus);
    if (orderIndex !== -1) {
        // Chuyển đổi trạng thái (0 -> 1 hoặc 1 -> 0)
        orderList[orderIndex].status = 1 - orderList[orderIndex].status;

        // 4. Reset ID tạm thời và làm mới giao diện
        currentOrderIdForStatus = null;
        
        // Giả sử hàm findOrder() làm mới bảng đơn hàng
        findOrder(); 
    }
}


    // --- 4. LOGIC THỐNG KÊ (Statistical) ---

    function thongke() {
        const tableBody = document.getElementById('show-tk');
        const searchInput = document.getElementById('form-search-tk').value.toLowerCase();
        const categorySelect = document.getElementById('the-loai-tk').value;
        const timeStart = document.getElementById('time-start-tk').value;
        const timeEnd = document.getElementById('time-end-tk').value;

        // 1. Lọc các Đơn hàng ĐÃ XỬ LÝ trong khoảng thời gian
        const completedOrders = orderList.filter(order => {
            const dateMatchStart = !timeStart || order.date >= timeStart;
            const dateMatchEnd = !timeEnd || order.date <= timeEnd;
            return order.status === 1 && dateMatchStart && dateMatchEnd;
        }).map(order => order.id); 

        // 2. Lọc Chi tiết Đơn hàng dựa trên các đơn hàng đã hoàn thành
        let filteredDetails = orderDetailsList.filter(detail => completedOrders.includes(detail.orderId));

        // 3. Tổng hợp dữ liệu thống kê theo Tên sản phẩm
        const statisticalData = filteredDetails.reduce((acc, detail) => {
            const existingProduct = acc.find(item => item.name === detail.productName);
            const productInfo = productList.find(p => p.name === detail.productName);
            const productType = productInfo ? productInfo.type : 'Không rõ';

            if (existingProduct) {
                existingProduct.quantitySold += detail.quantity;
                existingProduct.revenue += detail.quantity * detail.price;
            } else {
                acc.push({
                    name: detail.productName,
                    type: productType,
                    quantitySold: detail.quantity,
                    revenue: detail.quantity * detail.price,
                });
            }
            return acc;
        }, []);

        // 4. Áp dụng Tìm kiếm và Lọc trên dữ liệu đã Tổng hợp
        let finalData = statisticalData.filter(item => {
            const nameMatch = item.name.toLowerCase().includes(searchInput);
            const categoryMatch = categorySelect === 'Tất cả' || item.type === categorySelect;
            return nameMatch && categoryMatch;
        });

        // 5. Hiển thị dữ liệu và Cập nhật Thẻ Thống kê
        let totalQuantitySold = 0;
        let totalRevenueStat = 0;
        let html = '';

        finalData.forEach((item, index) => {
            totalQuantitySold += item.quantitySold;
            totalRevenueStat += item.revenue;
            
            html += `
                <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.quantitySold}</td> 
                <td>${formatCurrency(item.revenue)}</td>
                </tr>
            `;
        });

        tableBody.innerHTML = html;

        // Cập nhật các thẻ thống kê
        document.getElementById('quantity-product').textContent = finalData.length;
        document.getElementById('quantity-order').textContent = totalQuantitySold;
        document.getElementById('quantity-revenue').textContent = formatCurrency(totalRevenueStat);
    }

    function cancelSearchThongKe() {
        document.getElementById('form-search-tk').value = '';
        document.getElementById('the-loai-tk').value = 'Tất cả';
        document.getElementById('time-start-tk').value = '';
        document.getElementById('time-end-tk').value = '';
        thongke();
    }


    // --- LOGIC CHÍNH: KHỞI TẠO & CHUYỂN ĐỔI MENU ---

    document.addEventListener('DOMContentLoaded', () => {
        // Logic Chuyển đổi Menu
        const menuButtons = document.querySelectorAll('.admin-menu button');
        const sections = document.querySelectorAll('.section');
        document.getElementById('ConfirmActionButton').addEventListener('click', toggleOrderStatus);

        menuButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetSectionId = button.getAttribute('data-section');

                sections.forEach(section => {
                    section.classList.remove('active');
                });

                const targetSection = document.getElementById(targetSectionId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            });
        });

        // Khởi tạo hiển thị dữ liệu ban đầu cho tất cả các trang
        showProduct(); // Cập nhật tổng quan
        showUser();    // Cập nhật tổng quan
        findOrder();   // Cập nhật tổng quan
        thongke();
    });