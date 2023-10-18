$(document).ready(function () {
  // Add a job button click event
  $("#addJobButton").click(function () {
    $(".add-popup-container").show();
  });

// Get references to filter elements and the filter button
const jobTypeFilter = document.getElementById("jobTypeFilter");
const jobLocationFilter = document.getElementById("jobLocationFilter");
const jobTagsFilter = document.getElementById("jobTagsFilter");
const filterButton = document.getElementById("filterButton");

// Add an event listener to the filter button
filterButton.addEventListener("click", filterJobs);

// Function to filter jobs based on user input
function filterJobs() {
    const jobType = jobTypeFilter.value;
    const jobLocation = jobLocationFilter.value.toLowerCase();
    const jobTags = jobTagsFilter.value.toLowerCase();

    const jobContainers = document.querySelectorAll(".job-container");

    jobContainers.forEach((jobContainer) => {
        const jobDetails = jobContainer.querySelector(".job-details");
        const jobTypeElement = jobDetails.querySelector(".light-tag:nth-of-type(2)");
        const jobLocationElement = jobDetails.querySelector(".tags .light-tag:nth-of-type(3)");
        const jobTagsElement = jobDetails.querySelector(".right-tags-container");

        if (
            (jobType === "All" || jobType === jobTypeElement.textContent.trim()) &&
            (jobLocation === "" || jobLocationElement.textContent.toLowerCase().includes(jobLocation)) &&
            (jobTags === "" || jobTagsElement.textContent.toLowerCase().includes(jobTags))
        ) {
            jobContainer.style.display = "block";
        } else {
            jobContainer.style.display = "none";
        }
    });
}


  // Close the add job popup
  $(".close-add-popup").click(function () {
    $(".add-popup-container").hide();
  });

  // Add job form submission
  $("#addJobForm").submit(function (event) {
    event.preventDefault();

    // Get the input values using class names
    var jobTitle = $("#jobTitle").val();
    var companyName = $("#companyName").val();
    var rightTags = $("#rightTags").val();
    var jobLocation = $("#jobLocation").val();
    var jobType = $("#jobType").val();
    var uploadTime = $("#uploadTime").val();
    var jobSalary = $("#jobSalary").val();

    // Create a new job container with the input values
    var newJob = `
    <div class="job-container">
        <div class="logo">
            <img src="images/jobs.png" alt="Company Logo">
        </div>
        <div class="job-details">
            <h3>${companyName}</h3>
            <div class="secondline">
                <h2>${jobTitle}</h2>
                <div class="right-tags-container">
                    <span>${rightTags}</span>
                </div>
            </div>
            <div class="tags">
                <span class="light-tag">${jobLocation}</span> &bull;
                <span class="light-tag">${jobType}</span> &bull;
                <span class="light-tag">${uploadTime}</span> &bull;
                <span class="light-tag">${jobSalary}</span>
            </div>
            <button class="delete-job-button">Delete</button>
        </div>
    </div>
    `;

    // Append the new job container to the main section
    $("main").append(newJob);

    // Clear the input fields
    $("#jobTitle").val("");
    $("#companyName").val("");
    $("#rightTags").val("");
    $("#jobLocation").val("");
    $("#jobType").val("");
    $("#uploadTime").val("");
    $("#jobSalary").val("");

    // Close the add job popup
    $(".add-popup-container").hide();
  });

  // Click event to open job details popup
  $(".job-container").click(function () {
    // Find the details of the clicked job container
    var companyName = $(this).find(".company-name").text();
    var jobTitle = $(this).find(".job-title").text();
    var rightTags = $(this).find(".right-tag").map(function () {
      return $(this).text();
    }).get().join(", ");
    var uploadTime = $(this).find(".light-tag").eq(0).text();
    var jobType = $(this).find(".light-tag").eq(1).text();
    var jobLocation = $(this).find(".light-tag").eq(2).text();

    // Populate the job details in the popup
    $(".popup").html(`
      <h2>${companyName}</h2>
      <h3>${jobTitle}</h3>
      <p><strong>Tags:</strong> ${rightTags}</p>
      <p><strong>Type:</strong> ${jobType}</p>
      <p><strong>Uploaded:</strong> ${uploadTime}</p>
      <p><strong>Location:</strong> ${jobLocation}</p>
    `);

    // Show the job details popup
    $(".popup-container").show();
  });

  // Close the job details popup
  $(".popup-container").on("click", ".close-popup-and-show-main", function () {
    $(".popup-container").hide();
    $("main").show(); // Show the main page content
  });

  // Handle the delete job button
  $("main").on("click", ".delete-job-button", function () {
    $(this).closest(".job-container").remove();
  });
});
