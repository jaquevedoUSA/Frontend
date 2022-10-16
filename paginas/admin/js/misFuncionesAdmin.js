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

//Funciones de la tabla Administrador
$(document).ready(function (){
    traerInformacionAdmin();
});

//Funcion que trae la informacion de la tabla Administrador
function traerInformacionAdmin(){
    $.ajax({
        url:"http://168.138.135.252:8080/api/Admin/all", //colocar la http del modulo de la tabla CLIENT
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaAdmin(respuesta);
        }
    });
}

//Funcion que pinta la informacion de la tabla Administrador
function pintarRespuestaAdmin(respuesta){
    let myTable="<table><thead><th>Nombre</th><th>Correo</th></thead>";
    for(i=0; i<respuesta.length; i++){
        myTable += `<tr>
        <td>${respuesta[i].name}</td>
        <td>${respuesta[i].email}</td>
        <td><button type="submit" class="btn btn-info btn-lg btn-responsive" onclick="actualizarElementoAdmin(${respuesta[i].id})"><span class="glyphicon glyphicon-edit">Actualizar</button>
        <td><button type="submit" class="btn btn-info btn-lg btn-responsive" onclick="borrarElementoAdmin(${respuesta[i].id})"><span class="glyphicon glyphicon-trash"></span>Borrar</button>
        </td>`;
    }
    myTable+="</table>";
    $("#resultadoAdmin").html(myTable);
}

//Funcion que  guarda la informacion de la tabla Administrador
function guardarElementoAdmin(){
    let myData={
        name:$("#nameAdmin").val(),
        email:$("#email").val(),
        password:$("#password").val()
    };
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        
        url:"http://168.138.135.252:8080/api/Admin/save",
       
        
        success:function(response) {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("El Administrador se Guardo Correctamente");
            window.location.reload();
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload();
            alert("El Administrador no se guardo correctamente");
    
    
        }
        });
}
//Funcion que actualiza la informacion de la tabla Administrador
function actualizarElementoAdmin(idElementoA){
    let myData={
        id:idElementoA,
        name:$("#nameAdmin").val(),
        email:$("#email").val(),
        password:$("#password").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://168.138.135.252:8080/api/Admin/update", //colocar la http del modulo de la tabla CLIENT
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoAdmin").empty();
            $("#idAdmin").val("");
            $("#name").val("");
            $("#email").val("");
            $("#password").val("");
            traerInformacionAdmin();
            alert("Administrador Actualizado con Exito");           
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload();
          alert("Administrador no se Guardo Correctamente");
        }
    });
}
//Funcion que borra la informacion de la tabla Administrador
function borrarElementoAdmin(idElementoA){
    let myData={
        id:idElementoA
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://168.138.135.252:8080/api/Admin/"+idElementoA,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoAdmin").empty();
            traerInformacionAdmin();
            alert("Administrador Borro Correctamente");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload();
          alert("Administrador no se Borro Correctamente");
        }
    });
}
