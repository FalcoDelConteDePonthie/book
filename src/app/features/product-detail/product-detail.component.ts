import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Prodotti} from '../../model/prodotti';
import {ProductService} from '../../service/product.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-book-detail',
  template: `
    <app-spinner *ngIf="!book"></app-spinner>
    <div *ngIf="book" class="row">
      <div class="col-lg-8 col-md-10 mx-auto">
        <div class="pull-right">
          <img class="img-thumbnail" width="350" [src]="book.img" [alt]="book.title">
        </div>
        <div class="post-preview">
          <h2 class="post-title">{{book.title}}</h2>
          <small class="post-meta">
            di {{book.author}}
          </small>
          <small class="post-subtitle">
            <br>
            € {{book.price | number: '1.2-2'}}
          </small>
          <small class="post-subtitle">
            <br>
            Isbn:  {{book.isbn}}
          </small>
          <p class="post-title bellottaFont">
            {{book.description | truncate: 850}}
          </p>
          <button class="btn btn-outline-warning btn-sm" (click)="goBack()">Go Back</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bellottaFont {
      font-family: 'Bellota', cursive;
    }

    .btn-group-sm > .btn, .btn-sm {
      padding: .25rem .5rem;
      font-size: .875rem;
      line-height: 1.5;
      border-radius: .2rem;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  book: Prodotti;

  constructor(
    private bookService: ProductService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.params.id;
    this.bookService.detailBook(id)
      .subscribe(res => {
        this.book = res;
      });
  }

}
