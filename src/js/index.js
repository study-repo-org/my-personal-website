// API
const projectUrl = "https://my-personal-website-vlip.onrender.com/projects";
const contactUrl = "https://my-personal-website-vlip.onrender.com/contacts";

// DOM elements
let projectContainer = document.getElementById("project-section")
const formContainer = document.getElementById("propertyHouseForm" );
const contactForm = document.getElementById("submitForm" );

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
                        <button class="delete-button" onclick="deleteProject(${project.id})">Delete</button>
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




// hidding and displaying the project form
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


// project submission 
formContainer.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    let imageErrorMessage = document.getElementById("imageError");
    let descriptionErrorMessage = document.getElementById("descriptionError"); 
    let titleErrorMessage = document.getElementById("titleError"); 

    imageErrorMessage.innerText = "";
    descriptionErrorMessage.innerText = "";
    titleErrorMessage.innerText = "";



    let image = document.getElementById("image").value;
    let description = document.getElementById("description").value;
    let title = document.getElementById("title").value;

    if (image === "" || description === "" || title === "") {
      imageErrorMessage.innerText = "image is required";
      descriptionErrorMessage.innerText = "description is required";    
      titleErrorMessage.innerText = "title is required";    
      
      return; // Exit function if any field is empty
  }



  
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
      document.getElementById("image").value= "";
      document.getElementById("description").value= "";
      document.getElementById("title").value= "";
  
    } catch (error) {
      console.error('Error adding project:', error);
    }
});
  

const deleteProject = (id) => {
  fetch(`${projectUrl}/${id}`, {
    method: "DELETE",
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
}


// submitting cont info for users
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let nameErrorMessage = document.getElementById("nameError");
  let emailErrorMessage = document.getElementById("emailError"); 
  let subjectErrorMessage = document.getElementById("subjectError"); 
  let messageErrorMessage = document.getElementById("messageError"); 
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  

    // Reset error messages
    emailErrorMessage.innerText = "";
    nameErrorMessage.innerText = "";
    subjectErrorMessage.innerText = "";
    messageErrorMessage.innerText = "";

    // Retrieve  values
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;
    
    // Check if any field is empty
    if (email === "" || name === "" || subject === "" || message === "") {
        emailErrorMessage.innerText = "Email is required";
        nameErrorMessage.innerText = "Name is required";    
        subjectErrorMessage.innerText = "Subject is required";    
        messageErrorMessage.innerText = "Message is required";    
        return; // Exit function if any field is empty
    }

    // Validate email format
    if (!emailRegex.test(email)) {
        emailErrorMessage.innerText = "Invalid email format";
        return; // Exit function if email format is invalid
    }



  let id = Math.floor(Math.random() * 100000);

  const data = {
    id: id, 
    name: name,
    email: email,
    subject: subject,
    message: message
  };

  try {
    const response = await fetch(contactUrl, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to add contact');
    }

    document.getElementById("email").value = "";
    document.getElementById("name").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";

  } catch (error) {
    console.error('Error adding contact:', error);
  }
});