import { Component, OnInit } from '@angular/core';
import { AlbumesService } from 'src/app/api/albumes.service';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.page.html',
  styleUrls: ['./my-reviews.page.scss'],
})
export class MyReviewsPage implements OnInit {

  myReviews = [];
  userId:any;

  constructor(private albumesService: AlbumesService) { }

  ngOnInit() {
    var user_stored = JSON.parse(localStorage.getItem('user'));
    this.userId = user_stored["id"];
    console.log(this.userId);
    this.albumesService.myReviews.subscribe(myReviews => {
      this.myReviews = myReviews;
    });
    
    this.albumesService.getReviews(this.userId)
  }

}
