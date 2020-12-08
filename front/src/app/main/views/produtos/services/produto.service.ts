import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {
  private readonly API_URL = 'http://localhost:8080/api/produtos';
  constructor (public httpClient: HttpClient) {}

  /** CRUD METHODS */
  getAllProdutos(): Produto[] {
    var Produtos_array = new Array<Produto>();
    this.httpClient.get<Produto[]>(this.API_URL).subscribe(data => {
        data.forEach((p:Produto)=>{ Produtos_array.push(p) });
      }, (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });

      return Produtos_array;
  }
 
  addProduto(Produto: Produto, sucesso, erro) {
    this.httpClient.post<Produto>(this.API_URL, Produto).subscribe(data => {
      sucesso();
    }, (error: HttpErrorResponse) => {
      erro();
    });
  }
  
  updateProduto (Produto: Produto,sucesso, erro): void {
    this.httpClient.put<Produto>(this.API_URL + `/${Produto.id}`, Produto).subscribe(data => {
      sucesso();
    }, (error: HttpErrorResponse) => {
      erro();
    });
  }
}