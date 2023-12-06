fetch("../jobs.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (jobs) {
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
          <a href="./pages/jobPage.html"
            ><button class="jobButton">View Details</button></a
          >
        </div>
        `;
    }

    placeholder.innerHTML = out;
  });
