# Angular RBAC

angular-rbac is a lightweight role/permission based access control library to manage access to routes and components in your angular applications with ease.
angular-rbac provides:

- **Access structural directive** for DOM control based on roles and permissions.
- **Customized Access Guards** for routes protecting

## Setting roles and permissions

It is very easy to set roles and permissions to **angular-rbac** by passing a new value to abilities Subject inside AngularRbacService service. It is an action that you can do after login and after reload from your different sources **[http calls, store, localstorage]**. Example:

```typescript
import { Abilities, AngularRbacService } from 'angular-rbac';
...
export class AppComponent implements OnInit {
  rbacService = inject(AngularRbacService);
  currentUserAbilities: Abilities = {
    roles: ['owner', 'admin'],
    permissions: ['create-user', 'delete-user'],
  };
  ngOnInit(): void {
    this.rbacService.abilities$.next(this.currentUserAbilities);
  }
}
```

## DOM control through canAccess directive

```typescript
import { CanAccessDirective } from 'angular-rbac';
...
@Component({
  selector: 'moh-planets',
  standalone: true,
  imports: [
    CommonModule,
    CanAccessDirective,
  ],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.scss',
})
export class PlanetsComponent implements OnInit {}
```

**Template**

```tsx
<div
  *canAccess="{ roles: ['admin'], permissions: ['user-delete'] }; other: falseTemplate">
  <div>Protected users list here</div>
</div>

<ng-template #falseTemplate>
  <p>You do not have permission!</p>
</ng-template>
```

The directive takes 2 inputs:

- **abilities** (Required) of type `{
  roles: string[];
  permissions: string[];
}`
- **templateRef** (optional): to be visible in case of failed permission

## Route guards

angular-rbac provide 3 different quards :

- **canActivateAccessGuard** for routes activation [CanActivate](https://angular.dev/api/router/CanActivate)
- **canActivateChildAccessGuard** for children activation [CanActivateChild](https://angular.dev/api/router/CanActivateChild)
- **canMatchAccessGuard** for route loading based on condition [CanMatch](https://angular.dev/api/router/CanMatch)

angular-rbac guards accept 3 parameters :

- **candidate** (required):Partial<Abilities>; to define roles and permissions allowed to access a specific route.
- **redirectUrl** (optional):string; to define the redirectUrl when the guard return false, for instance **/login** or **/no-permission**
- **skipLocationChange** (optional): boolean; In case you want to stay on same route location but still navigate the redirectUrl correspondent component.

```typescript
import { Routes } from "@angular/router";
import { canActivateChildAccessGuard, canMatchAccessGuard } from "angular-rbac";

export const routes: Routes = [
  {
    path: "planet",
    component: LayoutComponent,
    loadChildren: () => import("./features/planet/planet.routes").then((routes) => routes.PLANET_ROUTES),
    canActivateChild: [canActivateChildAccessGuard({ roles: ["admin"], permissions: ["read-planets", "create-planets"] }, "/auth/login", true)],
  },
  {
    path: "auth",
    loadChildren: () => import("./core/auth/auth.routes").then((routes) => routes.AUTH_ROUTES),
  },
  {
    path: "",
    redirectTo: "/planet/list",
    pathMatch: "full",
  },
];
```

💡 **Unlike the other guards canMatchAccessGuard accepts only one parameter (candidate) since CanMatch will not load the route at all if the guard returns false;**

#### Example of canMatchAccessGuard

You can define multiple routes with same path and load only one based on the logged in user role

```typescript
export const routes: Routes = [
  {
    path: "home",
    loadComponent: () => import("./admin.component").then((m) => m.AdminComponent),
    canMatch: [canMatchAccessGuard({ roles: ["admin"] })],
  },
  {
    path: "home",
    loadComponent: () => import("./auditor.component").then((m) => m.AuditorComponent),
    canMatch: [canMatchAccessGuard({ roles: ["auditor"] })],
  },
  {
    path: "home",
    loadComponent: () => import("./visitor.component").then((m) => m.VisitorComponent),
    canMatch: [canMatchAccessGuard({ roles: ["visitor"] })],
  },
];
```
