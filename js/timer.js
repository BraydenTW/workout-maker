let numOfExercises = 0;

const CURRENT_TITLE = document.querySelector(".current-title");
const CURRENT_TIME = document.querySelector(".current-time");

let timeInterval;

let countdown;

let workoutSequence = [];

let readyTime = 10000;

let currentWorkoutIndex = 0;

const TIMER_SOUND = document.createElement("AUDIO");
TIMER_SOUND.setAttribute("class", "timer-alert");
TIMER_SOUND.setAttribute("src", "../audio/timerDone.mp3");
document.body.appendChild(TIMER_SOUND);


document.querySelector(".hidden-boi").addEventListener("click", () => {
    document.querySelector(".timer-alert").load();
    document.querySelector(".timer-alert").play();
    setTimeout(() => {
        document.querySelector(".timer-alert").pause();
        document.querySelector(".timer-alert").currentTime = 0;
    }, 1000);
});

function playAlarmSound() {
    document.querySelector(".hidden-boi").click();
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
    workoutSequence.pop();
    workoutList = workoutList.reverse();
    for (let i = 0; i < exerciseLength; i++) { // Each Set
        let tempList = [];
        workoutList.forEach((item, index) => { // Each workout per set
            if (index <= i) {
                tempList.push(item);
            }
        });
        tempList = tempList.reverse(); // Change reverse
        tempList.forEach(item => {
            reverseSequence.push(item);
        });
        reverseSequence.push("Rest");
    }
    reverseSequence = reverseSequence.reverse();
    workoutSequence = workoutSequence.concat(reverseSequence);
}

function startWorkout() {
    // console.log(workoutSequence[currentWorkoutIndex]);
    if (currentWorkoutIndex != 0 && workoutSequence[currentWorkoutIndex] != "Rest") {
        console.log(currentWorkoutIndex)
        console.log(workoutSequence[currentWorkoutIndex])
        document.querySelector(".current-title").innerHTML = "Get ready <br> for " + workoutSequence[currentWorkoutIndex];
        document.querySelector(".current-time").textContent = "5";
        setTimeout(() => {
            document.querySelector(".current-time").textContent = "4";
        }, 1000);
        setTimeout(() => {
            document.querySelector(".current-time").textContent = "3";
        }, 2000);
        setTimeout(() => {
            document.querySelector(".current-time").textContent = "2";
        }, 3000);
        setTimeout(() => {
            document.querySelector(".current-time").textContent = "1";
        }, 4000);
        setTimeout(() => {
            document.querySelector(".current-time").textContent = "0";
        }, 5000);
        playAlarmSound();
    } else {
        readyTime = 0;
        playAlarmSound();
    }
    // Update page
    setTimeout(() => {
        if (currentWorkoutIndex === workoutSequence.length) {
            document.querySelector(".workout-section").style.display = "none";
        }
    
        document.querySelector(".current-title").textContent = workoutSequence[currentWorkoutIndex];
        // console.log(document.querySelector(".current-title").textContent);
        if (document.querySelector(".current-title").textContent === "Rest") {
            countdown = restTime;
            // console.log("rest");
        } else {
            countdown = workoutTime;
        }
        document.querySelector(".current-time").innerHTML = countdown;
        timeInterval = setInterval(() => {
            document.querySelector(".current-time").innerHTML = countdown;
            countdown--;
            document.querySelector(".current-time").innerHTML = countdown;
            if (countdown === 0) {
                setTimeout(() => {
                    clearInterval(timeInterval);
                    if (currentWorkoutIndex === workoutSequence.length - 1) {
                        alert("done")
                    } else {
                        currentWorkoutIndex++;
                        readyTime = 6000;
                        startWorkout();
                    }
                }, 999);
            }
        }, 1000);
    }, readyTime);
}