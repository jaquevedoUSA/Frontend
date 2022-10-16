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

//Funcion para traer la informacion del reporte por status
function traerInformacionReporteStatus(){
    $.ajax({
        url:"http://168.138.135.252:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuestaRpS){
            console.log(respuestaRpS);
            pintarRespuestaReporteStatus(respuestaRpS);
        }
    });
}

//Funcion para pintar la informacion del reporte por status
function pintarRespuestaReporteStatus(respuestaRpS){
    let myTable="<h3>Estado Reservaciones</h3><table><thead><th>Reservas Completas</th><th>Reservas Canceladas</th></thead>";
        myTable += `<tr>
        <td>${respuestaRpS.completed}</td>
        <td>${respuestaRpS.cancelled}</td>
        </tr>`;
   
    myTable+="</table>";
    $("#resultadoReporteS").html(myTable);
}

//Funcion para traer la informacion del reporte entre fechas
function traerInformacionReporteFechas() {
    var inicialDate = document.getElementById("inicialDate").value;
    var finalDate = document.getElementById("finalDate").value;

    $.ajax({
        url: "http://168.138.135.252:8080/api/Reservation/report-dates/" + inicialDate + "/" + finalDate,
        type: "GET",
        datatype: "JSON",
        success: function (respuestaRpF) {
            console.log(respuestaRpF);
            pintarRespuestaReporteFechas(respuestaRpF);

        }
    });
}

//Funcion para pintar la informacion del reporte entre fechas
function pintarRespuestaReporteFechas(respuestaRpF){
    let myTable="<h3>Entre Fechas</h3><table><thead><th>Fecha Inicio</th><th>Fecha Fin</th><th>Estado</th><th>Cliente</th></thead>";
    for(i=0; i<respuestaRpF.length; i++){
        myTable += `<tr>
        <td>${respuestaRpF[i].startDate.substring(0, 10)}</td>
        <td>${respuestaRpF[i].devolutionDate.substring(0, 10)}</td> 
        <td>${respuestaRpF[i].status}</td>
        <td>${respuestaRpF[i].client.name}</td>
        </tr>`;
    }
    myTable+="</table>";
    $("#resultadoReporteF").html(myTable);
}

//Funcion para traer la informacion del reporte entre clientes
function traerInformacionReporteClient(){
    $.ajax({
        url:"http://168.138.135.252:8080/api/Reservation/report-clients", //colocar la http del modulo de la tabla CLIENT
        type:"GET",
        datatype:"JSON",
        success:function(respuestaRpC){
            console.log(respuestaRpC);
            pintarRespuestaReporteClientes(respuestaRpC);
        }
    });
}
//Funcion para pintar la informacion del reporte entre clientes
function pintarRespuestaReporteClientes(respuestaRpC){
    let myTable="<h3>Mejores Clientes</h3><table><thead><th>Total Reservas</th><th>Cliente</th><th>Correo</th><th>Edad</th></thead>";
    for(i=0; i<respuestaRpC.length; i++){
        myTable += `<tr>
        <td>${respuestaRpC[i].total}</td>
        <td>${respuestaRpC[i].client.name}</td>
        <td>${respuestaRpC[i].client.email}</td>
        <td>${respuestaRpC[i].client.age}</td>
        </tr>`;
    }
    myTable+="</table>";
    $("#resultadoReporteC").html(myTable);
}