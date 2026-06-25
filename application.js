// ===============================
// KATO POWER APPLICATION JS
// CLEAN PRODUCTION VERSION
// ===============================

alert("APPLICATION JS LOADED");

// ===== LOAD KENYA LOCATIONS =====

let kenyaData = {};

fetch("kenya-locations.json")
  .then((response) => response.json())
  .then((data) => {
    kenyaData = data;

    const countySelect = document.getElementById("county");

    for (let county in kenyaData) {
      countySelect.innerHTML += `<option value="${county}">${county}</option>`;
    }
  });

const countySelect = document.getElementById("county");
const constituencySelect = document.getElementById("constituency");
const wardSelect = document.getElementById("ward");

// ===== COUNTY CHANGE =====

countySelect.addEventListener("change", () => {
  constituencySelect.innerHTML = `<option value="">Select Constituency</option>`;
  wardSelect.innerHTML = `<option value="">Select Ward</option>`;

  let county = countySelect.value;

  if (county && kenyaData[county]) {
    for (let constituency in kenyaData[county]) {
      constituencySelect.innerHTML += `<option value="${constituency}">${constituency}</option>`;
    }
  }
});

// ===== CONSTITUENCY CHANGE =====

constituencySelect.addEventListener("change", () => {
  wardSelect.innerHTML = `<option value="">Select Ward</option>`;

  let county = countySelect.value;
  let constituency = constituencySelect.value;

  if (county && constituency && kenyaData[county][constituency]) {
    kenyaData[county][constituency].forEach((ward) => {
      wardSelect.innerHTML += `<option value="${ward}">${ward}</option>`;
    });
  }
});

// ===============================
// GUARD APPLICATION SUBMISSION
// ===============================

const guardForm = document.getElementById("guardForm");

if (guardForm) {
  guardForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    console.log("FORM SUBMITTED");

    const formData = new URLSearchParams();

    formData.append("Full Name", document.getElementById("fullName").value);
    formData.append("Phone Number", document.getElementById("phone").value);
    formData.append("Email Address", document.getElementById("email").value);
    formData.append("County", document.getElementById("county").value);
    formData.append("Constituency", document.getElementById("constituency").value);
    formData.append("Ward", document.getElementById("ward").value);
    formData.append("Town", document.getElementById("town").value);
    formData.append("Physical Location", document.getElementById("location").value);
    formData.append("Experience", document.getElementById("experience").value);
    formData.append("Education Level", document.getElementById("education").value);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxJyIvFZVQm9VusRlkzxbFcTjHxm4lblh3M5US9m9aeGTki6TPbovrjpl_oVqwTifeL/exec",
        {
          method: "POST",
          body: formData
        }
      );

      const resultText = await response.text();

      console.log("SERVER RESPONSE:", resultText);

      if (resultText.includes("success")) {
        alert("Application submitted successfully!");
        guardForm.reset();
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("ERROR:", error);
      alert("Network error. Check console.");
    }
  });
}
