const everyone = require('./family');
describe("People Objects Constructed Correctly", () => {
    test("Person 1 has a name", () => {
        expect(everyone.person1.name).toBe("Person 1")
    })
    test("Person 1 has an Age", () => {
        expect(Number.isInteger(everyone.person1.age)).toBeTruthy();
    })
    test("Person 1 has a Parents Object", () => {
        expect(everyone.person1.parents).toBeDefined();
    })
    test("Person 1 has a Siblings Object", () => {
        expect(everyone.person1.siblings).toBeDefined();
    })
    test("Person 2 has a name", () => {
        expect(everyone.person2.name).toBe("Person 2")
    })
    test("Person 2 has an Age", () => {
        expect(Number.isInteger(everyone.person2.age)).toBeTruthy();
    })
    test("Person 2 has a Parents Object", () => {
        expect(everyone.person2.parents).toBeDefined();
    })
    test("Person 2 has a Siblings Object", () => {
        expect(everyone.person2.siblings).toBeDefined();
    })
    test("parent 1 has a name", () => {
        expect(everyone.parent1.name).toBe("Parent 1")
    })
    test("parent 1 has an Age", () => {
        expect(Number.isInteger(everyone.parent1.age)).toBeTruthy();
    })
    test("parent 1 has a Parents Object", () => {
        expect(everyone.parent1.parents).toBeDefined();
    })
    test("parent 1 has a Siblings Object", () => {
        expect(everyone.parent1.siblings).toBeDefined();
    })
    test("parent 2 has a name", () => {
        expect(everyone.parent2.name).toBe("Parent 2")
    })
    test("parent 2 has an Age", () => {
        expect(Number.isInteger(everyone.parent2.age)).toBeTruthy();
    })
    test("parent 2 has a Parents Object", () => {
        expect(everyone.parent2.parents).toBeDefined();
    })
    test("parent 2 has a Siblings Object", () => {
        expect(everyone.parent2.siblings).toBeDefined();
    })
    test("parent 3 has a name", () => {
        expect(everyone.parent3.name).toBe("Parent 3")
    })
    test("parent 3 has an Age", () => {
        expect(Number.isInteger(everyone.parent3.age)).toBeTruthy();
    })
    test("parent 3 has a Parents Object", () => {
        expect(everyone.parent3.parents).toBeDefined();
    })
    test("parent 3 has a Siblings Object", () => {
        expect(everyone.parent3.siblings).toBeDefined();
    })
    test("Grandparent 1 has a name", () => {
        expect(everyone.grandparent1.name).toBe("Grandparent 1")
    })
    test("Grandparent 1 has an Age", () => {
        expect(Number.isInteger(everyone.grandparent1.age)).toBeTruthy();
    })
    test("Grandparent 1 has a Parents Object", () => {
        expect(everyone.grandparent1.parents).toBeDefined();
    })
    test("Grandparent 1 has a Siblings Object", () => {
        expect(everyone.grandparent1.siblings).toBeDefined();
    })
    test("Grandparent 2 has a name", () => {
        expect(everyone.grandparent2.name).toBe("Grandparent 2")
    })
    test("Grandparent 2 has an Age", () => {
        expect(Number.isInteger(everyone.grandparent2.age)).toBeTruthy();
    })
    test("Grandparent 2 has a Parents Object", () => {
        expect(everyone.grandparent2.parents).toBeDefined();
    })
    test("Grandparent 2 has a Siblings Object", () => {
        expect(everyone.grandparent2.siblings).toBeDefined();
    })
    test("Grandparent 3 has a name", () => {
        expect(everyone.grandparent3.name).toBe("Grandparent 3")
    })
    test("Grandparent 3 has an Age", () => {
        expect(Number.isInteger(everyone.grandparent3.age)).toBeTruthy();
    })
    test("Grandparent 3 has a Parents Object", () => {
        expect(everyone.grandparent3.parents).toBeDefined();
    })
    test("Grandparent 3 has a Siblings Object", () => {
        expect(everyone.grandparent3.siblings).toBeDefined();
    })
})

describe('Check all the Parents are correct for previous generation', () => {
    test("Person 1 has Parent 1 as a Parent", () => {
        expect(everyone.person1.parents[0].name).toBe('Parent 1');
    })
    test("Person 1 has Parent 2 as a Parent", () => {
        expect(everyone.person1.parents[1].name).toBe('Parent 2');
    })
    test("Person 2 has Parent 1 as a Parent", () => {
        expect(everyone.person2.parents[0].name).toBe('Parent 1');
    })
    test("Person 2 has Parent 2 as a Parent", () => {
        expect(everyone.person2.parents[1].name).toBe('Parent 2');
    })
    test("Parent 1 has Grandparent 1 as a Parent", () => {
        expect(everyone.parent1.parents[0].name).toBe('Grandparent 1');
    })
    test("Parent 1 has Grandparent 2 as a Parent", () => {
        expect(everyone.parent1.parents[1].name).toBe('Grandparent 2');
    })
    test("Parent 2 has Grandparent 3 as a Parent", () => {
        expect(everyone.parent2.parents[0].name).toBe('Grandparent 3');
    })
    test("Parent 3 has Grandparent 1 as a Parent", () => {
        expect(everyone.parent3.parents[0].name).toBe('Grandparent 1');
    })
    test("Parent 3 has Grandparent 2 as a Parent", () => {
        expect(everyone.parent3.parents[1].name).toBe('Grandparent 2');
    })
})

describe("Check All Sibling relationships are correct", () => {
    test("Person 1 has Person 2 as a sibling", () => {
        expect(everyone.person1.siblings[0].name).toBe('Person 2')
    })
    test("Person 2 has Person 1 as a sibling", () => {
        expect(everyone.person2.siblings[0].name).toBe('Person 1')
    })
    test("Parent 1 has Parent 3 as a sibling", () => {
        expect(everyone.parent1.siblings[0].name).toBe('Parent 3')
    })
    test("Parent 3 has Parent 1 as a sibling", () => {
        expect(everyone.parent3.siblings[0].name).toBe('Parent 1')
    })
})