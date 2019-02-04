import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { isPrerelease } from 'app/core/util/utils';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {
  public type: string = '';
  isPrerelease: boolean = false;
  trackingNumber: string = '';
  @Output() isConfirmed: EventEmitter<string> = new EventEmitter();
  constructor(public _dialogRef: MatDialogRef<PlaceOrderComponent>) { }

  ngOnInit() {
    this.isPrerelease = isPrerelease(environment.version);
  }

  placeOrder(): void {
    this._dialogRef.close();
    this.isConfirmed.emit();
  }
}
