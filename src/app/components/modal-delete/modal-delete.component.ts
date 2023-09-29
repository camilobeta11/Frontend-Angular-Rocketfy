import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent {

  @Input() id!: string;
  @Output() backModalDelete = new EventEmitter();

  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnDestroy() {
    if (this.unsubscribe$) {
      this.unsubscribe$.complete();
      this.unsubscribe$.next();
    }
  }

  deleteProduct(confirmation: boolean) {
    if (this.id && confirmation) {
      this.productService.deleteProduct(this.id).pipe(
        takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.router.navigate(['/products']);
        });
    }
    if(!confirmation) {
      this.backModalDelete.emit(false);
    }
  }

}
