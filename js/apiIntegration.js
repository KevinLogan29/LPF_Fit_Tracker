// apiIntegration.js

const API_URL = "http://127.0.0.1:8000"; // Local FastAPI server

// -----------------------------
// Helper: get form values
// -----------------------------
function getWorkoutFromUI() {
    // Adjust IDs to match your HTML
    const rows = [];
    document.querySelectorAll(".workout-row").forEach(row => {
        rows.push({
            exercise: row.querySelector(".exercise").value,
            set_number: parseInt(row.querySelector(".set-number").value),
            weight: parseFloat(row.querySelector(".weight").value),
            reps: parseInt(row.querySelector(".reps").value),
            rir: parseInt(row.querySelector(".rir").value),
            pump: row.querySelector(".pump").value,
            felt: row.querySelector(".felt").value,
            rest: parseInt(row.querySelector(".rest").value),
            e1rm: parseFloat(row.querySelector(".e1rm").value)
        });
    });

    return {
        user_id: localStorage.getItem("user_id") || "user123",
        date: document.getElementById("workoutDate").value,
        notes: document.getElementById("workoutNotes").value,
        rows: rows
    };
}

function getDailyFromUI() {
    return {
        user_id: localStorage.getItem("user_id") || "user123",
        date: document.getElementById("dailyDate").value,
        pain: document.getElementById("pain").value,
        warm: document.getElementById("warm").value,
        tired: document.getElementById("tired").value,
        sore: document.getElementById("sore").value,
        desire: document.getElementById("desire").value,
        notes: document.getElementById("dailyNotes").value
    };
}

// -----------------------------
// API POST functions
// -----------------------------
async function sendWorkoutToAPI() {
    const workoutData = getWorkoutFromUI();
    try {
        const response = await fetch(`${API_URL}/workouts/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(workoutData)
        });
        const result = await response.json();
        console.log("Workout saved:", result);
    } catch (err) {
        console.error("Error sending workout:", err);
    }
}

async function sendDailyToAPI() {
    const dailyData = getDailyFromUI();
    try {
        const response = await fetch(`${API_URL}/daily/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dailyData)
        });
        const result = await response.json();
        console.log("Daily log saved:", result);
    } catch (err) {
        console.error("Error sending daily log:", err);
    }
}

// -----------------------------
// Event listeners
// -----------------------------
document.getElementById("saveWorkoutBtn")?.addEventListener("click", sendWorkoutToAPI);
document.getElementById("saveDailyBtn")?.addEventListener("click", sendDailyToAPI);
