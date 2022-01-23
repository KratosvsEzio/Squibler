import { CoreComponent } from './../../../core/core.component';
import { IbookService } from './../service/ibook.service';
import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/models/word';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-word-lookup',
  templateUrl: './word-lookup.component.html',
  styleUrls: ['./word-lookup.component.scss']
})
export class WordLookupComponent extends CoreComponent implements OnInit {

  data: Word = null

  constructor(private ibookService: IbookService) { 
    super();
  }

  ngOnInit(): void {
    this.ibookService._getWordLookUP
    .pipe(
      takeUntil(this.destroyed$)
    )
    .subscribe((word: Word) => {
      this.data = word;
    })
  }

}
