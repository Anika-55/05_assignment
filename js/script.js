// Global counters
let heartCount = 0;
let coinCount = 100;
let copyCount = 0;

// Navbar elements
const heartCountEl = document.getElementById("heartCount");
const coinCountEl = document.getElementById("coinCount");
const copyCountEl = document.getElementById("copyCount");

// History
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

// ❤️ Heart functionality
document.querySelectorAll(".heart").forEach(btn => {
  btn.addEventListener("click", () => {
    // If already filled, do nothing
    if (btn.textContent === "❤️") return;

    heartCount++;
    heartCountEl.textContent = heartCount;
    btn.textContent = "❤️"; // turn filled
  });
});

// 📋 Copy functionality
document.querySelectorAll(".copyBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const number = btn.parentElement.querySelector(".callBtn").dataset.number;

    // Copy to clipboard
    navigator.clipboard.writeText(number).then(() => {
      alert(`Number ${number} copied!`);
      copyCount++;
      copyCountEl.textContent = copyCount;
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  });
});

// 📞 Call functionality
document.querySelectorAll(".callBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const serviceName = btn.dataset.name;
    const serviceNumber = btn.dataset.number;

    // Check coins
    if (coinCount < 20) {
      alert("Not enough coins! Each call costs 20.");
      return;
    }

    // Deduct coins
    coinCount -= 20;
    coinCountEl.textContent = coinCount;

    // Show alert
    alert(`Calling ${serviceName} (${serviceNumber})...`);

    // Add entry to call history with time
    const now = new Date();
    const timeStr = now.toLocaleTimeString(); // local time
    const li = document.createElement("li");
    li.textContent = `${serviceName} (${serviceNumber}) - ${timeStr}`;
    historyList.prepend(li); // latest call on top
  });
});

// 🧹 Clear history functionality
clearHistoryBtn.addEventListener("click", () => {
  historyList.innerHTML = "";
});
