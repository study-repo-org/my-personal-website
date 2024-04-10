// API
const projectUrl = "https://my-personal-website-vlip.onrender.com/projects";


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
        console.log(projects);
        projectContainer.innerHTML = cards;
    } catch (error) {
        console.error("Error fetching project:", error.message);
    }
}
paintHouses();