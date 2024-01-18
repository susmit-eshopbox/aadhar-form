import { Component } from '@angular/core';
import { AadharInfo } from '../aadhar.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: AadharInfo[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    // this.dataService.getUsers().subscribe((users) => (this.users = users));
    let a: any = localStorage.getItem('data');
    let data = JSON.parse(a);
    this.users = data;
  }

  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) {
  //     return;
  //   }
  //   this.heroService.addHero({ name } as Hero).subscribe((hero) => {
  //     this.heroes.push(hero);
  //   });
  // }

  delete(user: AadharInfo): void {
    this.users = this.users.filter((h) => h !== user);
    //this.dataService.deleteUser(user.id).subscribe();
    localStorage.setItem('data', JSON.stringify(this.users));
  }
}
