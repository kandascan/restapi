const HOST_URL = 'https://korest.herokuapp.com/';
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
    console.log('socket fron');
    var myNode = document.getElementById("myLists");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    populateLists(data.lista);
    InitSortable();

});

socket.on('new message', data => {
    console.log(data);

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

function CreateNewList(){
    var sortedList = [];
    var newName = ''
    showColumnHeaders();
    var listItems = $(".sortable li");
    listItems.each(function (li) {
        if(newName != $(this).parent()[0].id){  
            var newParent = {};          
            newName = $(this).parent()[0].id;
            newParent.id = newName;
            newParent.items = [];
            sortedList.push(newParent);
        }
        if(sortedList.length > 0){
            var index = sortedList.findIndex(x => x.id == $(this).parent()[0].id);
            var newItem = {
                name: $(this).text()
            };
            sortedList[index].items.push(newItem);            
        }
    });

    //Socket Emit
    socket.emit('test', { lista:sortedList })
}