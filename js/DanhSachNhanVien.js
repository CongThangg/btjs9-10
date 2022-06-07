function DanhSachNhanVien() {
    this.mangNV = [];

    this.themNV = function (nv) {
        this.mangNV.push(nv)
    }

    this.timViTri = function (id) {

        var viTri = -1;

        this.mangNV.map(function (nv, index) {
            //duyệt từng nhân viên
            if (nv.taiKhoan === id) {
                viTri = index;
            }
        });

        return viTri;
    }

    this.xoaNV = function (id) {
        var viTriXoa = this.timViTri(id);
        if (viTriXoa > -1) {
            this.mangNV.splice(viTriXoa,1);
        }
    }

    this.capNhat = function (nv) {
        var viTriCapNhat = this.timViTri(nv.taiKhoan);
        if (viTriCapNhat > -1) {
            //tìm thấy
            this.mangNV[viTriCapNhat] = nv
        }
    };
}   

DanhSachSinhVien.prototype.timKiemTen = function(tenTK){
    var mangTK = [];
    var tenThuong = tenTK.toLowerCase();
    this.mangNV.map(function(nv){
        var tenNVThuong = nv.tenNV.toLowerCase();
        if(tenNVThuong.indexOf(tenThuong) > -1){
            mangTK.push(nv);
        }
    })

    return mangTK;

}