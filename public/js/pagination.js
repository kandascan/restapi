const APITEMPURL = 'http://localhost:3000/api/measure/';
var tableColumns = [{
    field: '_id',
    title: 'ID'
}, {
    field: 'humidity',
    title: 'Humidity'
}, {
    field: 'temperatureCelsius',
    title: 'Temperature C'
}, {
    field: 'temperatureFahrenheit',
    title: 'Temperature F'
}, {
    field: 'heatIndexCelsius',
    title: 'Heat Index C'
}, {
    field: 'heatIndexFahrenheit',
    title: 'Heat Index F'
}, {
    field: 'led',
    title: 'Led'
}, {
    field: 'measureDate',
    title: 'Measure date'
},
];

$.ajax({
    url: APITEMPURL + 1 + '/' + 5,
    type: 'GET',
    dataType: 'JSON',
    success: function (data) {
        console.log(data);
        $('#table').bootstrapTable({ columns: tableColumns, data: data.docs });
        addPaginationButtons(data);
    }
})

function fillTable(index) {
    var page = parseInt(index);
    $.ajax({
        url: APITEMPURL + page + '/' + 5,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            console.log(data);
            $('#table').bootstrapTable({ columns: tableColumns, data: data.docs });
        }
    })
}

function setPreviousButton(index) {
    if (index == 1) {
        $('#paginationButtons').append(
            $('<li>').attr('class', 'page-item disabled').append(
                $('<a>')
                    .attr('class', 'page-link')
                    .attr('tabindex', '-1')
                    .append('Previous')
            ));
    } else {
        $('#paginationButtons').append(
            $('<li>').attr('class', 'page-item').append(
                $('<a>')
                    .attr('class', 'page-link')
                    .attr('tabindex', '-1')
                    .append('Previous')
            ));
    }
}
function setButtons(data, index) {
    if (data == index) {
        $('#paginationButtons').append(
            $('<li>').attr('class', 'page-item active').append(
                $('<a>')
                    .attr('class', 'page-link')
                    .attr('tabindex', '1')
                    .append(index)
            ));
    }
    else {
        $('#paginationButtons').append(
            $('<li>')
                .attr('class', 'page-item')
                .attr('onclick', fillTable(index))
                .append(
                    $('<a>')
                        .attr('class', 'page-link')
                        .attr('tabindex', '1')
                        .append(index)
                ));
    }
}
function setNextButton(index) {
    if (index == 1) {
        $('#paginationButtons').append(
            $('<li>').attr('class', 'page-item disabled').append(
                $('<a>')
                    .attr('class', 'page-link')
                    .attr('tabindex', '-1')
                    .append('Next')
            ));
    } else {
        $('#paginationButtons').append(
            $('<li>').attr('class', 'page-item').append(
                $('<a>')
                    .attr('class', 'page-link')
                    .attr('tabindex', '-1')
                    .append('Next')
            ));
    }
}
function addPaginationButtons(data) {
    var offset = data.offset;
    var limit = data.limit;
    var total = data.total;
    var iterator = 1
    setPreviousButton(offset);
    if (offset < 5) {
        iterator = 1;
    } else if (offset > total / limit) {
        iterator = total / limit - 2;
    }
    else {
        iterator = offset - 2;
    }
    for (var i = iterator; i < iterator + 5; i++) {
        setButtons(offset, i);
    }
    setNextButton(data);
}