//declaração da lista produtos e do objeto produto

var Produtos = [];
var Produto = null;

//função para novo produto, essa funçãoirá pegar todos os compnentes zera-los

function newProduto(){
	return {
		Codigo: "", Descricao: "", Marca: "", Medida: "", Custo: null, 
		Venda: null, Lucro: null, Controle: null, Minimo: null, Atual: null, Maximo: null
	}
}

//função para adicionar produto, cria um novo formulário

function adicionar(){
	Produto = newProduto()

	$("#form-cadastro").show()
	$("#form-listagem").hide()

	$("#ovTXT_codigo").val(Produto.Codigo)
	$("#ovTXT_descricao").val(Produto.Descricao)
	$("#ovTXT_marca").val(Produto.Marca)
	$("#ovTXT_medida").val(Produto.Medida)
	$("#ovTXT_custo").val(Produto.Custo)
	$("#ovTXT_venda").val(Produto.Venda)
	$("#ovTXT_lucro").val(Produto.Lucro)
	$("#ovTXT_controle").val(Produto.Controle)
	$("#ovTXT_minimo").val(Produto.Minimo)
	$("#ovTXT_atual").val(Produto.Atual)
	$("#ovTXT_maximo").val(Produto.Maximo)
}

//cancela noo formulário

function cancelar(){
	$("#form-cadastro").hide()
	$("#form-listagem").show()
}

//função salvar formulário, essa função irá salvar o que foi escrito no forumário no objeto produto

function salvar(){
	
	if (parseInt($("#ovTXT_minimo").val()) > parseInt($("#ovTXT_atual").val())){
		alert("O estoque atual deve ser maior que o estoque mínimo!!!")
		return;
	}
	if(parseInt($("#ovTXT_atual").val()) > parseInt($("#ovTXT_maximo").val())){
		alert("O estoque atual deve ser menor que o estoque máximo!!!")
		return;
	}



	if(Produto.Codigo == ""){
		Produto.Codigo = $("#ovTXT_codigo").val()
		Produto.Descricao = $("#ovTXT_descricao").val()
		Produto.Marca = $("#ovTXT_marca").val()
		Produto.Medida = $("#ovTXT_medida").val()
		Produto.Custo = $("#ovTXT_custo").val()
		Produto.Venda = $("#ovTXT_venda").val()
		Produto.Lucro = (Produto.Venda - Produto.Custo) * 100 / Produto.Custo
		Produto.Controle = $("#ovTXT_controle").val()
		Produto.Minimo = $("#ovTXT_minimo").val()
		Produto.Atual = $("#ovTXT_atual").val()
		Produto.Maximo = $("#ovTXT_maximo").val()

		Produtos.push(Produto)
		
	}

//testando se o produto já existe, se ele já existe apenas o código não será alterado

	else{

		Produtos.map(function(prod){
			if(prod.Codigo == Produto.Codigo){
				
				prod.Descricao = $("#ovTXT_descricao").val()
				prod.Marca = $("#ovTXT_marca").val()
				prod.Medida = $("#ovTXT_medida").val()
				prod.Custo = $("#ovTXT_custo").val()
				prod.Venda = $("#ovTXT_venda").val()
				prod.Lucro = (prod.Venda - prod.Custo) * 100 / prod.Custo
				prod.Controle = $("#ovTXT_controle").val()
				prod.Minimo = $("#ovTXT_minimo").val()
				prod.Atual = $("#ovTXT_atual").val()
				prod.Maximo = $("#ovTXT_maximo").val()	
			}

		})

	}
	
	carregarProdutos()

	$("#form-cadastro").hide()
	$("#form-listagem").show()
}

//função para mostrar a tela inicial (tabela de produtos)


function carregarProdutos(){
	

	$("#ovTR_produtos tbody").html("");//Apaga tudo dentro da tag <tbody>

	Produtos.map(function(prod){	
			$("#ovTR_produtos tbody").append(
				"<tr>" + 
				"   <td>" + prod.Codigo + "</td>" +
				"   <td>" + prod.Marca + "</td>" +
				"	 <td>" + prod.Venda + "</td>" +
				"    <td>" + Math.round(prod.Lucro) +"%"+ "</td>" +
				"    <td>" + prod.Minimo + "</td>" +
				"    <td>" + prod.Maximo + "</td>" +
				"    <td>" + prod.Atual + "</td>" +
				"   <td id'botoes'><button type='button' " + 
				"               class='btn btn-editar btn-secondary  ' " +
				"               data-codigo='"+ prod.Codigo + "'>Editar</button>" +
				"       <button type='button' " + 
				"               class='btn btn-remover btn-danger ' " +
				"               data-codigo='"+ prod.Codigo + "'>Remover</button>" + 					
				"   </td>" +
				"</tr>"
			)
	})
	
	excluir()
	editar()

}

//função para excluir um produto cadastrado

function excluir(){
	
	$(".btn-remover").each(function(){
		$(this).on("click", function(){
			var codigoProduto = $(this).attr("data-codigo")
			
			//opção 1 
			Produtos.map(function(prod){

				if(prod.Codigo == codigoProduto){
					var index = Produtos.indexOf(prod)
					Produtos.splice(index, 1)
					
				}
				carregarProdutos()

			})

		})

	})	
	
}

//função para editar produto na tebela, vai verificar os produtos existentes pelo código, e o código do que for ser editado irá puxar os outros elementos do produto

function editar(){
	
			
	$(".btn-editar").each(function(){
		$(this).on("click", function(){
			var codigoProduto = $(this).attr("data-codigo")
			
			
			for(var i = 0; i < Produtos.length; i++){
				if (Produtos[i].Codigo == codigoProduto){
					Produto = Produtos[i]
					$("#ovTXT_codigo").val(Produto.Codigo)
					$("#ovTXT_marca").val(Produto.Marca)
					$("#ovTXT_medida").val(Produto.Medida)
					$("#ovTXT_custo").val(Produto.Custo)
					$("#ovTXT_venda").val(Produto.Venda)
					$("#ovTXT_lucro").val(Produto.Lucro)
					$("#ovTXT_controle").val(Produto.Controle)
					$("#ovTXT_minimo").val(Produto.Minimo)
					$("#ovTXT_atual").val(Produto.Atual)
					$("#ovTXT_maximo").val(Produto.Maximo)
				}
			}
			
			$("#form-listagem").hide()
			$("#form-cadastro").show()
				
		})
				
	})	
	
}

$(document).ready(function(){
	$("#form-cadastro").hide()

	$(document).on("click", "#ovBTN_adicionar", adicionar)
	$(document).on("click", "#ovBTN_cancelar", cancelar)
	$(document).on("click", "#ovBTN_salvar", salvar)
})