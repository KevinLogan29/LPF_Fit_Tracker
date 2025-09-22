// Example: Save workout data
async function saveWorkout(workoutData) {
    try {
        const response = await fetch('http://localhost:5000/save/workout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(workoutData),  // e.g., {exercise: 'Squat', sets: 4, ...}
        });
        if (response.ok) {
            const result = await response.json();
            console.log('Saved with ID:', result.id);
            // Update UI, e.g., add to local list or refresh from GET /workouts
        } else {
            console.error('Save failed');
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}

// Usage: On form submit
// const data = { exercise: document.getElementById('exercise').value, ... };
// saveWorkout(data);
