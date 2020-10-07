// define a function to create objects on the fly using the same keys for consistency
function newPerson(name, age, parents, siblings) {
    this.name = name;
    this.age = age;
    this.parents = parents;
    this.siblings = siblings;
    this.childOf = childOf;
    this.siblingOf = siblingOf;
}

//Show who the parents are of a selected object
function childOf() {
    return this.parents.map(parent => parent.name).join(' & ') || "No parents on record.";
}
//Show who the siblings are of a selected object
function siblingOf() {
    return this.siblings.map(siblings => siblings.name).join(' & ') || "No siblings on record.";
}

// Lets Create each generation. Starting at the top.

var grandParent1 = new newPerson('Pat', 71, [], []);
var grandParent2 = new newPerson('Gerry', 73, [], []);
var grandParent3 = new newPerson('Tom Sr.', 79, [], []);

let parent1 = new newPerson('Christie', 48, [grandParent1, grandParent2], []);
var parent2 = new newPerson('Paul', 51, [grandParent3], []);
var parent3 = new newPerson('David', 53, [grandParent1, grandParent2], []);
var parent4 = new newPerson('Maddie', 47, [grandParent1, grandParent2], []);
var parent5 = new newPerson('Ian', 54, [grandParent3], []);
var parent6 = new newPerson('Louisa', 46, [grandParent3], []);
var parent7 = new newPerson('Phillipa', 45, [grandParent3], []);

var child1 = new newPerson('Tom Jr.', 18, [parent1, parent2], []);
var child2 = new newPerson('Amber', 16, [parent1, parent2], []);

//add siblings to each person
parent1.siblings.push(parent3, parent4);
parent2.siblings.push(parent5, parent6, parent7);
parent3.siblings.push(parent1, parent4);
parent4.siblings.push(parent1, parent3);
parent5.siblings.push(parent2, parent6);
parent6.siblings.push(parent2, parent5, parent6);
parent7.siblings.push(parent2, parent5, parent6);
child1.siblings.push(child2);
child2.siblings.push(child1);


//Chuck every object into an array to loop through in console - order of gen reversed
const allPeople = [child2, child1, parent1, parent2, parent3, parent4, parent5, parent6, parent7, grandParent1, grandParent2, grandParent3]

// Time to do some 𝒻𝒶𝓃𝒸𝓎 formatting for console.

console.log('List of all People and their relationships to others:');

allPeople.forEach(e => {
    console.log('-----------');
    console.log(e.name);
    console.log(e.age);
    console.log('Parents: ' + e.childOf());
    console.log('Siblings: ' + e.siblingOf());
    console.log('-----------');
});