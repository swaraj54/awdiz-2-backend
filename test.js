let, const, var, hoisitng, closure
function hoisting() {
    console.log(studentName, "student name here...")
    var studentName = "Swaraj";
}
hoisting();
var
let
const

Hoisting

var sname; // Decleration
var sname = "Swaraj";
console.log(sname);
let lname = "let";
let lname = "Let"
console.log(lname);
const awdizKey = "bghunijmk,op.[";
 cname = "cname";
console.log(cname);

LET-    reassign the value,        hoisitng not applicable,    redecleration is NOT possible
const - can't reassign the value   hoisitng not applicable,    redecleration is NOT possible
var -   reassign the value,        hoisitng,                   redecleration is possible
            Re Assign                    Hoisting                    Re decleration


closure - inner function can access outer functions scope - Lexical scoping, its remeber scope of parent function too

function outerFunction() {
    var myName = 'Awdiz';
    // console.log(myName)

    function innerFunction() {
        // var mySurname = "Institute";
        // console.log(mySurname)
        console.log(myName)
    }
    return innerFunction();
}
var myFunc = outerFunction; // [function : innerFunction] //  var myName
console.log(myFunc());