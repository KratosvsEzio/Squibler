import { CoreComponent } from './../../../core/core.component';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddSectionComponent } from '../dialog-add-section/dialog-add-section.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent extends CoreComponent implements OnInit {

  @Output() currentForm: EventEmitter<FormGroup> = new EventEmitter();

  list = []
  ibookForm: FormGroup;
  sectionsStack = [];
  selectedSectionsStack = [];

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    super();
    this.setForm(this.fb.array([this.newSection('root')]))
  }

  setForm(formArray: FormArray) {
    this.ibookForm = this.fb.group({
      sections: formArray
    })
  }

  ngOnInit(): void {
    // this.list = this.currentSectionArray.value.map(section => section.sectionName.value)
  }

  get sections(): FormArray {
    return this.ibookForm.get('sections') as FormArray;
  } 

  getSectionName(form: any): string {
    return form.get('sectionName').value;
  }

  changeForm(action: string, form?: any): void {
    this.currentForm.emit(form);

    if(action == 'next') {
      this.sectionsStack.push(this.sectionsStack.length ? form?._parent : this.sections)
      this.selectedSectionsStack.push(form)
      this.setForm(form.get('subSection'));
      this.currentForm.emit(form);
    } else if(action == 'prev' && this.sectionsStack.length) {
      this.selectedSectionsStack.pop()
      this.currentForm.emit(this.selectedSectionsStack[this.selectedSectionsStack.length - 1] || undefined);
      this.setForm(this.sectionsStack.pop());
    }
  }

  newSection(name: string): FormGroup {
    return this.fb.group({
      sectionName: new FormControl(name, [Validators.required]),
      text: new FormControl(''),
      subSection: this.fb.array([]),
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddSectionComponent);

    dialogRef.afterClosed()
    .pipe(
      takeUntil(this.destroyed$)
    )
    .subscribe(result => {
      if(result) {
        const form = this.ibookForm.get('sections') as FormArray;
        form.push(this.newSection(result));
      }
    });
  }

}
