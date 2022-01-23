import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export class CoreComponent implements OnDestroy{
  destroyed$ = new Subject<void>();

  constructor() { }

  ngOnDestroy() : void{
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
