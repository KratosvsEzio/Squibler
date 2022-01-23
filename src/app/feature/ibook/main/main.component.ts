import { CoreComponent } from './../../../core/core.component';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { IbookService } from './../service/ibook.service';
import { QuillConfig } from 'src/app/utility/configs/quillConfig';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends CoreComponent implements OnInit {
  @Input() currentForm: FormGroup

  constructor(private ibookService: IbookService) { 
    super();
  }

  ngOnInit(): void {
  }

  quillConfig = QuillConfig;

  onSelectionChanged = (event: any) =>{
    if(event.oldRange == null){
      this.onFocus();
    }
  }

  onFocus = () => {
    if(window.getSelection().toString()) { 
      const selectedWord = window.getSelection().toString();    // Selected word after double click
      this.ibookService.fetchWordInfo(selectedWord)             // requesting word loopup API call with selected word
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe((res) => {
        if(res) {
          this.ibookService.setWordSearchStatus(true);              // Setting status flag true for showing aside of word lookup
        }
      })
    }
  }

  removeSearchWord = () => {
    this.ibookService.setWordSearchStatus(false);
  }

}
