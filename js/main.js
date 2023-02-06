
// Array chứa danh sách nhân viên
let staffList = getStaffList();
renderTable(staffList);

// Hàm thêm nhân viên
document.querySelector("#btnThemNV").addEventListener("click", () => {

    let tknv = getElement("#tknv").value;
    let name = getElement("#name").value;
    let email = getElement("#email").value;
    let password = getElement("#password").value;
    let datepicker = getElement("#datepicker").value;
    let luongCB = +getElement("#luongCB").value;
    let chucVu = getElement("#chucvu").value;
    let gioLam = +getElement("#gioLam").value;


    let isValid = validate();
    if (!isValid) {
        return;
    }

    const staff = new Staff(
        tknv,
        name,
        email,
        password,
        datepicker,
        luongCB,
        chucVu,
        gioLam
    );

    staffList.push(staff);

    renderTable(staffList);

    resetForm();

    storeStaffList()
})

document.querySelector("#btnThem").addEventListener("click", () => {
    getElement("#btnCapNhat").disabled = true;
})

// Hàm xóa Nhân viên theo tknv
function deleteNV(staffId) {
    staffList = staffList.filter((staff) => {
        return staff.tknv !== staffId;
    });

    renderTable(staffList);

    storeStaffList();
}

// Hàm tìm nhân viên theo id để fill thông tin lên form
function selectToUpdate(staffId) {
    let selectedStaff = staffList.find((staff) => {
        return staff.tknv === staffId;
    });

    getElement("#tknv").value = selectedStaff.tknv;
    getElement("#name").value = selectedStaff.name;
    getElement("#email").value = selectedStaff.email;
    getElement("#password").value = selectedStaff.password;
    getElement("#datepicker").value = selectedStaff.datepicker;
    getElement("#luongCB").value = selectedStaff.luongCB;
    getElement("#chucvu").value = selectedStaff.chucVu;
    getElement("#gioLam").value = selectedStaff.gioLam;

    getElement("#btnThemNV").disabled = true;
    getElement("#tknv").disabled = true;
    getElement("#btnCapNhat").disabled = false;
}

// Hàm cập nhật thông tin nhân viên
function updateStaff() {
    let tknv = getElement("#tknv").value;
    let name = getElement("#name").value;
    let email = getElement("#email").value;
    let password = getElement("#password").value;
    let datepicker = getElement("#datepicker").value;
    let luongCB = +getElement("#luongCB").value;
    let chucVu = getElement("#chucvu").value;
    let gioLam = +getElement("#gioLam").value;

    let isValid = validate();
    if (!isValid) {
        return;
    }

    const staff = new Staff(
        tknv,
        name,
        email,
        password,
        datepicker,
        luongCB,
        chucVu,
        gioLam
    );

    let index = staffList.findIndex((staff) => {
        return staff.tknv === tknv;
    });
    staffList[index] = staff

    renderTable(staffList);

    resetForm();

    storeStaffList()
}

// Hàm tìm kiếm sinh viên theo loại
function searchStaff() {
    let search = getElement("#searchName").value;

    let newStaffList = staffList.filter((staff) => {
        let chucVu = staff.chucVu.toLowerCase();
        search = search.toLowerCase();

        return chucVu.indexOf(search) !== -1;
    });

    renderTable(newStaffList);
}

function getElement(selector) {
    return document.querySelector(selector);
}

// Hàm hiển thị danh sách nhân viên ra table
function renderTable(staffList) {
    let html = staffList.reduce((output, staff) => {
        return (
            output +
            `
            <tr>
                <td>${staff.tknv}</td>
                <td>${staff.name}</td>
                <td>${staff.email}</td>
                <td>${staff.datepicker}</td>
                <td>${staff.chucVu}</td>
                <td>${staff.totalSalary()}</td>
                <td>${staff.rating()}</td>
                <td>
                    <button class="btn btn-primary" onclick="selectToUpdate('${staff.tknv}')" data-toggle="modal"
                    data-target="#myModal">Chỉnh sửa</button>
                    <button class="btn btn-danger" onclick="deleteNV('${staff.tknv}')">Xóa</button>
                </td>
            </tr>
            `
        );
    }, "")

    getElement("#tableDanhSach").innerHTML = html;
}

// Hàm reset giá trị input
function resetForm() {
    getElement("#tknv").value = "";
    getElement("#name").value = "";
    getElement("#email").value = "";
    getElement("#password").value = "";
    getElement("#datepicker").value = "";
    getElement("#luongCB").value = "";
    getElement("#chucvu").value = "";
    getElement("#gioLam").value = "";
    getElement("#btnThemNV").disabled = false;
    getElement("#tknv").disabled = false;

    let i = document.querySelectorAll(".sp-thongbao");
    i.forEach((element, index) => {
        element.innerHTML = "";
    });
}

// ==========================================================
// Validate input trước khi cho phép thêm/cập nhật nhân viên
function validate() {

    let i = document.querySelectorAll(".sp-thongbao");
    i.forEach((element, index) => {
        element.style.display = "block";
    });

    // mặc định ban đầu là form hợp lệ
    let isValid = true;

    let tbTKNV = getElement("#tbTKNV");
    let tbTen = getElement("#tbTen");
    let tbEmail = getElement("#tbEmail");
    let tbMatKhau = getElement("#tbMatKhau");
    let tbLuongCB = getElement("#tbLuongCB");
    let tbChucVu = getElement("#tbChucVu");
    let tbGiolam = getElement("#tbGiolam");

    //Kiểm tra tài khoản nhân viên
    let tknv = getElement("#tknv").value;
    if (!tknv.trim()) {
        isValid = false;
        tbTKNV.innerHTML = "Tài khoản nhân viên không được để trống!"

    } else if (!/^[0-9]{4,6}$/.test(tknv)) {
        isValid = false;
        tbTKNV.innerHTML = "Tài khoản nhân viên không hợp lệ!";
    } else {
        tbTKNV.innerHTML = "";
    }

    //Kiểm tra Tên nhân viên
    let name = getElement("#name").value;
    if (!name.trim()) {
        isValid = false;
        tbTen.innerHTML = "Tên nhân viên không được để trống!"
    } else if (!/^[a-zA-Z]+$/.test(name)) {
        isValid = false;
        tbTen.innerHTML = "Tên nhân viên không hợp lệ!"
    } else {
        tbTen.innerHTML = "";
    }

    // Kiểm tra email
    let email = getElement("#email").value;
    if (!email.trim()) {
        isValid = false;
        tbEmail.innerHTML = "Email không được để trống!"
    } else if (!/^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
        isValid = false;
        tbEmail.innerHTML = "Email không hợp lệ!";
    } else {
        tbEmail.innerHTML = "";
    }

    // Kiểm tra password
    let password = getElement("#password").value;
    if (!password.trim()) {
        isValid = false;
        tbMatKhau.innerHTML = "Mật khẩu không được để trống!";
    } else if (!/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20})/.test(password)) {
        isValid = false;
        tbMatKhau.innerHTML = "Mật khẩu sinh viên không hợp lệ!";
    } else {
        tbMatKhau.innerHTML = "";
    }

    // Kiểm tra Ngày làm
    let datepicker = getElement("#datepicker").value
    if (!datepicker.trim()) {
        isValid = false;
        getElement("#tbNgay").innerHTML = "Ngày làm không được để trống!";
    }

    //Kiểm tra Lương cơ bản
    let luongCB = getElement("#luongCB").value;
    if (!luongCB.trim()) {
        isValid = false;
        tbLuongCB.innerHTML = "Lương cơ bản không được để trống!";
    } else if (!(luongCB >= 1000000 && luongCB <= 20000000)) {
        isValid = false;
        tbLuongCB.innerHTML = "Nhập lương cơ bản không hợp lệ!";
    } else {
        tbLuongCB.innerHTML = "";
    }

    //Kiểm tra chức vụ
    let chucVu = getElement("#chucvu").value;
    if (!chucVu.trim()) {
        isValid = false;
        tbChucVu.innerHTML = "Chưa chọn chức vụ!"
    } else if (chucVu === "Chọn chức vụ") {
        isValid = false;
        tbChucVu.innerHTML = "Chưa chọn chức vụ!"
    } else {
        tbChucVu.innerHTML = "";
    }

    // Kiểm tra Giờ làm trong tháng
    let gioLam = getElement("#gioLam").value;
    if (!gioLam.trim()) {
        isValid = false;
        tbGiolam.innerHTML = "Giờ làm trong tháng không được để trống!";
    } else if (!(gioLam >= 80 && gioLam <= 200)) {
        isValid = false;
        tbGiolam.innerHTML = "Không hợp lệ!"
    } else {
        tbGiolam.innerHTML = "";
    }

    return isValid;
}

// ==========================================================
// Viết các hàm xử lý lưu/lấy thông tin danh sách nhân viên từ localStorage
function storeStaffList() {
    //Chuyển mảng staffList thành JSON
    const json = JSON.stringify(staffList);
    // lưu xuống localStorage với ksy staffList
    localStorage.setItem("staffList", json);
}

function getStaffList() {
    // Lấy data từ localStorage với key staffList 
    const json = localStorage.getItem("staffList");
    if (!json) {
        return [];
    }

    // Chuyển JSON thành array
    const staffList = JSON.parse(json);
    debugger
    for (let i = 0; i < staffList.length; i++) {
        const staff = staffList[i];
        staffList[i] = new Staff(
            staff.tknv,
            staff.name,
            staff.email,
            staff.password,
            staff.datepicker,
            staff.luongCB,
            staff.chucVu,
            staff.gioLam,
        );
    }
    return staffList;
}

