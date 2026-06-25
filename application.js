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

