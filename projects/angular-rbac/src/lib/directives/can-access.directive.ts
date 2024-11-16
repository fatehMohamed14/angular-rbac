import {
  Directive,
  inject,
  Input,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Abilities } from '../../shared/interfaces';
import { AngularRbacService } from '../../public-api';

@Directive({
  selector: '[canAccess]',
  standalone: true,
})
export class CanAccessDirective implements OnChanges {
  ngxRbacService = inject(AngularRbacService);
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input({ required: true }) canAccess!: Partial<Abilities>;
  @Input() canAccessOther?: TemplateRef<any>;
  ngOnChanges() {
    if (this.ngxRbacService.can(this.canAccess)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (this.canAccessOther) {
      this.viewContainer.createEmbeddedView(this.canAccessOther);
    } else {
      this.viewContainer.clear();
    }
  }
}
