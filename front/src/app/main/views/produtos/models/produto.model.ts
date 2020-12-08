export interface Produto {
    id: number;
    nome: string;
    id_grupo_produto: number;
    nr_serie: string;
    ds_produto: string;
    inf_adicionais: string;
    id_fornecedor: number;
    valor_unitario: number;
    id_situacao: number;

    created_at: string;
    updated_at: string;
  }