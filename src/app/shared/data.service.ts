import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
// import { FileMetaData } from '../model/file-meta-data';
import { Employees } from '../model/employees';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore, private fireStorage : AngularFireStorage) { }



  addEmployees(employees : Employees) {
    employees.id = this.afs.createId();
    return this.afs.collection('/Employees').add(employees);
  }

  getAllEmployees() {
    return this.afs.collection('/Employees').snapshotChanges();
  }

  deleteEmployees(employees : Employees) {
     this.afs.doc('/Employees/'+employees.id).delete();
  }

  updateEmployees(employees : Employees) {
    this.deleteEmployees(employees);
    this.addEmployees(employees);
  }
    
}