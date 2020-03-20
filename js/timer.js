let numOfExercises = 0;

const CURRENT_TITLE = document.querySelector(".current-title");
const CURRENT_TIME = document.querySelector(".current-time");

let timeInterval;

let countdown;

let workoutSequence = [];

let currentWorkoutIndex = 0;

const TIMER_SOUND = document.querySelector(".timer-alert");

function playAlarmSound() {
    TIMER_SOUND.play();
    setTimeout(() => {
        TIMER_SOUND.pause();
        TIMER_SOUND.currentTime = 0;
    }, 1000);
}

function setupSequence() {
    // Sequence
    // Going up pyramid
    for (let i = 0; i < exerciseLength; i++) { // Each Set
        workoutList.forEach((item, index) => { // Each workout per set
            if (index <= i) {
                workoutSequence.push(item);
            }
        });
        workoutSequence.push("Rest");
    }
    let reverseSequence = [];
    for (let i = 0; i < exerciseLength; i++) { // Each Set
        workoutList.forEach((item, index) => { // Each workout per set
            if (index <= i) {
                reverseSequence.push(item);
            }
        });
        reverseSequence.push("Rest");
    }
    reverseSequence = reverseSequence.reverse();
    workoutSequence = workoutSequence.concat(reverseSequence);
}

function startWorkout() {

    // Update page

    if (currentWorkoutIndex === workoutSequence.length) {
        document.querySelector(".workout-section").style.display = "none";
    }

    document.querySelector(".current-title").textContent = workoutSequence[currentWorkoutIndex];
    console.log(document.querySelector(".current-title").textContent);
    if (document.querySelector(".current-title").textContent === "Rest") {
        countdown = restTime;
        console.log("rest");
    } else {
        countdown = workoutTime;
    }
    document.querySelector(".current-time").innerHTML = countdown;
    timeInterval = setInterval(() => {
        document.querySelector(".current-time").innerHTML = countdown;
        countdown--;
        document.querySelector(".current-time").innerHTML = countdown;
        if (countdown === 0) {
            playAlarmSound();
            setTimeout(() => {
                clearInterval(timeInterval);
                if (currentWorkoutIndex === workoutSequence.length) {
                } else {
                    currentWorkoutIndex++;
                    startWorkout();
                }
            }, 999);
        }
    }, 1000);
}