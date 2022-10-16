/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

let motoAReservar;
let validarFechai = false;
let validarFechaf = false;


$.ajax({
    url: "http://168.138.135.252:8080/api/Motorbike/" + localStorage.getItem("idMoto"),
    type: "GET",
    datatype: "JSON",
    contentType: "application/json",
    success: function (Moto) {

        pintarMotos(Moto);
        motoAReservar = Moto;
    },
    error: function (xhr, status) {
        alert('Ha sucedido un problema');
    }
});


function pintarMotos(Moto) {

    $("#nombre").val(Moto.name);
    $("#marca").val(Moto.brand);
    $("#modelo").val(Moto.year);

}


function dates() {

    /* let fechain = new Date($("#fechai").val().split("-").join("/")).toDateString();
     let fechafi = new Date($("#fechaf").val().split("-").join("/"));
     let fechaac = new Date().toDateString();
     
     if (fechain >= fechaac) {
     console.log("El dia es apto ");
     console.log(fechain);
     console.log(fechaac);
     } else {
     console.log("El dia no es apto");
     console.log(fechain);
     console.log(fechaac);
     } */

    let fechain = $("#fechai").val();
    let fechafi = $("#fechaf").val();

    let fechai = fechain.split("-");
    let fechaf = fechafi.split("-");

    let anoi = parseInt(fechai[0]);
    let mesi = parseInt(fechai[1]);
    let diai = parseInt(fechai[2]);

    let anof = parseInt(fechaf[0]);
    let mesf = parseInt(fechaf[1]);
    let diaf = parseInt(fechaf[2]);

    var fechaActual = new Date();
    var dd = fechaActual.getDate();
    var mm = fechaActual.getMonth() + 1;
    var yy = fechaActual.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    dd = parseInt(dd);
    mm = parseInt(mm);
    yy = parseInt(yy);

    validarFechai = false;
    validarFechaf = false;
    validarFechaI(yy, anoi, mesi, mm, diai, dd);
    validarFechaF(yy, anof, mesf, mesi, diaf, diai);
    realizarPeticion(fechain, fechafi);
}


//=================================================== PETICION
function realizarPeticion(fechain, fechafi) {


    if (validarFechaf && validarFechai) {

        let data = {
            idReservation: "",
            startDate: new Date(fechain),
            devolutionDate: new Date(fechafi),
            status: "En proceso",
            motorbike: {id: motoAReservar.id},
            client: {idClient: 1}  //localStorage.getItem("idCliente")
        };

        let dataToSend = JSON.stringify(data);
        console.log(dataToSend);

        $.ajax({
            url: "http://168.138.135.252:8080/api/Reservation/save",
            type: "POST",
            datatype: "JSON",
            data: dataToSend,
            contentType: "application/json",
            success: function () {
                $("#reserva").empty();
                let alerta;
                alerta = '<div class="alert alert-success w-50 mx-auto" role="alert">';
                alerta += '<h4 class="alert-heading">Felicitaciones!</h4>';
                alerta += '<p>Tu reserva de la moto ' + motoAReservar.name + ' ha sido exitosa.</p>';
                alerta += '</div>';
                alerta += '<br><a href="clienteScore.html" class="btn btn-outline-success" type="button">Ir a mis reservas</a>';
                $("#reserva").append(alerta);

            },
            error: function (xhr, status) {
                alert('Ha sucedido un problema');
            }
        });

    }
}

function ocultarAlertaFechaI() {
    $("#fechaiHelp").remove();
}

function ocultarAlertaFechaF() {
    $("#fechafHelp").remove();
}

function validarFechaI(yy, anoi, mesi, mm, diai, dd) {

    ocultarAlertaFechaI();
//Validar fecha inicial con respectoa la actual
    if (yy === anoi) {

        if (mesi >= mm) {

            if (mesi > mm) {
                console.log("El dia es apto");
                validarFechai = true;
            } else if (mesi === mm && diai >= dd) {
                console.log("El dia es apto");
                validarFechai = true;
            } else {
                console.log("El diai es menor al actual");

                let alerta;
                alerta = '<div id="fechaiHelp" class="form-text text-danger">El dia de la fecha de reserva es menor al actual</div>';
                $("#contenedorFechai").append(alerta);

            }
        } else {
            console.log("El mesi es menor al actual");

            let alerta;
            alerta = '<div id="fechaiHelp" class="form-text text-danger">El mes de la fecha de reserva es menor al actual</div>';
            $("#contenedorFechai").append(alerta);
        }
    } else {
        console.log("anoi diferente al actual");

        let alerta;
        alerta = '<div id="fechaiHelp" class="form-text text-danger">El año de la fecha de reserva es diferente al año actual</div>';
        $("#contenedorFechai").append(alerta);
    }
}

function validarFechaF(yy, anof, mesf, mesi, diaf, diai) {

    ocultarAlertaFechaF();

    //Validar fecha final con respectoa la inicial
    if (yy === anof) {

        if (mesf >= mesi) {

            if (mesf > mesi) {
                console.log("El dia es apto");
                validarFechaf = true;
            } else if (mesf === mesi && diaf > diai) {
                console.log("El dia es apto");
                validarFechaf = true;
            } else {
                console.log("El diaf es menor o igual al diai");

                let alerta;
                alerta = '<div id="fechafHelp" class="form-text text-danger">El dia de la fecha de entrega es menor o igual al dia de la reserva</div>';
                $("#contenedorFechaf").append(alerta);
            }
        } else {
            console.log("El mesf es menor al mesi");

            let alerta;
            alerta = '<div id="fechafHelp" class="form-text text-danger">El mes de la fecha de entrega es menor al mes de la reserva</div>';
            $("#contenedorFechaf").append(alerta);
        }
    } else {
        console.log("anof diferente al actual");

        let alerta;
        alerta = '<div id="fechafHelp" class="form-text text-danger">El año de la fecha de entrega es diferente al año actual</div>';
        $("#contenedorFechaf").append(alerta);
    }
}