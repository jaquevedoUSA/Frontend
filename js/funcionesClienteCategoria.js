/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

let Categorias;
let Motos;

$.ajax({
    url: "http://168.138.135.252:8080/api/Category/all", //localStorage.getItem("idMoto"),
    type: "GET",
    datatype: "JSON",
    contentType: "application/json",
    success: function (Categoria) {

        Categorias = Categoria;
        pintarCategorias(Categorias);
    },
    error: function (xhr, status) {
        alert('Ha sucedido un problema');
    }
});


function pintarCategorias(Categoria) {

    $("#selectorCategoria").empty();

    let Table;
    Table += '<option selected>Selecciona una categoria</option>';

    for (i = 0; i < Categoria.length; i++) {

        Table += '<option value=' + Categoria[i].id + '>' + Categoria[i].name + '</option>';
    }

    $("#selectorCategoria").append(Table);
}


function cargarMotos() {


    let idCategory = $("#selectorCategoria").val();
    console.log(idCategory);

    $.ajax({
        url: "http://168.138.135.252:8080/api/Motorbike/all", //localStorage.getItem("idMoto"),
        type: "GET",
        datatype: "JSON",
        contentType: "application/json",
        success: function (Motos) {

            $("#tablaBody").empty();

            let Table;
            var process;

            for (i = 0; i < Motos.length; i++) {

                process = true;

                for (var j = 0; j < Motos[i].reservations.length; j++) {
                    console.log(Motos[i].reservations[j].status);
                    if (Motos[i].reservations[j].status === "En proceso") {
                        process = false;
                        break;
                    }
                }

                if (process && Motos[i].category.id.toString() === idCategory) {
                    Table += "<tr>";
                    Table += "<td>" + Motos[i].name + "</td>";
                    Table += "<td>" + Motos[i].brand + "</td>";
                    Table += "<td>" + Motos[i].year + "</td>";
                    Table += "<td>" + Motos[i].description + "</td>";
                    Table += "<td><a href='clienteReserva.html' class='btn btn-outline-success' type='button' onclick='guardarIdMoto(" + Motos[i].id + ")'>Reservar</a></td>";
                    Table += "</tr>";
                }

            }

            $("#tablaBody").append(Table);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        }
    });

}

function guardarIdMoto(id) {
    localStorage.setItem("idMoto", id);
}