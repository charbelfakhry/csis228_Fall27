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
    return `jhjdhdf ${student.firstName} - ${student.lastName}`
}

//arrow function.
const getStudentAge = (student) =>{
    return student.age;
}

const multiply = (n1, n2) => {
    return n1 * n2;
}

// deconstruct 
const {firstName, lastName, age} = student;


// object spread
const updatedStudent = {
    ...student,
    age: 99
}

const updateStudent = (student, changes) =>{
    return {
        ...student,
        ...changes
    }
}

const updated = updateStudent(student, 
    {major: "Software engineering", age: 11});


var students = [
    {
        id:1,
        firstName: "John",
        lastName: "Doe",
        age: 16
    },
    {
        id:2,
        firstName: "Sarah",
        lastName: "Smith",
        age: 24
    },
    {
        id:3,
        firstName: "Mike",
        lastName: "Brown",
        age: 25
    }
];


// traditional loop
for(let i = 0; i < students.length; i++)
{
    if(students[i].age < 18)
    {
        console.log(students[i], "You are a minor");
    }else{
        console.log(students[i]);
    }
}

// enhanced loop
for(let i in students)
{
    console.log(students[i]);
}

for(const student of students)
{
    console.log("enhanced loop ", student);
}

const addStudent = (student) =>{
    students.push(student);
}

addStudent(
    {
        firstName: "std 1", 
        lastName: "ln 1", 
        age: 9
    }
    );

const studentOver20 = students.filter(student => student.age > 20);
console.log(studentOver20);

const names = students.map(student => `${student.firstName} - ${student.lastName}`);
console.log(names);

// three equalities also for the type 
const exists = students.some(student => student.id === 3);
console.log(exists);

const updateStudent1 = (students, id, changes) => {
    const index = students.findIndex(student => student.id === id);

    if(index === -1){
        return "Student does not exist!";
    }

    students[index] = {
        ...students[index],
        ...changes
    };

    return students[index];
}

const changedStudent = updateStudent1(students, 300, {age: 1000});
console.log(changedStudent);

// delete student

const deleteStudent = (students, id) =>{
    const index = students.findIndex(student => student.id === id);
    // error first
    if(index === -1){
        return `Studnet ${id} does not exist!`
    }

    students.splice(index, 1);

    return true;
}

