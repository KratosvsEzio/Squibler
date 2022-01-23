import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-add-section',
  templateUrl: './dialog-add-section.component.html',
  styleUrls: ['./dialog-add-section.component.scss']
})
export class DialogAddSectionComponent implements OnInit {

  sectionName: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
