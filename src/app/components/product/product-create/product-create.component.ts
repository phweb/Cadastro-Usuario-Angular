import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  formUsuario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  product: Product = {
    name: '',
    email: '',
    telefone: null,
    cep: null,
    cpf: null,
    bairro: '',
    complemento: '',
    uf :'', 
    localidade: '', 
    logradouro: '',
  }

  constructor(private productService: ProductService, private http: HttpClient,
      private router: Router) { }

  ngOnInit(): void {
    
  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Cadastro criado com sucesso!')
      this.router.navigate(['/products'])
    })

  }

  consultaCEP(cep, form) {
    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    if (cep != null && cep !== '') {
      this.http.get(`//viacep.com.br/ws/${cep}/json/`)
      .subscribe(dados => this.populaDadosForm(dados, form));
    }
  }

  populaDadosForm(dados, formulario) {
    /*formulario.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });*/

    formulario.form.patchValue({
      endereco: {
        logradouro: dados.logradouro,
        // cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        localidade: dados.localidade,
        uf: dados.uf
      }
    });

    console.log(formulario);
  }


  cancel(): void {
    this.router.navigate(['/products'])
  }
}
