import { Routes } from '@angular/router';
import { ProductsComponent } from '../../pages/products/products.component';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'inventario',         component: TablesComponent },
    { path: 'productos',         component: ProductsComponent },
];
