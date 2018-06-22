//const APITEMPURL = 'http://localhost:3000/api/measure/';
const APITEMPURL = 'https://korest.herokuapp.com/api/measure/';
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
        populateTable(data.docs);
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
            populateTable(data.docs);
            addPaginationButtons(data);
        }
    })
}

function populateTable(data) {
    $('#table').append(
        $('<thead>').attr('class', 'thead-dark').append(
            $('<th>').append(tableColumns[0].title),
            $('<th>').append(tableColumns[1].title),
            $('<th>').append(tableColumns[2].title),
            $('<th>').append(tableColumns[3].title),
            $('<th>').append(tableColumns[4].title),
            $('<th>').append(tableColumns[5].title),
            $('<th>').append(tableColumns[6].title),
            $('<th>').append(tableColumns[7].title)
        ),
        $('<tbody>')
    );
    $.each(data, function (index, value) {
        $('#table tbody').append(
            $('<tr>').append(
                $('<td>').append(value._id),
                $('<td>').append(value.humidity),
                $('<td>').append(value.temperatureCelsius),
                $('<td>').append(value.temperatureFahrenheit),
                $('<td>').append(value.heatIndexCelsius),
                $('<td>').append(value.heatIndexFahrenheit),
                $('<td>').append(value.led),
                $('<td>').append(value.measureDate)
            ))
    }
    );
}

function setPreviousButton(index) {
    if (index == 1) {
        $('#paginationButtons').append(
            $('<li>').attr('class', 'page-item disabled').append(
                $('<a>')
                    .attr('class', 'page-link')
                    .append('Previous')
            ));
    } else {
        $('#paginationButtons').append(
            $('<li>').attr('class', 'page-item').append(
                $('<a>')
                    .attr('class', 'page-link')
                    .append('Previous')
            ));
    }
}
function setButtons(data, index) {
    if (data == index) {
        $('#paginationButtons').append(
            $('<li>').attr('id', 'currentItem').attr('class', 'page-item active').append(
                $('<a>')
                    .attr('class', 'page-link')
                    .append(index)
            ));
    }
    else {
        $('#paginationButtons').append(
            $('<li>')
                .attr('class', 'page-item')
                .append(
                    $('<a>')
                        .attr('class', 'page-link')
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
                    .append('Next')
            ));
    } else {
        $('#paginationButtons').append(
            $('<li>').attr('class', 'page-item').append(
                $('<a>')
                    .attr('class', 'page-link')
                    .append('Next')
            ));
    }
}
function addPaginationButtons(data) {
    var offset = data.page;
    var limit = data.limit;
    var total = data.total;
    var iterator = 1
    //console.log(offset);
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
    $('#paginationButtons li.page-item a.page-link').on('click', function () {   
       //ustawic next buttona 
        if($(this).text() === 'Next'){
            var currentIndex = $('#paginationButtons').find('.active').text();
            console.log(currentIndex);
            $('#paginationButtons li').removeClass('active'); 
            var nextBtn = $("#paginationButtons li[name=2]");
            console.log($(nextBtn).text());
        }
        else{
            if ($(this).text() === 'Next' || $(this).text() === 'Previous') {
                return;
            } else {
                $('#paginationButtons li').removeClass('active'); 
                $(this).parent('#paginationButtons li').addClass('active');
                $('#table').empty();
                $('#paginationButtons').empty();
                fillTable($(this).text());
            }
        }       
    })
}
