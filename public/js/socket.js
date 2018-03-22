const HOST_URL = 'https://korest.herokuapp.com/';
var socket = io.connect('http://localhost:3000');

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
    console.log(listItems);
    for (var i = 0; i < listItems.length; i++) {
        console.log(listItems[i].id );
        var newList = '<div class="col-md-4"><ul id="' + listItems[i].id + '" class="connectedSortable sortable">';
        for(var j = 0; j < listItems[i].items.length; j++){
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
    console.log('Socket on from test frontend');
    console.log(data);
    populateLists(data);
});
var sortedList = [];
var parentName = '';
var lis = [];
$(function () {
    populateLists(arrayList);

    console.log('sortable');
    $(".sortable").sortable({
        connectWith: ".connectedSortable",
        stop: function () {
            sortedList = [];
            console.clear();
            showColumnHeaders();
            var listItems = $(".sortable li");
            listItems.each(function (li) {
                console.log($(this).parent()[0].id + " " + $(this).text());
                parentName = $(this).parent()[0].id;   
                lis.push($(this).text());              
                var newListObj = {
                    id: parentName,
                    items: lis
                }
                sortedList.push(newListObj);
            });
            
            console.log(sortedList);
            //Socket Emit
            socket.emit('test', { sortedList })
        }
    }).disableSelection();
});
