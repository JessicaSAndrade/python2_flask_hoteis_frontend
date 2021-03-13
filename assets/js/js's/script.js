// Retornar todos os hoteis
let url = 'http://127.0.0.1:5000/hoteis';
let urlBar = 'http://127.0.0.1:5000/hoteis/';
let ajax = new XMLHttpRequest;
let listHoteis = [];
var hotel = {};

function getAll(){
    ajax.open('GET', url, true);
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
              listHoteis.push(JSON.parse(ajax.responseText));
              tableInformation(false);
            }
        }
    }
    ajax.send();
}
getAll();

// Pegar a partir do id
function getById(){
  // Id enviado pelo usuario
  var id = document.getElementById('searchHoteis').value;
  if(id){  
    let urlId = urlBar + id;
    ajax.open('GET', urlId, true);
    ajax.onreadystatechange = function(){
      if(ajax.readyState == 4 && ajax.status == 200){
        listHoteis = [];
        listHoteis.push(JSON.parse(ajax.responseText));
        tableInformation(true);
      }
      else if(ajax.readyState != 4 && ajax.status != 200){
        setTimeout(function(){ location.reload(); }, 100);
      }
    }
    ajax.send();
  }
  else{
    setTimeout(function(){ location.reload(); }, 1000);
  }
}

function returnDataForm(){
  var listHotelData = document.getElementById('formHoteis').elements;
  var insertTrue = false;
  for (let i = 0; i < 5; i++) {
    if(listHotelData[i].value == undefined || 
      listHotelData[i].value == null || 
      listHotelData[i].value == ''){
      swal({
        title: "Oops...",
        text: "Você deixou campos vazios, analise novamente antes de salvar os dados",
        icon: "error",
      });
      insertTrue = true;
      return {};
    }
  }
  if(insertTrue == false){
    var returnListHotelData = {
      "hotel_id": listHotelData[0].value,
      "nome": listHotelData[1].value,
      "estrelas": listHotelData[2].value,
      "cidade": listHotelData[3].value,
      "diaria": listHotelData[4].value
    };
    return returnListHotelData;
  }
}

// Criar novos hoteis
function post(){
  var returnDataToFunction = returnDataForm();
  var id = returnDataToFunction['hotel_id']
  let urlId = urlBar + id;
  ajax.open('POST', urlId, true);
  ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  const parameters = new URLSearchParams({
    "hotel_id": returnDataToFunction['hotel_id'],
    "nome": returnDataToFunction['nome'],
    "estrelas": returnDataToFunction['estrelas'],
    "diaria": returnDataToFunction['diaria'],
    "cidade": returnDataToFunction['cidade']
  });
  ajax.send(parameters.toString());
  ajax.onreadystatechange = function(){
    if(ajax.readyState == 4 && ajax.status == 200){
      swal({
        title: "Eba...",
        text: "Hotel criado com sucesso!",
        icon: "success",
      });
    }
  }
}

// Editar hoteis
function put(){
  var returnDataToFunction = returnDataForm();
  var id = returnDataToFunction['hotel_id']
  let urlId = urlBar + id;
  ajax.open('PUT', urlId, true);
  ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  const parameters = new URLSearchParams({
    "hotel_id": returnDataToFunction['hotel_id'],
    "nome": returnDataToFunction['nome'],
    "estrelas": returnDataToFunction['estrelas'],
    "diaria": returnDataToFunction['diaria'],
    "cidade": returnDataToFunction['cidade']
  });
  ajax.send(parameters.toString());
  ajax.onreadystatechange = function(){
    if(ajax.readyState == 4 && ajax.status == 200){
      swal({
        title: "Eba...",
        text: "Hotel atualizado com sucesso!",
        icon: "success",
      });
    }
  }
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
        let urlId = urlBar + id;
        ajax.open('DELETE', urlId, true);
        ajax.onreadystatechange = function(){
          if(ajax.readyState == 4 && ajax.status == 200){
            swal("Hotel deletado com sucesso!", {
              icon: "success",
          });
          setTimeout(function(){ location.reload(); }, 2000);
          }else{
            swal("Erro ao deletar hotel, verifique se o identificador existe!", {
              icon: "error",
          });
          }
        }
        ajax.send();
      });
}

function tableInformation(notSearch){
  var tabela = document.querySelector(".table tbody");
  var tmplSource = document.getElementById("tableLista").innerHTML;
  var tmplHandle = Handlebars.compile(tmplSource);
  if(notSearch == true){
    for (var i = 0; i < listHoteis.length; i++) {
      var hotel = {};
      hotel.nome = listHoteis[0]['nome'];
      hotel.hotel_id =  listHoteis[0]['hotel_id'];
      hotel.estrelas =  listHoteis[0]['estrelas'];
      hotel.diaria =   listHoteis[0]['diaria'];
      hotel.cidade = listHoteis[0]['cidade'];

      while (tabela.firstChild) {
        tabela.removeChild(tabela.lastChild);
      }
    
      var row = {};
      row.template = document.createElement("template");;  
      row.template.innerHTML = tmplHandle(hotel)
      row.content = document.importNode(row.template.content, true);
  
      tabela.appendChild(row.content);
    }
  }
  else if(notSearch == false){
    for (var i = 0; i < listHoteis[0]['hoteis'].length; i++) {
      var hotel = {};
      hotel.nome = listHoteis[0]['hoteis'][i]['nome'];
      hotel.hotel_id =  listHoteis[0]['hoteis'][i]['hotel_id'];
      hotel.estrelas =  listHoteis[0]['hoteis'][i]['estrelas'];
      hotel.diaria =   listHoteis[0]['hoteis'][i]['diaria'];
      hotel.cidade = listHoteis[0]['hoteis'][i]['cidade'];
    
      var row = {};
      row.template = document.createElement("template");;  
      row.template.innerHTML = tmplHandle(hotel)
      row.content = document.importNode(row.template.content, true);
  
      tabela.appendChild(row.content);
    }
  }

}

