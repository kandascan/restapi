const API_URL = 'https://korest.herokuapp.com/api/persons/';

$(function () {
    $(".sortable").sortable({
        connectWith: ".connectedSortable",
        stop: function( ) {
            var order = $("#sortable").sortable("serialize", {key:'order[]'});
            var listItems = $("#firstUl li");
            vm.todo(listItems.length);
            console.log(listItems.length);
        }
    }).disableSelection();
});

// $('.sortable').on('DOMSubtreeModified', function(event) {
//     console.log(event);
//     console.log('sort');
// });
window.onload = function () {
    getData();
};

var vm = {
    validates: ko.observableArray([]),
    persons: ko.observableArray([]),
    todo: ko.observable()
}

vm.addPerson = function () {
    vm.validates([]);
    var firstName = document.getElementById('txtFirstName').value;
    var lastName = document.getElementById('txtLastName').value;
    var age = document.getElementById('txtAge').value;
    var city = document.getElementById('txtCity').value;
    var validFields = [];
    if (firstName == '' || firstName == null) {
        vm.validates.push('First name is required');
    }
    else {
        validFields.push(true);
    }
    if (lastName == '' || lastName == null) {
        vm.validates.push('Last name is required');
    }
    else {
        validFields.push(true);
    }
    if (age == '' || age == null) {
        vm.validates.push('Age field is required');
    }
    else {
        validFields.push(true);
    }
    if (city == '' || city == null) {
        vm.validates.push('City field is required');
    }
    else {
        validFields.push(true);
    }
    if (validFields.length > 3) {
        var newPerson = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            city: city
        };
        insertData(newPerson);
        clearFormFields();
    }
    else {
        $('#validator').show();
    }
}

vm.removePerson = function (person) {
    removeData(person._id);
}

vm.increesAge = function (person) {
    person.age += 1;
    updateData(person);
}

vm.decreesAge = function (person) {
    person.age -= 1;
    updateData(person);
}

ko.applyBindings(vm, document.getElementById('person'));

var hideValidator = function () {
    $('#validator').fadeOut("slow");
}

function getData() {
    $.ajax({
        url: API_URL,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            var persons = ko.mapping.fromJSON(data);
            vm.persons(data);
        }
    });
}

function insertData(data) {
    $.ajax({
        url: API_URL,
        type: 'POST',
        dataType: 'JSON',
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (data) {
            getData();
        }
    });
}

function updateData(data) {
    $.ajax({
        url: API_URL + data._id,
        type: 'PUT',
        dataType: 'JSON',
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (data) {
            getData();
        }
    });
}

function removeData(id) {
    $.ajax({
        url: API_URL + id,
        type: 'DELETE',
        success: function (data) {
            getData();
        }
    });
}

function clearFormFields() {
    document.getElementById('txtFirstName').value = '';
    document.getElementById('txtLastName').value = '';
    document.getElementById('txtAge').value = '';
    document.getElementById('txtCity').value = '';
}