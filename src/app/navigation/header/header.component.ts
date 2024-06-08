import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Output() sidenavListener = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
  onSidenavToggle() {
    console.log('sidenav emitting from header');
    this.sidenavListener.emit();
  }
}
