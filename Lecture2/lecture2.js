// Punkt 1 
function addParamsToRequest(params) {
    let count = 0;

    return (data) => ({
        ...params,
        data,
        count: ++count // зробив прямий ікремент в об'єкті 
    });
}


const sendData = addParamsToRequest({ 'access-token': 'qwerty' });

console.log(sendData({ key1: 'value1' })); 

console.log(sendData({ key2: 'value2' })); 

console.log(sendData({ key3: 'value3' })); 

//Task two
const obj = {
    name: '',
    age: '',
    getData() {
        console.log(`Person name is: ${this.name} and age: ${this.age}`);
    }
};

// тут використав Obj.assign щоб не писати obj.age = age, obj.name = name 
const updateAndLog = (name, age) => {
    Object.assign(obj, { name, age }); 
    obj.getData();
};

updateAndLog('Alice', 30); 
updateAndLog('Bob', 25);   

// Recursion Task
const root = {
    name: 'name',
    type: 'folder',
    children: [
        {
            name: 'folder 1',
            type: 'folder',
            children: [
                {
                    name: 'folder 2',
                    type: 'folder',
                    children: [
                        {
                            name: 'file 3',
                            type: 'file',
                            size: 30
                        }
                    ]
                }
            ]
        },
        {
            name: 'file 1',
            type: 'file',
            size: 10
        },
        {
            name: 'file 2',
            type: 'file',
            size: 20
        }
    ]
};

function findFiles({ type, children, name }) {
    const files = [];

    if (type === 'file') {
        files.push(name);
    }

    if (children) {
        for (const child of children) {
            files.push(...findFiles(child)); 
        }
    }

    return files;
}

const fileNames = findFiles(root);
console.log(fileNames); 

//Last Task ES5 (Prototype)
function Person(name, phone) {
    this.name = name;
    this.phone = phone;
}

Person.prototype.introduce = function() {
    console.log(`Hello, my name is ${this.name}, my number is ${this.phone}.`);
};

function Student(name, phone, course) {
    Person.call(this, name, phone);
    this.course = course;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function() {
    console.log(`I am studying in year ${this.course}.`);
};

function Teacher(name, phone, subject) {
    Person.call(this, name, phone);
    this.subject = subject;
}

Teacher.prototype = Object.create(Person.prototype);
Teacher.prototype.constructor = Teacher;

Teacher.prototype.teach = function() {
    console.log(`I teach ${this.subject}.`);
};

// Фабрична ф-ція
const createPerson = (type, name, phone, extra) => {
    if (type === 'student') {
        return new Student(name, phone, extra);
    } else if (type === 'teacher') {
        return new Teacher(name, phone, extra);
    }
};

const student = createPerson('student', 'Alice', '123-456', 2);
const teacher = createPerson('teacher', 'Vasyl', '987-654', 'Mathematics');

student.introduce();
student.study();
teacher.introduce();
teacher.teach();

//ES6 (Classes)
class Person2 {
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }

    introduce() {
        console.log(`Hello, my name is ${this.name}, my number is ${this.phone}.`);
    }
}

class Student2 extends Person2 {
    constructor(name, phone, course) {
        super(name, phone);
        this.course = course;
    }

    study() {
        console.log(`I am studying in year ${this.course}.`);
    }
}

class Teacher2 extends Person2 {
    constructor(name, phone, subject) {
        super(name, phone);
        this.subject = subject;
    }

    teach() {
        console.log(`I teach ${this.subject}.`);
    }
}

// знову ж таки фабрична ф-ція (напишіть будь ласка в фідбеці до дз чи це можна вважати патерном Фабрика)
const createPerson2 = (type, name, phone, extra) => {
    if (type === 'student') {
        return new Student2(name, phone, extra);
    } else if (type === 'teacher') {
        return new Teacher2(name, phone, extra);
    }
};

const student2 = createPerson2('student', 'Alya', '123-436', 2);
const teacher2 = createPerson2('teacher', 'Gunter', '987-655', 'German');

student2.introduce();
student2.study();
teacher2.introduce();
teacher2.teach();

