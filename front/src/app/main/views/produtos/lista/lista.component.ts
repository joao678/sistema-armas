import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ListaDataSource } from './lista-datasource';
import { Produto } from '../models/produto.model'
import { ProdutoService } from '../services/produto.service';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoCadastroDialog } from '../cadastro/template-cadastro.component';
import { SelectionModel } from '@angular/cdk/collections';
import { EnumEstados } from 'src/app/utils/enums/EnumEstados';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaProdutoComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Produto>;
  dataSource: ListaDataSource;

  constructor(public ProdutoService: ProdutoService, public dialog: MatDialog) { }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nome', 'estado', 'cidade'];
  selection = new SelectionModel<Produto>(false, []);
  estadosSiglas = Object.values(EnumEstados).filter((val) => { return typeof val == 'string' })
  
  ngOnInit() {
    this.dataSource = new ListaDataSource(this.ProdutoService);
  }

  pesquisarLista(refresh) {
    if(refresh) this.dataSource.data = this.ProdutoService.getAllProdutos();
    setTimeout(() => {
      this.paginator._changePageSize(this.paginator.pageSize);
    }, 250);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.pesquisarLista(false);
  }

  editarProduto(row) {
    this.dialog.open(ProdutoCadastroDialog, { height: ProdutoCadastroDialog.altura, width: ProdutoCadastroDialog.largura, data: { lista: this, novo: false, Produto: Object.assign({}, row) } });
  }

  abrirCadastroNovo() {
    this.dialog.open(ProdutoCadastroDialog, { height: ProdutoCadastroDialog.altura, width: ProdutoCadastroDialog.largura, data: { lista: this, novo: true } });
  }
}
