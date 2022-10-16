//Funcion para el fondo de pantalla
const main = () =>{
    let
    canvas = document.querySelector('canvas'),
    context = canvas.getContext('2d'),
    w = window.innerWidth,
    h = window.innerHeight,
    fontSize = 16,
    columns = Math.floor(w / fontSize),
    drops =[],
    str = 'JavaScript Matrix Effect',
    matrix = () => {
        context.fillStyle = 'rgba(0,0,5,.05)';
        context.fillRect(0,0,w,h);
        context.fontSize =`650 ${fontSize}px`;
        context.fillStyle = '#31d2f2';
        for (let i=0; i< columns; i++){
            let
              j = Math.floor(Math.random()*str.length),
              x = i*fontSize,
              y = drops[i]*fontSize;
            context.fillText(str[j],x,y);
            y >= canvas.height && Math.random() > 0.99
            ? drops[i]=0
            : drops[i]++;  
        };
    };
    canvas.width = w;
    canvas.height =h;
    for (let i=0; i< columns; i++){
        drops.push(0);
    };
    matrix(); setInterval(matrix, 15);
}; document.addEventListener('DOMContentLoaded', main);

//Funcion para traer el usuario de git 
$.get("/user", function (data) {
    $("#user").html(data.name);
    $(".unauthenticated").hide();
    $(".authenticated").show();
});
var logout = function () {
    $.post("/logout", function () {
        $("#user").html('');
        $(".unauthenticated").show();
        $(".authenticated").hide();
    });
    return true;
};

// Rutina para taer los Clientes a un <select>
function traerInformacionC(){
    $.ajax({
        url:"http://168.138.135.252:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaC){
            console.log(respuestaC);
            pintarRespuestaC(respuestaC);
        }
    });
}
$(document).ready(function (){
    traerInformacionC();
});

// Rutina para pintar los Clientes a un <select>
function pintarRespuestaC(respuestaC){
    var mylistaC=document.getElementById("resultadoC");
    for(i=0; i<respuestaC.length; i++){
        mylistaC.innerHTML+=`<option value="${respuestaC[i].idClient}">${respuestaC[i].name}</option>`;
    }
    console.log(mylistaC);
}

// Rutina para taer los Motorbikes a un <select>
function traerInformacionG(){
    $.ajax({
        url:"http://168.138.135.252:8080/api/Motorbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaG){
            console.log(respuestaG);
            pintarRespuestaG(respuestaG);
        }
    });
}
$(document).ready(function (){
    traerInformacionG();
});

// Rutina para pintar los Motorbike a un <select>
function pintarRespuestaG(respuestaG){
    var mylistaG=document.getElementById("resultadoG");
    for(i=0; i<respuestaG.length; i++){
        mylistaG.innerHTML+=`<option value="${respuestaG[i].id}">${respuestaG[i].name}</option>`;
    }
    console.log(mylistaG);
}

//Funciones de la tabla Reservation
$(document).ready(function (){
    traerInformacionReservation();
});

//Funcione que trae la informacion de Reservation
function traerInformacionReservation(){
    $.ajax({
        url:"http://168.138.135.252:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaReservation){
            console.log(respuestaReservation);
            pintarRespuestaReservation(respuestaReservation);
        }
    });
}

//Funcione que pinta la informacion de Reservation
function pintarRespuestaReservation(respuestaReservation){
    let myTable= '<div class="container"><div class="row">';
    for(i=0; i<respuestaReservation.length; i++){
        myTable+=`
        <div class="card text-black card border-danger bg-info mb-3" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Id Reserva: ${respuestaReservation[i].idReservation}</h5>
            <h5 class="card-subtitle">Fecha Inicio: ${respuestaReservation[i].startDate.substring(0, 10)}</h5>
            <h5 class="card-subtitle">Fecha Final: ${respuestaReservation[i].devolutionDate.substring(0, 10)}</h5>
            <h5 class="card-subtitle">Estado: ${respuestaReservation[i].status}</h5>
            <h5 class="card-title">Motorbike: ${respuestaReservation[i].motorbike.name}</h5>
            <h5 class="card-subtitle">Marca: ${respuestaReservation[i].motorbike.brand}</h5>
            <h5 class="card-subtitle">Año del Modelo: ${respuestaReservation[i].motorbike.year}</h5>
            <h5 class="card-title">Id Cliente: ${respuestaReservation[i].client.idClient}</h5>
            <h5 class="card-title">Nombre: ${respuestaReservation[i].client.name}</h5>
            <h5 class="card-subtitle">Correo: ${respuestaReservation[i].client.email}</h5>
            <button class="btn btn-danger" onclick="borrarElementoReservation(${respuestaReservation[i].idReservation})">Borrar</button>
            <button class="btn btn-success"  onclick="actualizarElementoReservation(${respuestaReservation[i].idReservation})">Actualizar</button>
        </div>
        </div>`;
    }
    myTable+='</div></div>';
    $("#resultadoReservation").append(myTable);
}

//Funcion que guarda una nueva Reservation
function guardarElementoReservation(){
    let myData={
        client:{idClient:document.getElementById("resultadoC").value},
        motorbike:{id:document.getElementById("resultadoG").value},
        startDate:$("#startDate").val = Date.now(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#resultadoEstado").val()
    };
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        url:"http://168.138.135.252:8080/api/Reservation/save",
        success:function(response) {
            console.log(response);
            console.log("La Reserva se Guardo Correctamente");
            alert("La Reserva se Guardo Correctamente");
            window.location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload();
            alert("La Reserva no se Guardo Correctamente");
        }
    });
}

//Funcion que actualiza una Reservation
function actualizarElementoReservation(idElemento){
    let myData={
        idReservation:idElemento,
        client:{idClient:document.getElementById("resultadoC").value},
        motorbike:{id:document.getElementById("resultadoG").value},
        startDate:$("#startDate").val = Date.now(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#resultadoEstado").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://168.138.135.252:8080/api/Reservation/update", //colocar la http del modulo de la tabla CLIENT
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoReservation").empty();
            $("#idReservation").val("");
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#resultadoEstado").val("");
            traerInformacionReservation();
            alert("Reserva Actualizada con Exito");            
        },
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload();
            alert("La Reserva no se Guardo Correctamente");
        }
    });
}

//Funcion que borra una Reservation
function borrarElementoReservation(idElemento){
    let myData={
        idReservation:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://168.138.135.252:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoReservation").empty();
            traerInformacionReservation();
            alert("Reserva Eliminada con Exito.");
        }
    });
}

