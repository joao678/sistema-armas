import { Injectable } from '@angular/core';
import { Pessoa } from '../models/pessoa.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PessoaService {
  private readonly API_URL = 'http://localhost:8080/api/pessoas';
  constructor (public httpClient: HttpClient) {}

  /** CRUD METHODS */
  getAllPessoas(): Pessoa[] {
    var pessoas_array = new Array<Pessoa>();
    this.httpClient.get<Pessoa[]>(this.API_URL).subscribe(data => {
        data.forEach((p:Pessoa)=>{ pessoas_array.push(p) });
      }, (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });

      return pessoas_array;
  }
 
  addPessoa(pessoa: Pessoa, sucesso, erro) {
    this.httpClient.post<Pessoa>(this.API_URL, pessoa).subscribe(data => {
      sucesso();
    }, (error: HttpErrorResponse) => {
      erro();
    });
  }
  
  updatePessoa (pessoa: Pessoa,sucesso, erro): void {
    this.httpClient.put<Pessoa>(this.API_URL + `/${pessoa.id}`, pessoa).subscribe(data => {
      sucesso();
    }, (error: HttpErrorResponse) => {
      erro();
    });
  }

  /*deleteIssue (id: number): void {
    console.log(id);
  }*/
}