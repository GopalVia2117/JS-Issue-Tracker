function fetchIssues() {
  let issues = JSON.parse(localStorage.getItem("issues")) || [];
  let issuesList = document.getElementById("issuesList");

  issuesList.innerHTML = "";

  for (let i = 0; i < issues.length; i++) {
    let id = issues[i].id;
    let desc = issues[i].description;
    let severity = issues[i].severity;
    let assignedTo = issues[i].assignedTo;
    let status = issues[i].status;

    issuesList.innerHTML += `<div class="well mt-4 p-2 rounded-2 border border-dark-subtle">
                <h6> Issue ID: ${id}</h6>
                <p> <span class="label label-info px-2 py-1 bg-info rounded-1 text-white">${status}</span></p>
                <h3>${desc}</h3>
                <p> <span class="glyphicon glyphicon-user"></span>${assignedTo}</p>
                <a href="#" class="btn btn-warning" onclick="setStatusClosed('${id}')">Close</a>
                <a href="#" class="btn btn-danger" onclick="deleteIssue('${id}')">Delete</a>
             </div>
             `;

    console.log(issues);
    if (issues.length === 0)
      issuesList.innerHTML += "<div><h4>No records found</h4></div>";
  }
}

document.getElementById("issueInputForm").addEventListener("submit", saveIssue);

function saveIssue(e) {
  let issueId = chance.guid();
  let issueDesc = document.getElementById("issueDescInput").value;
  let issueSeverity = document.getElementById("issueSeverityInput").value;
  let issueAssignedTo = document.getElementById("issueAssignedToInput").value;
  let issueStatus = "Open";

  let issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus,
  };

  if (localStorage.getItem("issues") === null) {
    let issues = [];
    issues.push(issue);

    localStorage.setItem("issues", JSON.stringify(issues));
  } else {
    let issues = JSON.parse(localStorage.getItem("issues"));
    issues.push(issue);

    localStorage.setItem("issues", JSON.stringify(issues));
  }

  document.getElementById("issueInputForm").reset();
  fetchIssues();
  e.preventDefault();
}

function setStatusClosed(id) {
  console.log("clicked");
  let issues = JSON.parse(localStorage.getItem("issues"));

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      issues[i].status = "Closed";
    }
  }

  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
}

function deleteIssue(id) {
  let issues = JSON.parse(localStorage.getItem("issues"));

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
}
