const addJobButton = document.querySelector("#addJobButton");

const companyName = document.querySelector("#companyName");
const website = document.querySelector("#website");
const title = document.querySelector("#title");
const category = document.querySelector("#category");
const type = document.querySelector("#type");
const companyLocation = document.querySelector("#companyLocation");
const salary = document.querySelector("#salary");
const experience = document.querySelector("#experience");
const qualification = document.querySelector("#qualification");
const deadline = document.querySelector("#deadline");
const aplicationLink = document.querySelector("#aplicationLink");
const jobDescription = document.querySelector("#jobDescription");

let nextJobId;

fetch("https://api.jsonsilo.com/public/62ef1f8e-4679-4656-9028-40c75114be95", {
  headers: { "Content-Type": "application/json" },
})
  .then((response) => response.json())
  .then((jobs) => {
    // Checking the number of objects in a data array
    const numberOfJobs = jobs.length;
    nextJobId = numberOfJobs;
  })
  .catch((error) => console.error("Błąd pobierania danych:", error));

function jobValuesToArray() {}

addJobButton.addEventListener("click", function () {
  if (
    companyName.value.trim() === "" ||
    website.value.trim() === "" ||
    title.value.trim() === "" ||
    category.value.trim() === "" ||
    type.value.trim() === "" ||
    companyLocation.value.trim() === "" ||
    salary.value.trim() === "" ||
    experience.value.trim() === "" ||
    qualification.value.trim() === "" ||
    deadline.value.trim() === "" ||
    aplicationLink.value.trim() === "" ||
    jobDescription.value.trim() === ""
  ) {
    alert("Fill in all fields");
    return;
  } else {
    let newJob = {
      id: nextJobId + 1,
      companyName: companyName.value,
      companyWebsite: website.value,
      title: title.value,
      category: category.value,
      type: type.value,
      location: companyLocation.value,
      salary: salary.value,
      experience: experience.value,
      qualification: qualification.value,
      deadline: deadline.value,
      link: aplicationLink.value,
      description: jobDescription.value,
    };
    fetch(
      "https://api.jsonsilo.com/public/62ef1f8e-4679-4656-9028-40c75114be95",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      }
    )
      .then((response) => response.json())
      .then(() => alert("New job posted"))
      .catch((error) => console.error("Błąd:", error));
  }
});
