import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainComponent } from './main/main.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ListaPessoaComponent } from './main/views/pessoas/lista/lista.component';
import { PessoaCadastroDialog } from './main/views/pessoas/cadastro/template-cadastro.component';

import { ListaProdutoComponent } from './main/views/produtos/lista/lista.component';
import { ProdutoCadastroDialog } from './main/views/produtos/cadastro/template-cadastro.component';

import { NgxMaskModule } from 'ngx-mask';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ListaPessoaComponent,
    ListaProdutoComponent,
    PessoaCadastroDialog,
    ProdutoCadastroDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule
  ],
  
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
