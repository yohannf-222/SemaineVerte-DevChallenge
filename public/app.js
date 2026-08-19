async function loadGrades() {
    const res = await fetch('/grades');
    const data = await res.json();

    const table = document.getElementById('table');
    table.innerHTML = '';

    data.forEach(g => {
        table.innerHTML += `
            <tr>
                <td>${g.subject}</td>
                <td>${g.score}</td>
                <td><button onclick="deleteGrade(${g.id})">X</button></td>
            </tr>
        `;
    });
}

async function loadSubjects() {
    const res = await fetch('/subjects');
    const data = await res.json();

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

loadSubjects();
loadGrades();