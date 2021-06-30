console.log('background project running');
// Project class
class Project {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
    }
}

// Project data
const projects = {
    allProjects: []
};

// Saving projects
chrome.storage.sync.set({'projects': projects}, function() {
    console.log('projects is set to ' + projects.allProjects.length);
});

// Add project
function addProject(title){

    // Create ID
    let ID;
    if (projects.allProjects.length > 0) {
        ID = projects.allProjects[projects.allProjects.length - 1].id + 1;
    } else {
        ID = 0;
    }

    // Create a new instance
    const newProject = new Project(ID, title);

    // Add the project to the project data
    projects.allProjects.push(newProject);

    // Return the new project
    return newProject;

}

// Update project title in data structure
function updateTitle(newTitle, ID) {

    // Find the object with matching ID
    const projectToUpdate = projects.allProjects.find(project => project.id === ID);
    
    // Update the title
    projectToUpdate.title = newTitle;

}

// Delete a project from data structure
function deleteData(ID) {

    const currentProject = projects.allProjects.map(current => current.id);
    const index = currentProject.indexOf(ID);
    if (index !== -1) {
        projects.allProjects.splice(index, 1);
    }

}

// Testing
function testing() {
    console.log(projects);
}

// Add project to UI
function addProjectToUI(obj) {

    // Create markup
    const html = `
    <li id="project-${obj.id}">
        <h2>${obj.title}</h2>
        <div class="timer">
            <p class="timer-label">Total Time Spent</p>
            <p class="timer-text"><span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span></p>
        </div>
        <button class="btn start">Start</button>
        <button class="delete-btn"><i class="fa fa-times"></i></button>
    </li>
    `;

    // Insert the HTML into the DOM
    // document.querySelector(projects).insertAdjacentHTML('beforeend', html);
}


// ------------------------------------------------ //
//             BEGINING OF THE CODE                 //
// ------------------------------------------------ //


const btnAddProj2 = document.getElementById("buttonAddProject2");
btnAddProj2.addEventListener("click", function(event) {
    // Prevent default behavior
    event.preventDefault();

    var title = document.getElementById("buttonAddProject").value;

    // If the input is not empty
    if (title !== '') {
        
        // Add the project to the data controller
        const newProject = addProject(title);

        chrome.storage.sync.get(['projects'], function(result) {
            console.log('Number of project before adding :' + result.projects.allProjects.length);

            // Saving projects
            chrome.storage.sync.set({'projects': projects}, function() {
                console.log('projects is set to : project ID : ' + projects.allProjects[projects.allProjects.length-1].id + "; project title : " + projects.allProjects[projects.allProjects.length-1].title);
            });
        });

        // Add the project to the UI
        addProjectToUI(newProject);
    }
});