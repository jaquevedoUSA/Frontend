/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

let reservacionesCliente;
let cliente;
let estadoReserva;

$.ajax({
    url: "http://168.138.135.252:8080/api/Client/" + 1, //localStorage.getItem("idMoto"),
    type: "GET",
    datatype: "JSON",
    contentType: "application/json",
    success: function (Cliente) {

        reservacionesCliente = Cliente.reservations;
        cliente = Cliente;
        pintarReservas(Cliente.reservations);
    },
    error: function (xhr, status) {
        alert('Ha sucedido un problema');
    }
});

function pintarReservas(Reserva) {

    $("#tablaBody").empty();
    let Table;
    for (i = 0; i < Reserva.length; i++) {
        //console.log(Reserva[i].score);

        let fechaInicial = new Date(Reserva[i].startDate);
        let fechaFinal = new Date(Reserva[i].devolutionDate);
        let diaInicial = fechaInicial.getDate() + 1;
        let diaFinal = fechaFinal.getDate() + 1;

        fechaInicial.setDate(diaInicial);
        fechaFinal.setDate(diaFinal);

        Table += "<tr>";
        Table += "<td>" + Reserva[i].idReservation + "</td>";
        Table += "<td>" + fechaInicial.toLocaleDateString() + "</td>";
        Table += "<td>" + fechaFinal.toLocaleDateString() + "</td>";
        Table += "<td>" + Reserva[i].motorbike.name + "</td>";
        Table += "<td>" + Reserva[i].status + "</td>";
        if (Reserva[i].score !== null) {
            Table += "<td>" + Reserva[i].score.stars + "</td>";
        } else {
            Table += "<td>  -   </td>";
        }
        if (Reserva[i].status === "En proceso") {
            Table += "<td><button class='btn btn-outline-danger' type='button' onclick='confirmarCancelacion(" + i + ")'>Cancelar</button></td>";
        } else {
            Table += "<td>  -   </td>";
        }
        if (Reserva[i].status === "En proceso") {
            Table += "<td><button class='btn btn-outline-info' type='button' onclick='confirmarFinalizacion(" + i + ")'>Finalizar</button></td>";
        } else {
            Table += "<td>  -   </td>";
        }
        Table += "</tr>";
    }

    $("#tablaBody").append(Table);
}

function confirmarCancelacion(index) {
    var retVal = confirm("¿Seguro desea cancelar la reserva?");
    if (retVal === true) {
        calificarReserva(index);
        estadoReserva = "cancelled";
    }
}


function confirmarFinalizacion(index) {
    var retVal = confirm("¿Seguro desea finalizar la reserva?");
    if (retVal === true) {

        estadoReserva = "completed";

        //console.log(new Date(reservacionesCliente[index].devolutionDate));
        //console.log(new Date());

        if (new Date(reservacionesCliente[index].devolutionDate) < new Date()) {
            console.log("puede finalizar");
            calificarReserva(index);
        } else {
            console.log("No puede finalizar");
            alert("No puede finalizar la reserva, la fecha de terminacion de la reserva aun no ha caducado.");
        }
    }
}

function calificarReserva(index) {

    $("#textoInfo").text("Califica nuestro servicio");
    $("#tablaReservas").empty();
    let alerta;
    alerta += '<form class="justify-content-center align-items-center w-50 mx-auto" action="javascript:enviarCalificacion(' + index + ')">';
    alerta += '<div class="mb-3">';
    alerta += '<label for="stars" class="form-label">Calificacion</label>';
    alerta += '<input type="number" class="form-control" id="stars" placeholder="0 - 5" min="0" max="5" maxlength="1"  required>';
    alerta += '</div>';
    alerta += '<div class="mb-3">';
    alerta += '<label for="textoD" class="form-label">Comentarios</label>';
    alerta += '<textarea class="form-control" id="textoD" rows="3" required></textarea>';
    alerta += '</div>';
    alerta += '<button class="btn btn-outline-success" type="submit">Enviar calificacion</button>';
    alerta += '</form>';
    $("#tablaReservas").append(alerta);

}

function enviarCalificacion(index) {
    let data = {
        idScore: "",
        messageText: $("#textoD").val(),
        stars: $("#stars").val(),
        reservation: {idReservation: reservacionesCliente[index].idReservation}
    };

    let dataToSend = JSON.stringify(data);
    console.log(dataToSend);

    $.ajax({
        url: "http://168.138.135.252:8080/api/Score/save",
        type: "POST",
        datatype: "JSON",
        data: dataToSend,
        contentType: "application/json",
        success: function () {
            cancelarReserva(index);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        }
    }
    );
}

function cancelarReserva(index)
{


    let data = {
        idReservation: reservacionesCliente[index].idReservation,
        startDate: reservacionesCliente[index].startDate,
        devolutionDate: reservacionesCliente[index].devolutionDate,
        status: estadoReserva,
        motorbike: {id: reservacionesCliente[index].motorbike.id},
        client: {idClient: cliente.idClient}
    };
    let dataToSend = JSON.stringify(data);
    console.log(dataToSend);
    $.ajax({
        url: "http://168.138.135.252:8080/api/Reservation/update",
        type: "PUT",
        datatype: "JSON",
        data: dataToSend,
        contentType: "application/json",
        success: function () {
            $("#tablaReservas").empty();
            let alerta;
            alerta = '<div class="alert alert-success w-50 mx-auto" role="alert">';
            alerta += '<h4 class="alert-heading">Felicitaciones!</h4>';
            alerta += '<p>Tu reserva de la moto ' + reservacionesCliente[index].motorbike.name + ' ha cancelada.</p>';
            alerta += '</div>';
            $("#tablaReservas").append(alerta);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        }
    }
    );
}