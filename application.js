// ===== LOAD KENYA LOCATIONS =====

let kenyaData = {};

fetch("kenya-locations.json")
  .then((response) => response.json())
  .then((data) => {
    kenyaData = data;

    const countySelect = document.getElementById("county");

    for (let county in kenyaData) {
      countySelect.innerHTML += `
        <option value="${county}">
            ${county}
        </option>
        `;
    }
  });

const countySelect = document.getElementById("county");
const constituencySelect = document.getElementById("constituency");
const wardSelect = document.getElementById("ward");

// ===== CONSTITUENCIES =====

countySelect.addEventListener("change", () => {
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

constituencySelect.addEventListener("change", () => {
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

// ===== EMAIL SUBJECT =====

document.getElementById("guardForm").addEventListener("submit", () => {
  let town = document.getElementById("town").value.trim();

  document.getElementById("subject").value = "Guard Application - " + town;
});
