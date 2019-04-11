import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { DiaperService } from '../services/diaper.service';
import { Diaper, Size } from '../interfaces/diapers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  entryComponents:[ SnackbarComponent ]
})
export class HomeComponent implements OnInit {
  diapers: Diaper[] = [];

  durationInSeconds = 5;

  constructor(private diapersService: DiaperService, private snackBar: MatSnackBar) { }

  openSnackBar(diaper: Diaper, size: Size, quantity: number) {
    let order = {
      diaper_id: diaper._id,
      size: size.size,
      quantity: quantity
    };

    this.diapersService.postOrder(order)
    .subscribe((data) => {
      let ref = this.snackBar.openFromComponent(SnackbarComponent, {
        duration: this.durationInSeconds * 1000,
      });
      
      ref.instance.message = data.message;
      
      setTimeout(() => {
        this.diapersService.getDiaper(order.diaper_id)
        .subscribe((diaper) => {
          console.log(diaper);
          let size = diaper.sizes.filter((size) => size.size === order.size);
          size = size[0];
          console.log(size)

          let ref2 = this.snackBar.openFromComponent(SnackbarComponent, {
            duration: this.durationInSeconds * 1000,
          });
          
          ref2.instance.message = `This diaper is finished in ${size.time_to_zero} minutes`;
        });
      }, this.durationInSeconds * 1000);
    });
  }

  ngOnInit() {
    this.diapersService.getDiapers()
    .subscribe((data) => {
      this.diapers = data.rows.map((diaper) => {
        return diaper.value;
      });
    });
  }
}
