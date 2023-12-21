//display jobs on home page

function displayJobs(jobs) {
  let placeholder = document.querySelector("#jobsOutput");
  let out = "";
  for (let job of jobs) {
    out += `
        <div class="job">
          <div class="jobMainElements">
            <div class="jobLogo">
              <p class="logoSymbol">${job.title.charAt(0)}</p>
            </div>
            <div class="jobDescription">
              <p>${job.companyName}</p>
              <h3>${job.title}</h3>
              <div class="jobDetails">
                <div class="jobLocation">
                  <img
                    class="smalIcon"
                    src="./pictures/jobLocation.svg"
                    alt="job location"
                  />
                  <p>${job.location}</p>
                </div>
                <div class="jobType">
                  <img
                    class="smalIcon"
                    src="./pictures/jobTypeIcon.svg"
                    alt="job type icon"
                  />
                  <p>${job.type}</p>
                </div>
                <p class="jobEarning">$ ${job.salary}</p>
              </div>
            </div>
          </div>
          <button id="job${
            job.id
          }" class="jobButton" onclick="jobButtonClick(this)">View Details</button>
        </div>
        `;
  }
  placeholder.innerHTML = out;
}

// Job search function
function searchJobs() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  fetch(
    "https://api.jsonsilo.com/public/62ef1f8e-4679-4656-9028-40c75114be95",
    {
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((response) => response.json())
    .then((jobs) => {
      const filteredJobs = jobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchTerm) ||
          job.companyName.toLowerCase().includes(searchTerm) ||
          job.category.toLowerCase().includes(searchTerm)
        );
      });
      displayJobs(filteredJobs); // Displaying search results
    })
    .catch((error) => console.error("Błąd podczas pobierania danych:", error));
}

document.getElementById("searchInput").addEventListener("input", searchJobs);

fetch("https://api.jsonsilo.com/public/62ef1f8e-4679-4656-9028-40c75114be95", {
  headers: { "Content-Type": "application/json" },
})
  .then((response) => response.json())
  .then((jobs) => {
    displayJobs(jobs); // View all jobs on the site
  })
  .catch((error) => console.error("Błąd podczas pobierania danych:", error));

// close popup

const closePopupButton = document.querySelector("#popupClose");
const jobInfoPopup = document.querySelector("#jobInfoPopup");
const body = document.body;

function closePopup() {
  jobInfoPopup.classList.remove("active");
  jobInfoPopup.classList.add("inactive");
  body.classList.remove("popupOpen");
}

// open popup

function openPopup() {
  jobInfoPopup.classList.add("active");
  jobInfoPopup.classList.remove("inactive");
  body.classList.add("popupOpen");
}

//get clicked button id

const jobButton = document.getElementsByClassName(".jobButton");

let clickedButtonId;
let clickedButtonNumber;

function jobButtonClick(btn) {
  clickedButtonId = btn.id;
  let matches = clickedButtonId.match(/(\d+)/);
  if (matches) {
    clickedButtonNumber = matches[0];
  }
  getClickedJobInfo();
  openPopup();
}

//Get specific page data
function getClickedJobInfo() {
  let jobOut = "";
  fetch(
    "https://api.jsonsilo.com/public/62ef1f8e-4679-4656-9028-40c75114be95",
    {
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data) && data.length > 1) {
        const job = data[clickedButtonNumber - 1];
        console.log(job.id);
        jobOut = `
          <div>
            <div class="jobPageDetailDescription">
              <div class="details">
                <p>
                  <span>Minimum Qualification:</span> ${job.qualification}
                </p>
                <p>
                  <span>Experience Length:</span> ${job.experience}
                </p>
                <p>
                  <span>Location:</span> ${job.location}
                </p>
                <p>
                  <span>Application Deadline:</span> ${job.deadline}
                </p>
                <p>
                  <span>Salary Range:</span> $ ${job.salary}
                </p>
              </div>
              <div class="description">
              ${job.description}
              </div>
            </div>
          </div>`;
      }

      document.querySelector("#jobInfoPopupDescription").innerHTML = jobOut;
      console.log(jobOut);
    })
    .catch((error) =>
      console.error("Błąd podczas pobierania pliku JSON:", error)
    );
}
