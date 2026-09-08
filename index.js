// Json object
const student = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    age: 21,
    major: "Computer Science"
}

// console.log(student.firstName);
// console.log(student.lastName)
// console.log(student.major);
// console.log(student.age);

// regular js function
function getStudentFullName(student){
    //let conc = student.firstName+" - "+student.lastName;
    return `${student.firstName} - ${student.lastName}`
}

//arrow function.
const getStudentAge = (student) =>{
    return student.age;
}

console.log(getStudentFullName(student), getStudentAge(student))