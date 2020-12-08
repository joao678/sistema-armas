import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListaProdutoComponent } from '../lista/lista.component';
import { Produto } from '../models/produto.model';
import { ProdutoService } from '../services/produto.service';
import { EnumEstados } from '../../../../utils/enums/EnumEstados';
import { CpfValidator } from 'src/app/utils/validators/CpfValidator';
import { DefaultErrorStateMatcher } from 'src/app/utils/validators/DefaultErrorStateMatcher';

@Component({
  selector: 'dialog-cadastro',
  templateUrl: './template-cadastro.component.html',
  styleUrls: ['./template-cadastro.component.scss']
})

export class ProdutoCadastroDialog {
    constructor(
      public dialogRef: MatDialogRef<ProdutoCadastroDialog>,
      @Inject(MAT_DIALOG_DATA) public data: { lista: ListaProdutoComponent, novo: boolean, Produto: Produto },
      private snackBar: MatSnackBar,
      private ProdutoService: ProdutoService
    ) {
      if(data.Produto) this.Produto = data.Produto;
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
      /*this.cpfFormControl,
      this.rgFormControl,
      this.sexoFormControl,
      this.estadoFormControl,
      this.cidadeFormControl,
      this.telefoneFormControl,
      this.dt_nascFormControl*/
    ];

    Produto: Produto = { 
      id: null,
      nome: '',
      id_grupo_produto: null,
      nr_serie: '',
      ds_produto: '',
      inf_adicionais: '',
      id_fornecedor: null,
      valor_unitario: null,
      id_situacao: null,
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
          this.ProdutoService[this.Produto.id ? "updateProduto": "addProduto"](this.Produto,()=> {
            this.data.lista.pesquisarLista(true);
            this.snackBar.open(this.isNovo ? "Produto adicionada com sucesso!" : "Produto atualizada com sucesso!", "OK", {
              duration: 1600, horizontalPosition: "center", verticalPosition: "top"
            });
          },()=> {
            this.snackBar.open("Ocorreu um erro ao adicionar uma Produto", "OK", {
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