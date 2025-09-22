// ----------------------------
// API configuration
// ----------------------------
const API_URL = "http://YOUR_BACKEND_URL:8000"; // Replace with your FastAPI server URL

// ----------------------------
// Helper functions
// ----------------------------

// 1. Send workout
async function sendWorkoutToAPI(userId, date, notes, rows) {
    const workoutData = { user_id: userId, date, notes, rows };
    try {
        const response = await fetch(`${API_URL}/workouts/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(workoutData)
        });
        const data = await response.json();
        console.log("Workout saved:", data);
        alert("Workout saved!");
    } catch (err) {
        console.error("Error saving workout:", err);
        alert("Failed to save workout to server.");
    }
}

// 2. Send daily log
async function sendDailyToAPI(userId, date, dailyLog) {
    try {
        const response = await fetch(`${API_URL}/daily/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, date, ...dailyLog })
        });
        const data = await response.json();
        console.log("Daily log saved:", data);
    } catch (err) {
        console.error("Error saving daily log:", err);
    }
}

// 3. Send nutrition log
async function sendNutritionToAPI(userId, date, nutrition) {
    try {
        const response = await fetch(`${API_URL}/nutrition/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, date, ...nutrition })
        });
        const data = await response.json();
        console.log("Nutrition log saved:", data);
    } catch (err) {
        console.error("Error saving nutrition log:", err);
    }
}

// 4. Send cardio log
async function sendCardioToAPI(userId, date, cardio) {
    try {
        const response = await fetch(`${API_URL}/cardio/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, date, ...cardio })
        });
        const data = await response.json();
        console.log("Cardio log saved:", data);
    } catch (err) {
        console.error("Error saving cardio log:", err);
    }
}

// ----------------------------
// UI-reading functions
// ----------------------------

// Example: read workout rows from your table
function getWorkoutRowsFromUI() {
    const rows = [];
    document.querySelectorAll(".workoutRow").forEach((row, index) => {
        rows.push({
            exercise: row.querySelector(".exercise").value,
            set_number: index + 1,
            weight: parseFloat(row.querySelector(".weight").value),
            reps: parseInt(row.querySelector(".reps").value),
            rir: parseInt(row.querySelector(".rir").value),
            pump: row.querySelector(".pump").value || "",
            felt: row.querySelector(".felt").value || "",
            rest: parseInt(row.querySelector(".rest").value),
            e1rm: parseFloat(row.querySelector(".e1rm").value) || null
        });
    });
    return rows;
}

// Example: read daily log
function getDailyLogFromUI() {
    return {
        pain: document.getElementById("pain").value,
        warm: document.getElementById("warm").value,
        tired: document.getElementById("tired").value,
        sore: document.getElementById("sore").value,
        desire: document.getElementById("desire").value,
        notes: document.getElementById("dailyNotes").value
    };
}

// Example: read nutrition log
function getNutritionFromUI() {
    return {
        calories: parseInt(document.getElementById("calories").value),
        weight: parseFloat(document.getElementById("weight").value),
        steps: parseInt(document.getElementById("steps").value),
        fat: parseInt(document.getElementById("fat").value),
        carbs: parseInt(document.getElementById("carbs").value),
        protein: parseInt(document.getElementById("protein").value),
        sleep: parseFloat(document.getElementById("sleep").value),
        rhr: parseInt(document.getElementById("rhr").value),
        hrv: parseInt(document.getElementById("hrv").value)
    };
}

// Example: read cardio log
function getCardioFromUI() {
    return {
        exercise: document.getElementById("cardioExercise").value,
        minutes: parseInt(document.getElementById("cardioMinutes").value),
        speed: parseFloat(document.getElementById("cardioSpeed").value),
        incline: parseFloat(document.getElementById("cardioIncline").value),
        hr_avg: parseInt(document.getElementById("cardioHR").value)
    };
}

// ----------------------------
// Event listeners for buttons
// ----------------------------
document.getElementById("saveWorkoutBtn").addEventListener("click", () => {
    const userId = "user123"; // Replace with dynamic login if needed
    const date = document.getElementById("workoutDate").value;
    const notes = document.getElementById("workoutNotes").value;
    const rows = getWorkoutRowsFromUI();
    sendWorkoutToAPI(userId, date, notes, rows);
});

document.getElementById("saveDailyBtn").addEventListener("click", () => {
    const userId = "user123";
    const date = document.getElementById("dailyDate").value;
    const dailyLog = getDailyLogFromUI();
    sendDailyToAPI(userId, date, dailyLog);
});

document.getElementById("saveNutritionBtn").addEventListener("click", () => {
    const userId = "user123";
    const date = document.getElementById("nutritionDate").value;
    const nutrition = getNutritionFromUI();
    sendNutritionToAPI(userId, date, nutrition);
});

document.getElementById("saveCardioBtn").addEventListener("click", () => {
    const userId = "user123";
    const date = document.getElementById("cardioDate").value;
    const cardio = getCardioFromUI();
    sendCardioToAPI(userId, date, cardio);
});
