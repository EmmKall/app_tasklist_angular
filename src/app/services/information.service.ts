import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InformationService
{
  name$: EventEmitter< boolean > = new EventEmitter< boolean >();

  constructor() { }
}
