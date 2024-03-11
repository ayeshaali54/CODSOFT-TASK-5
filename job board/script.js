function fetchJobListings() {
    fetch('api_endpoint')
        .then(response => response.json())
        .then(data => {
            const jobListingsSection = document.getElementById('job-listings');
            jobListingsSection.innerHTML = ''; 
            data.forEach(job => {
                const jobListing = document.createElement('div');
                jobListing.classList.add('job-listing');
                jobListing.innerHTML = `
                    <h3>${job.title}</h3>
                    <p>${job.company}</p>
                    <p>${job.location}</p>
                    <button onclick="viewJobDetails(${job.id})">View Details</button>
                    <button onclick="applyForJob(${job.id})">Apply</button>
                `;
                jobListingsSection.appendChild(jobListing);
            });
        })
        .catch(error => console.error('Error fetching job listings:', error));
}

function viewJobDetails(jobId) {
    fetch(`api_endpoint/${jobId}`)
        .then(response => response.json())
        .then(job => {
            const jobDetailSection = document.getElementById('job-detail');
            jobDetailSection.innerHTML = `
                <h2>${job.title}</h2>
                <p>${job.company}</p>
                <p>${job.location}</p>
                <p>${job.description}</p>
                <button onclick="applyForJob(${job.id})">Apply</button>
            `;
        })
        .catch(error => console.error('Error fetching job details:', error));
}
function applyForJob(jobId) {
    window.location.href = `job_application.html?jobId=${jobId}`;
}

window.addEventListener('load', fetchJobListings);
