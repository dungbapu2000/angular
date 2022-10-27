import { Component, OnInit } from '@angular/core';
import { Employees } from 'src/app/model/employees';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

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
    mobile: ''
  };
  id: string = '';
  fullname: string = '';
  email: string = '';
  mobile: string = '';

  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  // register() {
  //   this.auth.logout();
  // }

  getAllEmployees() {

    this.data.getAllEmployees().subscribe(res => {

      this.employeesList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching student data');
    })

  }

  resetForm() {
    this.id = '';
    this.fullname = '';
    this.email = '';
    this.mobile = '';
  }

  addEmployees() {
    if (this.fullname == '' || this.mobile == '' || this.email == '') {
      alert('Điền tất cả thông tin');
      return;
    }

    this.employeesObj.id = '';
    this.employeesObj.email = this.email;
    this.employeesObj.fullname = this.fullname;
    this.employeesObj.mobile = this.mobile;

    this.data.addEmployees(this.employeesObj);
    this.resetForm();

  }

  updateEmployees() {

  }

  deleteEmployees(employees: Employees) {
    if (window.confirm('Bạn có muốn xóa nhân viên ' + employees.fullname+ ' ?')) {
      this.data.deleteEmployees(employees);
    }
  }

}