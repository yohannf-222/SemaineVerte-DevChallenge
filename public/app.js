let data = []
let subjects = []
async function loadGrades() {
    const res = await fetch('/grades');
    data = await res.json();
    console.log(data);

    //call table creation function
    addTable();
}

async function loadSubjects() {
    const res = await fetch('/subjects');
    subjects = await res.json();

    const select = document.getElementById('subjectSelect');
    select.innerHTML = '';

    data.forEach(s => {
        select.innerHTML += `
            <option value="${s.id}">
                ${s.name}
            </option>
        `;
    });
}

async function addGrade() {
    const subject_id = document.getElementById('subjectSelect').value;
    const score = document.getElementById('score').value;
    const ponderation = (document.getElementById('ponderation').value);

    await fetch('/grades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject_id, score, ponderation })
    });

    loadGrades();
}

async function addSubject() {
    const name = document.getElementById('newSubject').value;

    await fetch('/subjects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });

    loadSubjects();
}

async function deleteGrade(id) {
    await fetch(`/grades/${id}`, { method: 'DELETE' });
    loadGrades();
}
function moyenne(){
    return 4.3
}
function addTable() {
    while (data.length == 0|| subjects.length == 0) {
        console.log("waiting for data");
        wait(200);
    }
    console.log("data: ", data);
    console.log("sub: ", subjects);
    
    subjects.forEach(subject => {
    let table = document.createElement('table');
    let header1 = document.createElement('th');
    let header2 = document.createElement('th');
    let header3 = document.createElement('th');
    let header4 = document.createElement('th');
    header1.innerHTML = `${subject.name}`;
    header2.innerHTML = "Note";
    header3.innerHTML = "Ponderation";
    header4.innerHTML = `${moyenne(subject.name)}`;
    table.appendChild(header1);
    table.appendChild(header2);
    table.appendChild(header3);
    table.appendChild(header4);
    
    document.body.appendChild(table);
            data.forEach(test => {
                if(subject.name != test.subject) return;
        table.innerHTML += `
            <tr>
                <td>${test.subject}</td>
                <td>${test.score}</td>
                <td>10</td>
                <td><button onclick="deleteGrade(${test.id})">X</button></td>
            </tr>
        `;
    });
    });
    


}
loadSubjects();
loadGrades();

