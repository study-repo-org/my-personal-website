// API
const projectUrl = " http://localhost:3000/projects";


// DOM elements
let projectContainer = document.getElementById("project-section")
const formContainer = document.getElementById("propertyHouseForm" );


// fetch all houses
const fetchData = () => {
    return fetch(projectUrl)
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error fetching project:", error);
      });
};


// creating the card for projects
function createHouseCard(project) {
    return `
    <div>
            <div class="project-section">
                <div class="project-div">
                    <div class="project-image">
                        <img src=${project.image} alt="">
                    </div>
                    <div class="project-div-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}



// function getting and mapping the data
async function paintHouses() {
    try {
        const projects = await fetchData();
        let cards = projects.map(project => createHouseCard(project)).join(" ");
        projectContainer.innerHTML = cards;
    } catch (error) {
        console.error("Error fetching project:", error.message);
    }
}
paintHouses();



let addProjectForm = false;
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector(".projectButton");
  const projectFormContainer = document.querySelector(".project-form-container");
  addBtn.addEventListener("click", () => {
    addProjectForm = !addProjectForm;
    if (addProjectForm) {
      projectFormContainer.style.display = "block";
    } else {
      projectFormContainer.style.display = "none";
    }
  });
});


formContainer.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    let image = document.getElementById("image").value;
    let description = document.getElementById("description").value;
    let title = document.getElementById("title").value;

  
    let id = Math.floor(Math.random() * 100000);
  
    const data = {
      id: id, 
      image: image,
      title: title,
      description: description,
    };
  
    try {
      const response = await fetch(projectUrl, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add project');
      }
      console.log('House added successfully');
  
    } catch (error) {
      console.error('Error adding project:', error);
    }
  });
  