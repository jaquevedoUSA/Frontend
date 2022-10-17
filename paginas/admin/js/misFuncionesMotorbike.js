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


var logout = function () {
    $.post("/logout", function () {
        $("#user").html('');
        $(".unauthenticated").show();
        $(".authenticated").show();
    });
    return true;
};

// Rutina para taer las categorias a un <select>
function traerInformacionC(){
    $.ajax({
        url:"http://168.138.135.252:8080/api/Category/all",
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

// Rutina para pinta las categorias a un <select> 
function pintarRespuestaC(respuestaC){
    var mylista=document.getElementById("resultadoC");
    for(i=0; i<respuestaC.length; i++){
        mylista.innerHTML+=`<option value="${respuestaC[i].id}">${respuestaC[i].name}</option>`;
    }
    console.log(mylista);
}

//Funciones de la tabla Motorbike
$(document).ready(function (){
    traerInformacionMotorbike();
});

//Funcione que trae la informacion de motorbike
function traerInformacionMotorbike(){
    $.ajax({
        url:"http://168.138.135.252:8080/api/Motorbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaMotorbike){
            console.log(respuestaMotorbike);
            pintarRespuestaMotorbike(respuestaMotorbike);
        }
    });
}

//Funcione que pinta en cards la informacion de motorbike
function pintarRespuestaMotorbike(respuestaMotorbike){
    let myTable= '<div class="container"><div class="row">';
    for(i=0; i<respuestaMotorbike.length; i++){
        myTable+=`
        <div class="card text-black card border-danger bg-info mb-3" style="width: 18rem;">
        <div class="card-body">
            <h4 class="card-title">Motorbike: ${respuestaMotorbike[i].name}</h4>
            <h5 class="card-subtitle">Marca: ${respuestaMotorbike[i].brand}</h5>
            <p class="card-text">Descrpcion: ${respuestaMotorbike[i].description}</p>
            <p class="card-text">Año del Modelo: ${respuestaMotorbike[i].year}</p>
            <button class="btn btn-danger" onclick="borrarElementoMotorbike(${respuestaMotorbike[i].id})"><span class="glyphicon glyphicon-trash"></span>Borrar</button>
            <button class="btn btn-success" onclick="actualizarElementoMotorbike(${respuestaMotorbike[i].id})"><span class="glyphicon glyphicon-edit">Actualizar</button>
        </div>
        </div>`;
    }
    myTable+='</div></div>';
    $("#resultadoMotorbike").append(myTable);
}
//Funcion que guarda un nuevo motorbike
function guardarElementoMotorbike(){
    let myData={
        category:{id:document.getElementById("resultadoC").value},
        name:$("#nameMotorbike").val(),
        brand:$("#brand").val(),
        description:$("#description").val(),
        year:$("#year").val()
    };
    console.log(myData);
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        url:"http://168.138.135.252:8080/api/Motorbike/save",
        success:function(response) {
            console.log(response);
            console.log("El Motorbike se Guardo Correctamente");
            alert("El Motorbike se Guardo Correctamente");
            window.location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload();
            alert("El Motorbike no se Guardo Correctamente");
        }
    });
}
//Funcion que actualiza un Motorbike
function actualizarElementoMotorbike(idElemento){
    let myData={
        id:idElemento,
        category:{id:document.getElementById("resultadoC").value},
        name:$("#nameMotorbike").val(),
        brand:$("#brand").val(),
        description:$("#description").val(),
        year:$("#year").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://168.138.135.252:8080/api/Motorbike/update", //colocar la http del modulo de la tabla CLIENT
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMotorbike").empty();
            $("#id").val("");
            $("#nameMotorbike").val("");
            $("#brand").val("");
            $("#description").val("");
            $("#year").val("");
            traerInformacionMotorbike();
            alert("Motorbike Actualizado con Exito");            
        }
    });
}
//Funcion que borra un Motorbike
function borrarElementoMotorbike(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://168.138.135.252:8080/api/Motorbike/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMotorbike").empty();
            traerInformacionMotorbike();
            alert("Motorbike Eliminado con Exito.");
        },
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload();
            alert("El Motorbike no se Elimino Correctamente");
        }
    });
}

