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

//Funciones de la tabla CLiente
$(document).ready(function (){
    traerInformacionClientes();
});

//Funcione que trae la informacion de Client
function traerInformacionClientes(){
    $.ajax({
        url:"http://168.138.135.252:8080/api/Client/all", //colocar la http del modulo de la tabla CLIENT
        type:"GET",
        datatype:"JSON",
        success:function(respuestaC){
            console.log(respuestaC);
            pintarRespuestaClient(respuestaC);
        }
    });
}

//Funcione que pinta en cards la informacion de Client
function pintarRespuestaClient(respuestaC){
    let myTable="<table><thead><th>Nombre</th><th>Correo</th><th>Edad</th></thead>";
    for(i=0; i<respuestaC.length; i++){
        myTable += `<tr>
        <td>${respuestaC[i].name}</td>
        <td>${respuestaC[i].email}</td>
        <td>${respuestaC[i].age}</td>
        <td><button type="submit" class="btn btn-info btn-lg btn-responsive" onclick="actualizarElementoClient(${respuestaC[i].idClient})"><span class="glyphicon glyphicon-edit">Actualizar</button>
        <td><button type="submit" class="btn btn-info btn-lg btn-responsive" onclick="borrarElementoClient(${respuestaC[i].idClient})"><span class="glyphicon glyphicon-trash"></span>Borrar</button>
        </td>`;
    }
    myTable+="</table>";
    $("#resultadoClient").html(myTable);
}

//Funcion que guarda una nueva Client
function guardarElementoClient(){
    let myDataC={
        name:$("#nameClient").val(),
        email:$("#email").val(),
        age:$("#age").val(),
        password:$("#password").val()
    };
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myDataC),
        url:"http://168.138.135.252:8080/api/Client/save",
        success:function(responseC) {
            console.log(responseC);
            console.log("Se guardo correctamente");
            alert("Cliente se Guardo Correctamente");
            window.location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload();
            alert("Cliente no se guardo correctamente o email registrado con anterioridad");
        }
        });
}
//Funcion que actualiza un Client
function actualizarElementoClient(idElementoC){
    let myDataC={
        idClient:idElementoC,
        name:$("#nameClient").val(),
        email:$("#email").val(),
        age:$("#age").val(),
        password:$("#password").val()
    };
    console.log(myDataC);
    let dataToSend=JSON.stringify(myDataC);
    $.ajax({
        url:"http://168.138.135.252:8080/api/Client/update", //colocar la http del modulo de la tabla CLIENT
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuestaC){
            $("#resultadoClient").empty();
            $("#idClient").val("");
            $("#name").val("");
            $("#age").val("");
            $("#password").val("");
            traerInformacionClientes();
            alert("Cliente Actualizado con Exito");           
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload();
          alert("Cliente no se Guardo Correctamente");
        }
    });
}
//Funcion que borra un Client
function borrarElementoClient(idElementoC){
    let myDataC={
        idClient:idElementoC
    };
    let dataToSend=JSON.stringify(myDataC);
    $.ajax({
        url:"http://168.138.135.252:8080/api/Client/"+idElementoC,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuestaC){
            $("#resultadoClient").empty();
            traerInformacionClientes();
            alert("Cliente no se Borro Correctamente");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload();
          alert("Cliente no se Borro Correctamente");
        }
    });
}
