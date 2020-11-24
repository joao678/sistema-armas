//private readonly API_URL = 'http://localhost:8080/api/tutorials';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListaComponent } from '../lista/lista.component';
import { Pessoa } from '../models/pessoa.model';
import { PessoaService } from '../services/pessoa.service';
import { EnumEstados } from '../../../../utils/enums/EnumEstados';
import { CpfValidator } from 'src/app/utils/CpfValidator';

@Component({
  selector: 'dialog-cadastro',
  templateUrl: './template-cadastro.component.html',
  styleUrls: ['./template-cadastro.component.scss']
})

export class PessoaCadastroDialog {
    constructor(
      public dialogRef: MatDialogRef<PessoaCadastroDialog>,
      @Inject(MAT_DIALOG_DATA) public data: { lista: ListaComponent, novo: boolean, pessoa: Pessoa },
      private snackBar: MatSnackBar,
      private pessoaService: PessoaService
    ) {
      if(data.pessoa) this.pessoa = data.pessoa;
    }

    cpfFormControl = new FormControl('', [
      CpfValidator()
    ]);

    rgFormControl = new FormControl('', [
      Validators.required
    ]);

    static CpfErrorStateMatcher = class implements ErrorStateMatcher {
      isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
      }
    };

    pessoa: Pessoa = { 
      id: null,
      nome: '',
      cpf: '',
      rg: '',
      cidade: '',
      estado: null,
      endereco: '',
      telefone: '',
      celular: '',
      email: '',
      dt_nasc: new Date(),
      sexo: '',
      obs: '',
      created_at: '',
      updated_at: ''
    }; 

    isNovo: boolean = false;
    matcher = new PessoaCadastroDialog.CpfErrorStateMatcher();

    estadosValores = Object.values(EnumEstados).filter((val) => { return typeof val == 'number' })
    estadosSiglas = Object.values(EnumEstados).filter((val) => { return typeof val == 'string' })

    ngOnInit() {
      this.isNovo = this.data.novo;
      console.log(`Dialog config: ${this.data}`);

      this.dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.pessoaService[this.pessoa.id ? "updatePessoa": "addPessoa"](this.pessoa,()=> {
            this.data.lista.pesquisarLista(true);
            this.snackBar.open(this.isNovo ? "Pessoa adicionada com sucesso!" : "Pessoa atualizada com sucesso!", "OK", {
              duration: 1600, horizontalPosition: "center", verticalPosition: "top"
            });
          },()=> {
            this.snackBar.open("Ocorreu um erro ao adicionar uma pessoa", "OK", {
              duration: 1600, horizontalPosition: "center", verticalPosition: "top"
            });
          });
        }
      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
}