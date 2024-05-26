document.getElementById('bugForm').addEventListener('submit', addOrUpdateBug);
document.getElementById('loginForm').addEventListener('submit', login);
document.getElementById('registerForm').addEventListener('submit', register);
document.getElementById('loginButton').addEventListener('click', showLoginModal);
document.getElementById('registerButton').addEventListener('click', showRegisterModal);
document.getElementById('logoutButton').addEventListener('click', logout);

let bugs = JSON.parse(localStorage.getItem('bugs')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [{ username: 'admin', password: 'admin' }];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

function addOrUpdateBug(e) {
    e.preventDefault();

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let priority = document.getElementById('priority').value;
    let assignedTo = document.getElementById('assignedTo').value;
    let bugId = document.getElementById('bugId').value;

    if (bugId) {
        // Update existing bug
        bugs = bugs.map(bug => {
            if (bug.id == bugId) {
                return { ...bug, title, description, priority, assignedTo };
            }
            return bug;
        });
    } else {
        // Add new bug
        let bug = {
            id: Date.now(),
            title,
            description,
            priority,
            assignedTo,
            status: 'Open',
            comments: []
        };
        bugs.push(bug);
    }

    localStorage.setItem('bugs', JSON.stringify(bugs));
    document.getElementById('bugForm').reset();
    $('#bugModal').modal('hide');
    displayBugs();
}

function displayBugs() {
    let bugList = document.getElementById('bugList');
    bugList.innerHTML = '';

    bugs.forEach(bug => {
        let bugItem = document.createElement('div');
        bugItem.className = 'list-group-item';
        bugItem.innerHTML = `
            <div class="bug-info">
                <h5>${bug.title}</h5>
                <p>${bug.description}</p>
                <p><strong>
