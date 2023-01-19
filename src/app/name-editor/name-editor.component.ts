import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css'],
})
export class NameEditorComponent {
  name = new FormControl('susmit');

  // ngOnInit(): void {
  //   this.name.valueChanges.subscribe((n) => console.log(n));
  // }     // You can subscribe for changes in name.

  updateName() {
    this.name.setValue('Nancy');
  }
}
