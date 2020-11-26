import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ListaDataSource } from './lista-datasource';
import { Pessoa } from '../models/pessoa.model'
import { PessoaService } from '../services/pessoa.service';
import { MatDialog } from '@angular/material/dialog';
import { PessoaCadastroDialog } from '../cadastro/template-cadastro.component';
import { SelectionModel } from '@angular/cdk/collections';
import { EnumEstados } from 'src/app/utils/enums/EnumEstados';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Pessoa>;
  dataSource: ListaDataSource;

  constructor(public pessoaService: PessoaService, public dialog: MatDialog) { }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nome', 'estado', 'cidade'];
  selection = new SelectionModel<Pessoa>(false, []);
  estadosSiglas = Object.values(EnumEstados).filter((val) => { return typeof val == 'string' })
  
  ngOnInit() {
    this.dataSource = new ListaDataSource(this.pessoaService);
  }

  pesquisarLista(refresh) {
    if(refresh) this.dataSource.data = this.pessoaService.getAllPessoas();
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

  editarPessoa(row) {
    this.dialog.open(PessoaCadastroDialog, { height: PessoaCadastroDialog.altura, width: PessoaCadastroDialog.largura, data: { lista: this, novo: false, pessoa: Object.assign({}, row) } });
  }

  abrirCadastroNovo() {
    this.dialog.open(PessoaCadastroDialog, { height: PessoaCadastroDialog.altura, width: PessoaCadastroDialog.largura, data: { lista: this, novo: true } });
  }
}
