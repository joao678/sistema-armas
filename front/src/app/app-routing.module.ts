import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPessoaComponent } from './main/views/pessoas/lista/lista.component';
import { ListaProdutoComponent } from './main/views/produtos/lista/lista.component';

const routes: Routes = [
  { path: 'pessoas', component: ListaPessoaComponent },
  { path: 'produtos', component: ListaProdutoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
