const HOST_URL = 'https://korest.herokuapp.com/';
//const HOST_URL = 'http://localhost:3000';
const API_URL_MEASURE = 'https://korest.herokuapp.com/api/measure/';
var socket = io.connect(HOST_URL);

var arrayList = [
    {
        id: 'todo',
        items: [
            {
                name: 'Item 1'
            },
            {
                name: 'Item 2'
            },
            {
                name: 'Item 3'
            }
        ]
    },
    {
        id: 'inProgress',
        items: [
            {
                name: 'Item 4'
            },
            {
                name: 'Item 5'
            },
            {
                name: 'Item 6'
            }
        ]
    },
    {
        id: 'completed',
        items: [
            {
                name: 'Item 7'
            },
            {
                name: 'Item 8'
            },
            {
                name: 'Item 9'
            }
        ]
    }
];

window.onload = function () {
    getData();
    showColumnHeaders()
};

function populateLists(listItems) {
    for (var i = 0; i < listItems.length; i++) {
        var newList = '<div class="col-md-4"><ul id="' + listItems[i].id + '" class="connectedSortable sortable">';
        for (var j = 0; j < listItems[i].items.length; j++) {
            newList += '<li class="ui-state-default">' + listItems[i].items[j].name + '</li>';
        }
        newList += '</ul></div>';
        document.getElementById("myLists").innerHTML += newList
    }
}

function showColumnHeaders() {
    var todoColumn = $("#todo li");
    vm.todo(todoColumn.length);

    var inProgressColumn = $("#inProgress li");
    vm.inProgress(inProgressColumn.length);

    var completedColumn = $("#completed li");
    vm.completed(completedColumn.length);
}
//Socket listen
socket.on('test', data => {
    var myNode = document.getElementById("myLists");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    populateLists(data.lista);
    InitSortable();

});


socket.on('new message', data => {

});

function InitSortable() {

    $(".sortable").sortable({
        connectWith: ".connectedSortable",
        stop: function () {
            CreateNewList();
        }
    }).disableSelection();
};

$(function () {
    populateLists(arrayList);

    $(".sortable").sortable({
        connectWith: ".connectedSortable",
        stop: function () {
            CreateNewList();
        }
    }).disableSelection();
});

function CreateNewList() {
    var sortedList = [];
    var newName = ''
    showColumnHeaders();
    var listItems = $(".sortable li");
    listItems.each(function (li) {
        if (newName != $(this).parent()[0].id) {
            var newParent = {};
            newName = $(this).parent()[0].id;
            newParent.id = newName;
            newParent.items = [];
            sortedList.push(newParent);
        }
        if (sortedList.length > 0) {
            var index = sortedList.findIndex(x => x.id == $(this).parent()[0].id);
            var newItem = {
                name: $(this).text()
            };
            sortedList[index].items.push(newItem);
        }
    });
    socket.emit('test', { lista: sortedList })
}

var canvas = document.getElementById('myChart');
var data = {
    labels: [],
    datasets: [
        {
            label: "Temperature",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "rgba(75,192,192,0.4)",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: [],
        },
        {
            label: "Humidity",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(186, 255, 188)",
            borderColor: "rgba(25, 160, 45)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(0, 140, 40)",
            pointBackgroundColor: "rgba(150, 255, 180)",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(4, 206, 61)",
            pointHoverBorderColor: "rgba(0, 140, 40)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: [],
        },
        {
            label: "Heat index",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(255, 189, 163)",
            borderColor: "rgba(216, 59, 23)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(216, 59, 23)",
            pointBackgroundColor: "rgba(255, 191, 191)",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255, 132, 132)",
            pointHoverBorderColor: "rgba(216, 59, 23)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: [],
        }
    ]
};

function addData(label, data) {
    myLineChart.data.labels.push(label);
    myLineChart.data.datasets.push(parseFloat(data));
    myLineChart.update();
}


function removeData() {
    if (myLineChart.data.datasets[0].data.length > 11) {
        myLineChart.data.labels.shift();
        myLineChart.data.datasets[0].data.shift();
        myLineChart.data.datasets[1].data.shift();
        myLineChart.data.datasets[2].data.shift();
        myLineChart.update();
    }
}

function updateChart(time, temp, hum, heatIndex) {
    var index = myLineChart.data.datasets[0].data.length;
    myLineChart.data.datasets[0].data[index] = parseFloat(temp);
    myLineChart.data.datasets[1].data[index] = parseFloat(hum);
    myLineChart.data.datasets[2].data[index] = parseFloat(heatIndex);
    myLineChart.data.labels[index] = time;
    myLineChart.update();
}

var option = {
    showLines: true
};
var myLineChart = Chart.Line(canvas, {
    data: data,
    options: option
});

function buttonclick(e) {
    var data = {
        Ledi: e.value
    };
    socket.emit('tempSensorServer', data);
}

socket.on('led', data => {
    SetButtonAndIcon(data.Ledii);
})

function SetButtonAndIcon(val) {
    if (val == true) {
        $("#iconLed").removeClass();
        $("#iconLed").addClass("far fa-lightbulb fa-2x");
        $("#ledBtn").removeClass();
        $("#ledBtn").addClass("btn btn-info");
        $("#ledBtn").html('OFF');
        $("#ledBtn").prop('value', false);
        $("#ledBtn").attr("disabled", false);
    }
    else if (val == false) {
        $("#iconLed").removeClass();
        $("#iconLed").addClass("fas fa-lightbulb fa-2x");
        $("#ledBtn").removeClass();
        $("#ledBtn").addClass("btn btn-success");
        $("#ledBtn").html('ON');
        $("#ledBtn").prop('value', true);
        $("#ledBtn").attr("disabled", false);
    }
    else {
        $("#iconLed").removeClass();
        $("#iconLed").addClass("fas fa-spinner fa-2x");
        $("#ledBtn").removeClass();
        $("#ledBtn").addClass("btn btn-warning");
        $("#ledBtn").html('Wait');
        $("#ledBtn").attr("disabled", true);
    }
}

socket.on('tempSensorUI', data => {
    $("#currentTemp").text();
    $("#currentTemp").text(data.Temperature);
    $("#currentHumid").text();
    $("#currentHumid").text(data.Humidity);
    $("#currentheatIndex").text();
    $("#currentheatIndex").text(data["Heat index"]);
    SetButtonAndIcon(data.Led);
    var currentdate = new Date();
    var datetime = currentdate.toString().substr(16, 8);
    updateChart(datetime, data.Temperature.substr(0, 5), data.Humidity.substr(0, 5), data["Heat index"].substr(9, 5));
    removeData();
    //insertSensorData(data);
});

function insertSensorData(data) {
   
            var measure = {
            "humidity": data.Humidity.substr(0, 5),
            "temperatureCelsius": data.Temperature.substr(0, 5),
            "temperatureFahrenheit": data.Temperature.substr(9, 5),
            "heatIndexCelsius": data["Heat index"].substr(0, 5),
            "heatIndexFahrenheit": data["Heat index"].substr(9, 5)
        };
    $.ajax({
        url: API_URL_MEASURE,
        type: 'POST',
        dataType: 'JSON',
        data: JSON.stringify(measure),
        contentType: "application/json",
        success: function (data) {
            console.log(data);
        }
    });
}