function NhanVien(tknv, ten, email, mk, ngay, luong, chucVu, gio) {
    this.taiKhoan = tknv;
    this.tenNV = ten;
    this.email = email;
    this.matKhau = mk;
    this.ngayLam = ngay;
    this.luongCB = luong;
    this.chucVu = chucVu;
    this.gioLam = gio;
    this.tongLuong = 0;
    this.xepLoai = 0;


    this.tinhTongLuong = function () {
        switch (chucVu) {
            case 'Sếp':
                this.tongLuong = luong * 3;
                break;
            case 'Trưởng phòng':
                this.tongLuong = luong * 2;

                break;
            case 'Nhân viên':
                this.tongLuong = luong * 1;
                break;
            default:
                'vui lòng chọn vị trí'
                break;
        }
    }

    function loaiNV(){
        if(gio>= 192){
            return"Nhân viên xuất sắc"
        }else if (gio>= 176){
            return"Nhân viên giỏi"
        }else if(gio>= 160){
            return"Nhân viên khá"
        }else if(gio<160){
            return"Nhân viên trung bình"
        }else{
            return"Vui lòng nhập giờ làm"
        }}
        this.xepLoai = loaiNV();
    }
