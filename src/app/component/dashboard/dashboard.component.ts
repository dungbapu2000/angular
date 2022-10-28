import { Component, OnInit } from '@angular/core';
import { Employees } from 'src/app/model/employees';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  employeesList: Employees[] = [];
  employeesObj: Employees = {
    id: '',
    fullname: '',
    email: '',
    mobile: '',
    photoURL:''
  };
  id: string = '';
  fullname: string = '';
  email: string = '';
  mobile: string = '';
  count: number = 0;
  photoURL:string='';

  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    this.getAllEmployees();
    this.countEmployees();
  }

  register() {
    this.auth.logout();
  }

  getAllEmployees() {
    this.data.getAllEmployees().subscribe(res => {

      this.employeesList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Lỗi khí lấy dữ liệu nhân viên');
    })
  }
  resetForm() {
    this.id = '';
    this.fullname = '';
    this.email = '';
    this.mobile = '';
    this.photoURL='';
  }

  addEmployees() {
    if (this.fullname == '' || this.mobile == '' || this.email == ''|| this.photoURL == '' ) {
      alert('Điền tất cả thông tin');
      return;
    }

    this.employeesObj.id = '';
    this.employeesObj.email = this.email;
    this.employeesObj.fullname = this.fullname;
    this.employeesObj.mobile = this.mobile;
    this.employeesObj.photoURL = this.photoURL;
    this.data.addEmployees(this.employeesObj);
    this.resetForm();

  }
  countEmployees() {
    this.count = this.auth.couter();
  }
  updateEmployees(employees: Employees) {
  }
  deleteEmployees(employees: Employees) {
    if (window.confirm('Bạn có muốn xóa nhân viên ' + employees.fullname + ' ?')) {
      this.data.deleteEmployees(employees);
    }
  }
}