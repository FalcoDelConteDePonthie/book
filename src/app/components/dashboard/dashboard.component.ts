import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Prodotti} from '../../model/prodotti';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-book',
  template: `

    <!-- Main Content -->
    <div class="container">
      <div *ngIf="error" class="alert alert-danger">Error</div>
      <div class="row">
        <div class="col-lg-6 col-md-12 mx-0">
          <app-spinner *ngIf="!books"></app-spinner>
          <div class="search-book">
            <input
              type="text"
              class="form-control"
              name="search"
              [(ngModel)]="term"
              autocomplete="off"
              placeholder="&#61442; Cerca tramite titolo o autore..."
            >
          </div>
          <ul class="list-group">
            <li
              *ngFor="let book of books  | filter:term | paginate: {itemsPerPage: 5, currentPage: p}"
              class="list-group-item"
              [ngClass]="{'active': book.id === active?.id}"
              (click)="setActive(book)"
            >
              <img [src]="book.img ? book.img : '../../assets/img/copertineLibri/add.png'" class="img-thumbnail mr-2" alt="" width="40">
              {{book.title}} - {{book.author}}
              <div class="pull-right">
                <span [style.color]="book.price > 15 ? 'red' : null">€ {{book.price | number:'1.2-2'}}</span>
                <i class=" fa fa-info-circle ml-2" aria-hidden="true" [routerLink]="['/book', book.id]"></i>
                <i class="fa fa-trash ml-2" (click)="delete($event,book)"></i>
              </div>
            </li>
          </ul>
          <pagination-controls (pageChange)="p = $event"></pagination-controls>
        </div>
        <div class="col-lg-6 col-md12 mx-0">
          <app-form
            [active]="active"
            [books]="books"
            (resetClick)="reset()"
          >
          </app-form>
        </div>
      </div>
    </div>

    <hr>

  `,
  styles: [`
    .list-group-item {
      font-size: 0.75em;
    }

    .list-group-item.active {
      z-index: 2;
      color: #fff;
      background-color: darkorange;
      border-color: darkorange;
    }
    .search-book {
      max-width: 500px;
      padding-bottom: 10px;
      margin: auto;
      color: #405065;
    }

    .form-control {
      box-shadow: 0 10px 40px 0 #B0C1D9;
    }

    .form-control::placeholder {
      font-family: FontAwesome;
    }
  `]
})
export class DashboardComponent implements OnInit {
  books: Prodotti[];
  error: any;
  active: Prodotti;
  p = 1;
  term;

  constructor(private http: HttpClient, private bookService: ProductService) {
  }

  getAll() {
    this.bookService.getAll()
      .subscribe((res: Prodotti[]) => {
          this.books = res;
        },
        err => this.error = err);
  }

  delete(event, book: Prodotti) {
    event.stopPropagation();
    // const index = this.books.indexOf(book);
    this.bookService.deleteBook(book)
      .subscribe(() => {
          const index = this.books.findIndex(b => b.id === book.id);
          this.books.splice(index, 1);
        },
        err => this.error = err
      );
    location.reload();
  }

  setActive(book: Prodotti) {
    this.active = book;
  }

  reset() {
    this.active = null;
  }

  ngOnInit(): void {
    this.getAll();
  }

}
