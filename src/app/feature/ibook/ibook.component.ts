import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IbookService } from './service/ibook.service';

@Component({
  selector: 'app-ibook',
  templateUrl: './ibook.component.html',
  styleUrls: ['./ibook.component.scss']
})
export class IbookComponent implements OnInit {

  $status: Observable<boolean>;
  currentForm: FormGroup;

  constructor(private ibookService: IbookService) { }

  ngOnInit(): void {
    this.$status = this.ibookService._getWordSearchStatus;
  }

  setCurrentForm(form: FormGroup): void {
    this.currentForm = form;
  }

}
