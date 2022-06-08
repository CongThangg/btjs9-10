const dsnv = new DanhSachNhanVien();

const validation = new Validation();


function getELE(id) {
    return document.getElementById(id);
}

function setLocalStorage() {

    localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV));

}

function getLocalStorage() {
    if (localStorage.getItem("DSNV") != null) {
        //lấy được localStorage
        dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));

        hienThiTable(dsnv.mangNV)
    }
}

getLocalStorage();

function themNhanVien() {
    var tknv = getELE("tknv").value;
    var ten = getELE("name").value;
    var email = getELE("email").value;
    var mk = getELE("password").value;
    var ngay = getELE("datepicker").value;
    var luong = Number(getELE("luongCB").value);
    var chucVu = getELE("chucvu").value;
    var gio = getELE("gioLam").value;

    var nv = new NhanVien(tknv, ten, email, mk, ngay, luong, chucVu, gio);
    nv.tinhTongLuong();

    // thêm nhân viên vào mảng  
    dsnv.themNV(nv);

    hienThiTable();


    var isValid = true;

    //kiểm tra tài khảon
    isValid &= validation.kiemTraRong(tknv, "tbTKNV", "Tài khoản nhân viên không được để trống!")


    isValid &= validation.kiemTraRong(ten, "tbTen", "Tên nhân viên không được để trống!") && validation.kiemTraTen(ten, "tbTen", "Tên sinh viên phải là chữ!");

    //kiểm tra email
    isValid &= validation.kiemTraEmail(email, "tbEmail", "Email chưa đúng định dạng!");

    //kiểm tra password 
    isValid &= validation.kiemTraPass(mk, "tbMatKhau", "Mật khẩu phải có ít nhất 1 ký tự chữ, 1 in hoa, 1 số và từ 6-8 kí tự!");

    //kiểm tra lương

    //kiểm tra ngày
    isValid &= validation.kiemTraNgay(ngay, "tbNgay", " Ngày làm không để trống, định dạng mm/dd/yyyy!")

    // //Kiểm tra Chức vụ
    isValid &= validation.kiemTraChucVu("chucvu", "tbChucVu", "Vui lòng chọn chức vụ!");

    isValid &= validation.kiemTraLuong(luong, "tbLuongCB", " Lương cơ bản 1 000 000 - 20 000 000, không để trống!")

    //kiểm tra giờ làm 
    isValid &= validation.kiemTraGio(gio, "tbGiolam", "Số giờ làm trong tháng 80 - 200 giờ, không để trống!")



    // isValid == true
    if (isValid) {

        var nv = new NhanVien(tknv, ten, email, mk, ngay, luong, chucVu, gio);
        nv.tinhTongLuong();


        //thêm sinh viên vào mảng
        dsnv.themNV(nv);
        //Lưu trữ local storage
        setLocalStorage();
        //lấy dữ liệu từ localstorage
        getLocalStorage();

        // hienThiTable();
    }


}


function hienThiTable() {
    var content = "";
    dsnv.mangNV.map(function (nv, index) {
        var trELE = `<tr>
        <td>${nv.taiKhoan}</td>
        <td>${nv.tenNV}</td>
        <td>${nv.email}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tongLuong}</td>
        <td>${nv.xepLoai}</td>
        <td>
            <button onclick="xoaNhanVien('${nv.taiKhoan}')" class="btn btn-danger">Xóa</button>
            <button onclick="hienThiChiTiet('${nv.taiKhoan}')" data-toggle="modal" data-target="#myModal" class="btn btn-info">Xem</button>
        </td>
        </tr>`
        content += trELE;
    });
    getELE("tableDanhSach").innerHTML = content;

}

function xoaNhanVien(id) {
    dsnv.xoaNV(id);

    //khi mảng thay đổi thì hiển thị lại 
    hienThiTable();

    //Lưu trữ local storage
    setLocalStorage();
    //lấy dữ liệu từ localstorage
    getLocalStorage();
}

function hienThiChiTiet(id) {
    var viTri = dsnv.timViTri(id);

    if (viTri > -1) {

        getELE("tknv").value = dsnv.mangNV[viTri].taiKhoan;

        getELE("name").value = dsnv.mangNV[viTri].tenNV;
        getELE("email").value = dsnv.mangNV[viTri].email;
        getELE("password").value = dsnv.mangNV[viTri].matKhau;
        getELE("datepicker").value = dsnv.mangNV[viTri].ngayLam;
        getELE("luongCB").value = dsnv.mangNV[viTri].luongCB;
        getELE("chucvu").value = dsnv.mangNV[viTri].chucVu;
        getELE("gioLam").value = dsnv.mangNV[viTri].gioLam;
    }
}

function capNhatNhanVien() {
    var tknv = getELE("tknv").value;
    var ten = getELE("name").value;
    var email = getELE("email").value;
    var mk = getELE("password").value;
    var ngay = getELE("datepicker").value;
    var luong = Number(getELE("luongCB").value);
    var chucVu = getELE("chucvu").value;
    var gio = getELE("gioLam").value;

    var nv = new NhanVien(tknv, ten, email, mk, ngay, luong, chucVu, gio);
    nv.tinhTongLuong();

    dsnv.capNhat(nv);

    //Lưu trữ local storage
    setLocalStorage();
    //lấy dữ liệu từ localstorage
    getLocalStorage();

}

getELE("btnTimNV").onclick = function () {
    var tenTK = getElE("searchName").value;
    var mangTK = [];

    mangTK = dsnv.timKiemTen(tenTK);
    hienThiTable(mangTK);

    getELE("searchName").onkeyup = function () {
        var tenTK = getElE("searchName").value;
        var mangTK = [];

        mangTK = dsnv.timKiemTen(tenTK);
        hienThiTable(mangTK);
    }
}