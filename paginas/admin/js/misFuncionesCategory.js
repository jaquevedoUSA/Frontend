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
        $(".authenticated").hide();
    });
    return true;
};

//Funciones de la tabla Category
$(document).ready(function (){
    traerInformacionCategory();
});

//Funcione que trae la informacion de Category
function traerInformacionCategory(){
    $.ajax({
        url:"http://168.138.135.252:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaCategory){
            console.log(respuestaCategory);
            pintarRespuestaCategory(respuestaCategory);
        }
    });
}

//Funcione que pinta en cards la informacion de Category
function pintarRespuestaCategory(respuestaCategory){
    let myTable="<table>";
    for(i=0; i<respuestaCategory.length; i++){
        myTable += `<tr>
        <td>${respuestaCategory[i].name}</td>
        <td>${respuestaCategory[i].description}</td>
        <td><button type="submit" class="btn btn-info btn-lg btn-responsive" onclick="actualizarElementoCategory(${respuestaCategory[i].id})"><span class="glyphicon glyphicon-edit">Actualizar</button>
        <td><button type="submit" class="btn btn-info btn-lg btn-responsive" onclick="borrarElementoCategory(${respuestaCategory[i].id})"><span class="glyphicon glyphicon-trash"></span>Borrar</button>
        </tr>`;
    }
    myTable+="</table>";
    $("#resultadoCategory").html(myTable);
}
//Funcion que guarda una nueva Category
function guardarElementoCategory(){
    let myData={
        name:$("#nameCategory").val(),
        description:$("#description").val()
    };
    console.log(myData);
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        url:"http://168.138.135.252:8080/api/Category/save",
        success:function(response) {
            console.log(response);
            console.log("La Categoria se Guardo Correctamente");
            alert("La Categoria se Guardo Correctamente");
            window.location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload();
            alert("La Categoria no se Guardo Correctamente o no se puede repetir categorias");
        }
    });
}
//Funcion que actualiza una Category
function actualizarElementoCategory(idElemento){
    let myData={
        id:idElemento,
        name:$("#nameCategory").val(),
        description:$("#description").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://168.138.135.252:8080/api/Category/update", //colocar la http del modulo de la tabla CLIENT
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCategory").empty();
            $("#id").val("");
            $("#nameCategory").val("");
            $("#description").val("");
            traerInformacionCategory();
            alert("Categoria Actualizada con Exito");           
        }
    });
}
//Funcion que borra una Category
function borrarElementoCategory(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    //console.log(respuestaCategory);
    $.ajax({
        url:"http://168.138.135.252:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCategory").empty();
            traerInformacionCategory();
            alert("Categoria Eliminada con Exito.");
        }
    });
}

