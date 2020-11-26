import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListaComponent } from '../lista/lista.component';
import { Pessoa } from '../models/pessoa.model';
import { PessoaService } from '../services/pessoa.service';
import { EnumEstados } from '../../../../utils/enums/EnumEstados';
import { CpfValidator } from 'src/app/utils/validators/CpfValidator';
import { DefaultErrorStateMatcher } from 'src/app/utils/validators/DefaultErrorStateMatcher';

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

    public static altura: string = '750px';
    public static largura: string = '600px';
    
    cpfFormControl = new FormControl('', [CpfValidator(),Validators.required]);
    rgFormControl = new FormControl('', [Validators.required]);
    nomeFormControl = new FormControl('', [Validators.required]);
    sexoFormControl = new FormControl('', [Validators.required]);
    estadoFormControl = new FormControl('', [Validators.required]);
    cidadeFormControl = new FormControl('', [Validators.required]);
    telefoneFormControl = new FormControl('', [Validators.required]);
    dt_nascFormControl = new FormControl('', [Validators.required]);
    controles: FormControl[] = [
      this.nomeFormControl,
      this.cpfFormControl,
      this.rgFormControl,
      this.sexoFormControl,
      this.estadoFormControl,
      this.cidadeFormControl,
      this.telefoneFormControl,
      this.dt_nascFormControl
    ];

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
    matcher = new DefaultErrorStateMatcher();

    estadosValores = Object.values(EnumEstados).filter((val) => { return typeof val == 'number' })
    estadosSiglas = Object.values(EnumEstados).filter((val) => { return typeof val == 'string' })

    ngOnInit() {
      this.isNovo = this.data.novo;

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

    onOkClick(result): void {
      let isInvalid = !!this.controles.find(control => control.invalid);
      if(!isInvalid) {
        this.dialogRef.close(result);
      }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
}