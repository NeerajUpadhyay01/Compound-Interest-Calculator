document.getElementById('interestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateInterest();
});

function calculateInterest() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100;
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);

    let currentBalance = principal;
    let currentDate = new Date(startDate);
    let year = 1;
    const resultBody = document.getElementById('resultBody');
    resultBody.innerHTML = '';

    while (currentDate < endDate) {
        const yearEndDate = new Date(currentDate);
        yearEndDate.setFullYear(yearEndDate.getFullYear() + 1);
        
        if (yearEndDate > endDate) {
            yearEndDate.setTime(endDate.getTime());
        }

        const daysInYear = (yearEndDate - currentDate) / (1000 * 60 * 60 * 24);
        const interestEarned = currentBalance * (Math.pow(1 + rate, daysInYear / 365) - 1);
        const endingBalance = currentBalance + interestEarned;

        const row = resultBody.insertRow();
        row.insertCell(0).textContent = year;
        row.insertCell(1).textContent = formatDate(currentDate);
        row.insertCell(2).textContent = formatDate(yearEndDate);
        row.insertCell(3).textContent = formatCurrency(currentBalance);
        row.insertCell(4).textContent = formatCurrency(interestEarned);
        row.insertCell(5).textContent = formatCurrency(endingBalance);

        currentBalance = endingBalance;
        currentDate = yearEndDate;
        year++;
    }
  document.getElementById("copyButton").style.display = "block";
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = String(date.getFullYear());
  return `${day}/${month}/${year}`;
}

function formatCurrency(amount) {
    return amount.toFixed(2);
}

document.getElementById("copyButton").addEventListener("click", copyTable);

function copyTable() {
  const table = document.getElementById("resultTable");
  const range = document.createRange();
  range.selectNode(table);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  try {
    document.execCommand("copy");
    alert("Table copied to clipboard!");
  } catch (err) {
    console.error("Unable to copy table", err);
    alert("Failed to copy table. Please try again or copy manually.");
  }

  window.getSelection().removeAllRanges();
}