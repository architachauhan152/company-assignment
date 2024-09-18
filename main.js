let data = [
  {
    id: 1,
    "Chemical name": "Acetone",
    Vender: "Vender A",
    Density: "0.79",
    Viscosity: "0.3",
    Packaging: "Bottle",
    "Pack size": "500ml",
    Unit: "ml",
    Quantity: 100,
  },
  {
    id: 2,
    "Chemical name": "Benzene",
    Vender: "Vender B",
    Density: "0.87",
    Viscosity: "0.6",
    Packaging: "Can",
    "Pack size": "1L",
    Unit: "L",
    Quantity: 50,
  },
  {
    id: 3,
    "Chemical name": "Chloroform",
    Vender: "Vender C",
    Density: "1.49",
    Viscosity: "0.5",
    Packaging: "Bottle",
    "Pack size": "250ml",
    Unit: "ml",
    Quantity: 200,
  },
  {
    id: 4,
    "Chemical name": "Ethanol",
    Vender: "Vender A",
    Density: "0.79",
    Viscosity: "1.2",
    Packaging: "Can",
    "Pack size": "1L",
    Unit: "L",
    Quantity: 150,
  },
  {
    id: 5,
    "Chemical name": "Formaldehyde",
    Vender: "Vender D",
    Density: "1.09",
    Viscosity: "0.5",
    Packaging: "Bottle",
    "Pack size": "500ml",
    Unit: "ml",
    Quantity: 80,
  },
  {
    id: 6,
    "Chemical name": "Glycerin",
    Vender: "Vender E",
    Density: "1.26",
    Viscosity: "1.4",
    Packaging: "Bottle",
    "Pack size": "1L",
    Unit: "L",
    Quantity: 60,
  },
  {
    id: 7,
    "Chemical name": "Hexane",
    Vender: "Vender F",
    Density: "0.66",
    Viscosity: "0.4",
    Packaging: "Can",
    "Pack size": "500ml",
    Unit: "ml",
    Quantity: 120,
  },
  {
    id: 8,
    "Chemical name": "Iodine",
    Vender: "Vender G",
    Density: "4.93",
    Viscosity: "1.3",
    Packaging: "Bottle",
    "Pack size": "100ml",
    Unit: "ml",
    Quantity: 30,
  },
  {
    id: 9,
    "Chemical name": "Kerosene",
    Vender: "Vender H",
    Density: "0.80",
    Viscosity: "1.0",
    Packaging: "Can",
    "Pack size": "2L",
    Unit: "L",
    Quantity: 90,
  },
  {
    id: 10,
    "Chemical name": "Lactic Acid",
    Vender: "Vender I",
    Density: "1.21",
    Viscosity: "1.6",
    Packaging: "Bottle",
    "Pack size": "500ml",
    Unit: "ml",
    Quantity: 70,
  },
  {
    id: 11,
    "Chemical name": "Methanol",
    Vender: "Vender J",
    Density: "0.79",
    Viscosity: "0.6",
    Packaging: "Bottle",
    "Pack size": "1L",
    Unit: "L",
    Quantity: 110,
  },
  {
    id: 12,
    "Chemical name": "Nitric Acid",
    Vender: "Vender K",
    Density: "1.41",
    Viscosity: "1.2",
    Packaging: "Can",
    "Pack size": "500ml",
    Unit: "ml",
    Quantity: 85,
  },
  {
    id: 13,
    "Chemical name": "Octane",
    Vender: "Vender L",
    Density: "0.70",
    Viscosity: "0.4",
    Packaging: "Bottle",
    "Pack size": "1L",
    Unit: "L",
    Quantity: 95,
  },
  {
    id: 14,
    "Chemical name": "Phenol",
    Vender: "Vender M",
    Density: "1.06",
    Viscosity: "1.8",
    Packaging: "Bottle",
    "Pack size": "250ml",
    Unit: "ml",
    Quantity: 40,
  },
  {
    id: 15,
    "Chemical name": "Sulfuric Acid",
    Vender: "Vender N",
    Density: "1.84",
    Viscosity: "2.0",
    Packaging: "Can",
    "Pack size": "1L",
    Unit: "L",
    Quantity: 65,
  },
];


let selectedRowIndex = -1;

document.addEventListener("DOMContentLoaded", () => {
  loadDataFromStorage(); 
  populateTable();
});

function populateTable() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  data.forEach((row, index) => {
    let tr = document.createElement("tr");
    Object.keys(row).forEach((key) => {
      let td = document.createElement("td");
      td.textContent = row[key];
      td.setAttribute("contenteditable", true);

      td.addEventListener("blur", () => {
        data[index][key] = td.textContent; 
        saveDataToStorage(); 
      });
      tr.appendChild(td);
    });
    tr.addEventListener("click", () => {
      highlightRow(index, tr);
    });
    tbody.appendChild(tr);
  });
}

function highlightRow(index, row) {
  const tbody = document.getElementById("tableBody");
  if (selectedRowIndex !== -1) {
    tbody.rows[selectedRowIndex].classList.remove("selected");
  }
  row.classList.add("selected");
  selectedRowIndex = index;
}

function sortTable(columnIndex) {
  const table = document.getElementById("chemicalTable");
  const rows = Array.from(table.querySelectorAll("tbody tr"));
  const isAscending = !table.classList.contains("ascending");
  table.classList.toggle("ascending", isAscending);

  const sortedRows = rows.sort((a, b) => {
    const cellA = a.cells[columnIndex].textContent.trim();
    const cellB = b.cells[columnIndex].textContent.trim();

    if (!isNaN(cellA) && !isNaN(cellB)) {
      return isAscending ? parseFloat(cellA) - parseFloat(cellB) : parseFloat(cellB) - parseFloat(cellA);
    } else {
      return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    }
  });

  const tbody = document.getElementById("tableBody");
  sortedRows.forEach((row) => tbody.appendChild(row));
}

function addRow() {
  const newRow = {
    id: data.length + 1,
    "Chemical name": prompt("Enter Chemical name:"),
    Vender: prompt("Enter Vender:"),
    Density: prompt("Enter Density:"),
    Viscosity: prompt("Enter Viscosity:"),
    Packaging: prompt("Enter Packaging:"),
    "Pack size": prompt("Enter Pack size:"),
    Unit: prompt("Enter Unit:"),
    Quantity: parseInt(prompt("Enter Quantity:"), 10)
  };

  data.push(newRow);
  saveDataToStorage(); 
  populateTable();
}

function moveRowUp() {
  if (selectedRowIndex <= 0) return;

  const tbody = document.getElementById("tableBody");
  const row = tbody.rows[selectedRowIndex];
  tbody.insertBefore(row, tbody.rows[selectedRowIndex - 1]);

  [data[selectedRowIndex], data[selectedRowIndex - 1]] = [data[selectedRowIndex - 1], data[selectedRowIndex]];
  selectedRowIndex--;
  saveDataToStorage();
}

function moveRowDown() {
  if (selectedRowIndex === -1 || selectedRowIndex >= data.length - 1) return;

  const tbody = document.getElementById("tableBody");
  const row = tbody.rows[selectedRowIndex];
  tbody.insertBefore(row, tbody.rows[selectedRowIndex + 2] || null);

  [data[selectedRowIndex], data[selectedRowIndex + 1]] = [data[selectedRowIndex + 1], data[selectedRowIndex]];
  selectedRowIndex++;
  saveDataToStorage();
}

function deleteRow() {
  if (selectedRowIndex === -1) return;

  data.splice(selectedRowIndex, 1);
  saveDataToStorage();
  populateTable();
  selectedRowIndex = -1;
}

function refreshData() {
  populateTable();
}

function searchTable() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#tableBody tr");

  rows.forEach(row => {
    const cells = Array.from(row.getElementsByTagName("td"));
    const match = cells.some(td => td.textContent.toLowerCase().includes(input));
    row.style.display = match ? "" : "none";
  });
}

function saveDataToStorage() {
  localStorage.setItem('chemicalData', JSON.stringify(data));
}

function loadDataFromStorage() {
  const savedData = localStorage.getItem('chemicalData');
  if (savedData) {
    data = JSON.parse(savedData);
  }
}
