// Retornar todos os hoteis
function getAll(){
    let url = 'http://127.0.0.1:5000/hoteis';
    let ajax = new XMLHttpRequest;
    ajax.open('GET', url, true);
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status = 200){
                console.log(JSON.parse(ajax.responseText));
            }
        }
    }
    ajax.send();
}

getAll();

// Pegar a partir do id
function getById(){

}

// Criar novos hoteis
function post(){

}

// Editar hoteis
function put(){

}

// Deletar hoteis
function remove(id){
    swal({
        title: "Deseja deletar",
        text: "Ao clicar em confirmar você ira deletar completamente o hotel, deseja continuar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Hotel deletado com sucesso!", {
            icon: "success",
          });
        }
      });
}