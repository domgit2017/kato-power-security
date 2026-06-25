
alert("APPLICATION JS IS LOADING");


// ===== LOAD KENYA LOCATIONS =====

let kenyaData = {};

fetch('kenya-locations.json')
  .then((response) => response.json())
  .then((data) => {
    kenyaData = data;

    const countySelect = document.getElementById('county');

    for (let county in kenyaData) {
      countySelect.innerHTML += `
        <option value="${county}">
            ${county}
        </option>
        `;
    }
  });

const countySelect = document.getElementById('county');
const constituencySelect = document.getElementById('constituency');
const wardSelect = document.getElementById('ward');

// ===== CONSTITUENCIES =====

countySelect.addEventListener('change', () => {
  constituencySelect.innerHTML = `<option value="">Select Constituency</option>`;

  wardSelect.innerHTML = `<option value="">Select Ward</option>`;

  let county = countySelect.value;

  if (county && kenyaData[county]) {
    for (let constituency in kenyaData[county]) {
      constituencySelect.innerHTML += `
            <option value="${constituency}">
                ${constituency}
            </option>
            `;
    }
  }
});

// ===== WARDS =====

constituencySelect.addEventListener('change', () => {
  wardSelect.innerHTML = `<option value="">Select Ward</option>`;

  let county = countySelect.value;
  let constituency = constituencySelect.value;

  if (county && constituency && kenyaData[county][constituency]) {
    kenyaData[county][constituency].forEach((ward) => {
      wardSelect.innerHTML += `
            <option value="${ward}">
                ${ward}
            </option>
            `;
    });
  }
});

if (document.getElementById('serviceForm')) {
  document.getElementById('serviceForm').addEventListener('submit', () => {
    const county = document.getElementById('county').value;

    const constituency = document.getElementById('constituency').value;

    const ward = document.getElementById('ward').value;

    const town = document.getElementById('town').value;

    const service = document.getElementById('service').value;

    const subjectField = document.getElementById('subject');

    if (subjectField) {
      subjectField.value = `SERVICE REQUEST | ${service} | ${county} | ${constituency} | ${ward} | ${town}`;
    }
  });
}

// ===== GUARD APPLICATION FORM SUBMISSION =====

const guardForm = document.getElementById("guardForm");

guardForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  console.log("FORM SUBMITTED");

  const formData = {
    fullName: document.getElementById("fullName").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    county: document.getElementById("county").value,
    constituency: document.getElementById("constituency").value,
    ward: document.getElementById("ward").value,
    town: document.getElementById("town").value,
    location: document.getElementById("location").value,
    experience: document.getElementById("experience").value,
    education: document.getElementById("education").value
  };

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxJyIvFZVQm9VusRlkzxbFcTjHxm4lblh3M5US9m9aeGTki6TPbovrjpl_oVqwTifeL/exec", {
      method: "POST",
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    console.log("SERVER RESPONSE:", result);

    if (result.success) {
      alert("Application submitted successfully!\nID: " + result.applicantId);
      guardForm.reset();
    } else {
      alert("Submission failed.");
    }

  } catch (error) {
    console.error("ERROR:", error);
    alert("Error submitting application. Check console.");
  }
});
