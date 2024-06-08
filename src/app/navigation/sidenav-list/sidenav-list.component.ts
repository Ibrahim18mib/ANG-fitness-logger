import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.scss',
})
export class SidenavListComponent implements OnInit {
  @Output() closeNavListener = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onclose() {
    console.log('closing event emiiter from sidenav');
    this.closeNavListener.emit();
  }
}
