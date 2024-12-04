import { Component } from '@angular/core';
import {  HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'UniTracker';

  private xp = 0;
  private yp = 0;
  private xpDot = 0;
  private ypDot = 0;
  private mouseX = 0;
  private mouseY = 0;

  constructor() { }

  ngOnInit(): void {
    // Initialize the cursor movement logic
    setInterval(() => {
      this.xp += (this.mouseX - this.xp) / 15;
      this.yp += (this.mouseY - this.yp) / 15;
      this.updateCursorFollowerPosition();
    }, 10);

    setInterval(() => {
      this.xpDot += (this.mouseX - this.xpDot) / 20;
      this.ypDot += (this.mouseY - this.ypDot) / 20;
      this.updateCursorDotPosition();
    }, 10);
  }

  // Listen for mouse movement
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouseX = event.pageX;
    this.mouseY = event.pageY;
  }

  // Update the position of the cursor follower
  private updateCursorFollowerPosition(): void {
    const cursorFollower = document.querySelector(".cursorFollower") as HTMLElement;
    cursorFollower.style.left = `${this.xp}px`;
    cursorFollower.style.top = `${this.yp}px`;
  }

  // Update the position of the cursor dot
  private updateCursorDotPosition(): void {
    const cursorFollowerDot = document.querySelector(".cursorFollowerDot") as HTMLElement;
    cursorFollowerDot.style.left = `${this.xpDot}px`;
    cursorFollowerDot.style.top = `${this.ypDot}px`;
  }
}
