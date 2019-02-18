// Declaration of a variables
// The "inputState" id refers to field of the form containing a list of options
var mydiv = document.querySelector("#mydiv");
var SelectProm = document.querySelector("#inputState")


// We use fetch on the following link to call the API
fetch("http://api-students.popschool-lens.fr/api/promotions")
    // "response" gets the API back and transforms it into JSON
    // ".then" catches the JSON to stock it into "promo"
    .then(response => response.json())
    .then(function (promo) {
        // console.log(promo) will get the API in its entirety 
        // thus we precise we only want to reach the Hydra:member table
        console.log(promo["hydra:member"]);

        //
        listPromo = promo["hydra:member"];
        console.log(listPromo);
        // we want to display our promotions in the list of options (inputState)
        // so for each, we set a promotion.id to the option value
        // and fill the text with the promotion.id and its name
        listPromo.forEach(function (promotion) {
            SelectProm.innerHTML += "<option value=" + promotion.id + ">" + promotion.id + "." + promotion.name + "</li> <br> </option>";
        });
    });



// Declaration of an empty table to get the JSON datas back
// addPromo refers to the empty field (input)
// btnAddPromo refers to the button
var listPromo = [];
var addPromo = document.querySelector("#addPromo");
var btnAddPromo = document.querySelector("#btnAddPromo");



// When you click on this button, you call a createPromotion function
// This function catches the text written in the input field
btnAddPromo.addEventListener('click', createPromotion)
function createPromotion() {
    fetch("http://api-students.popschool-lens.fr/api/promotions", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        // we use the "POST" method on the fetch to add new promotions 
        // to the existing string and we use stringify to transform the 
        // text into a JSON string
        method: "POST",
        body: JSON.stringify({
            name: newPromo.value
        })
    })
        .then(response => response.json())
        .then(promo => {
            console.log(promo.name + "créé")
        })
        .catch()
}



// Declaration of a variable on the button Delete Promo
var btnDeletePromo = document.querySelector("#btnDeletePromo");
// We create an eventlistener with an anonymous function in parameter
btnDeletePromo.addEventListener('click', function () {
  let SelectProm = document.querySelector('#inputState')

  // We ask the user to confirm the deletion with a pop up
  if (confirm("Supprimer la promo : " + SelectProm.value + " ?")) {

    // The user confirm it so we run the DeletePromotion function
    deletePromotion(SelectProm.value);
  }
})

// This is the DeletePromotion function
function deletePromotion(idPromo) 
{
    fetch("http://api-students.popschool-lens.fr/api/promotions/" + idPromo, {
      method: "DELETE"
    })
      .then(function (response) {
        // You need to press ctrl+R to refresh the page
        // and see the changes
      });
}



// MODIFICATION
var btnModifyPromo = document.querySelector("#btnModifyPromo");
// We create an eventlistener with an anonymous function in parameter
btnModifyPromo.addEventListener('click', function () {
    let SelectProm = document.querySelector('#inputState')

    // The anonymous function ask to confirm the modification 
    if (confirm("Remplacer la promo : " + SelectProm.value + " ?")) {
        // Then the function run the modifyPromotion and replaces the text
        modifyPromotion(SelectProm.value);
    }
})

// This is the function used to replace the text in the API
// It catches the text written in the input field

function modifyPromotion(idPromo) {
    fetch("http://api-students.popschool-lens.fr/api/promotions/"+ idPromo ,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        // We use the "PUT" method on the fetch to modify the existing string
        method: "PUT",

        // We transform th value of the input newPromo into a JSON string with stringify
        body: JSON.stringify({
            name: newPromo.value
        })
    })
        .then(response => response.json())
        .then(promo => {
            console.log(promo.name + "modifié")
        })
        .catch()
}


// DISLPAYING THE STUDENTS

// When we click on the button ShowList
// We display the students of a specific promotion in #mydiv


var showList = document.querySelector("#btnShowList");
showList.addEventListener('click', getStudents);

// When we click on the button, we get the students table with fetch
function getStudents(event) {

    var students = [];
    var myDiv = document.querySelector("#mydiv");

    console.log(SelectProm.value)

 

        fetch("http://api-students.popschool-lens.fr/api/promotions/" + SelectProm.value)
        .then(response => response.json())
        .then(promotion => {
    
            // We display it into the console (raw datas)
            console.log(students)
            // We give a value to the students table (the value of the table within the object)
            // students = myjson.students;



        //    fetch("http://api-students.popschool-lens.fr" + studentURL)
        //    .then(r => r.json())
        //    .then(function(student) {  
    
    
            // We start to browse and display the students
            promotion.students.forEach(function (student) {
                console.log(student);
                myDiv.innerHTML += `<div class="card" style="width: 18rem;">
                <img class="card-img-top" src=".../100px180/" alt="">
                    <div class="card-body">
                    <h5 class="card-title"> ${student.firstname}</h5>
                    <p class="card-text">Nom : ${student.lastname}</p>
                    <p class="card-text">Nom : Sexe : ${student.sex}</p>
                    <a href="#" class="btn btn-primary id="btnDeleteCard">Delete</a> <a href="#" class="btn btn-primary" id="btnModifyCard">Modify</a>
                    </div>
                    </div>`
            });
        });
    }



