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

        // listPromo declaration
        listPromo = promo["hydra:member"];
        console.log(listPromo);
        // we want to display our promotions in the list of options (inputState)
        // so for each, we set a promotion.id to the option value
        // and fill the text with the promotion.id and its name
        listPromo.forEach(function (promotion) {
            SelectProm.innerHTML += "<option value=" + promotion.id + ">" + promotion.id + "." + promotion.name + "</li> <br> </option>";
        });
    });
    