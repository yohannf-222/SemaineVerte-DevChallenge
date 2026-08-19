let data = []
let subjects = []
async function loadGrades() {
    const res = await fetch('/grades');
    data = await res.json();
    console.log(data);

    //call table creation function
    loadTables();
}

async function loadSubjects() {
    const res = await fetch('/subjects');
    subjects = await res.json();

    const select = document.getElementById('subjectSelect');
    select.innerHTML = '';

    subjects.forEach(s => {
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

    await fetch('/grades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject_id, score })
    });

    loadGrades();
    showTables()
}

async function addSubject() {
    const name = document.getElementById('newSubject').value;

    await fetch('/subjects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });

    loadSubjects();
    loadTables()
}

async function deleteGrade(id) {
    await fetch(`/grades/${id}`, { method: 'DELETE' });
    loadGrades();
}
function moyenne(name){
    let res = 0;
    let count = 0;
    data.forEach(test => {
        if (name == test.subject){
            res += test.score;
            if (test.score > 0){
            count++;
            }
        }
    });
    return res/count;
}
function loadTables() {
    while (data.length == 0|| subjects.length == 0) {
        console.log("waiting for data");
        wait(200);
    }
    console.log("data: ", data);
    console.log("sub: ", subjects);

    var tables = document.getElementsByTagName("TABLE");
    if(tables.length>0){
for (var i=tables.length-1; i>=0;i-=1)
   if (tables[i]) tables[i].parentNode.removeChild(tables[i]);
    }


    subjects.forEach(subject => {
        if (subject.name == "") return;
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

