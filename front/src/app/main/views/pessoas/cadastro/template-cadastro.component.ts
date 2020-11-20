//private readonly API_URL = 'http://localhost:8080/api/tutorials';
import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListaComponent } from '../lista/lista.component';
import { Pessoa } from '../models/pessoa.model';
import { PessoaService } from '../services/pessoa.service';
import { EnumEstados } from '../../../../utils/enums/EnumEstados';

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

    cpfValidator = function():ValidatorFn {
          return (control: AbstractControl): Validators => {
            if(control.value == null) return { cpfNotValid: true };
            const cpf = control.value.replace('.','').replace('.','').replace('-','');
            if (cpf) {
              let numbers, digits, sum, i, result, equalDigits;
              equalDigits = 1;
              if (cpf.length < 11) {
              return null;
              }
    
              for (i = 0; i < cpf.length - 1; i++) {
                if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
                  equalDigits = 0;
                  break;
                }
              }
    
              if (!equalDigits) {
                numbers = cpf.substring(0, 9);
                digits = cpf.substring(9);
                sum = 0;
                for (i = 10; i > 1; i--) {
                  sum += numbers.charAt(10 - i) * i;
                }
    
                result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    
                if (result !== Number(digits.charAt(0))) {
                  return { cpfNotValid: true };
                }
                numbers = cpf.substring(0, 10);
                sum = 0;
    
                for (i = 11; i > 1; i--) {
                  sum += numbers.charAt(11 - i) * i;
                }
                result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    
                if (result !== Number(digits.charAt(1))) {
                  return { cpfNotValid: true };
                }
                return null;
              } else {
                return { cpfNotValid: true };
              }
          }
        return null;
      };
    }

    cpfFormControl = new FormControl('', [
      this.cpfValidator()
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