import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [
    CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {
  showSnackBar(FILE_SIZE: string, DELAY: number, ERROR: string) {
    throw new Error('Method not implemented.');
  }

  public snackBarRef?: MatSnackBarRef<SnackbarComponent>;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data?: any
  ) { }

  public ngOnInit(): void {
    // console.log(`Here`, this.snackBarRef);
  }

}
