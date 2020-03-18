let presetSlideIndex = 0;

let exerciseLength = 0;
let workoutTime = 0;
let restTime = 0;

let workoutList = [];

let increaseSlide = true;

const INPUT_EXERCISES = document.querySelectorAll(".presets-input")[3];


function submitWorkouts() {
    let checkCount = 0;
    document.querySelectorAll(".workout-input").forEach((item, index) => {
        if (item.value != "") {
            checkCount++;
            workoutList.push(item.value);
        } else {

        }
    });
    checkCount === parseInt(exerciseLength) ? document.querySelector(".presets").style.display = "none" : alert("Please fill out all the workouts");
    console.log(`workoutTime = ${workoutTime}, \n restTime = ${restTime} \n #ofExercises = ${exerciseLength} \n workouts = ${workoutList}`);

    checkCount === parseInt(exerciseLength) ? document.querySelector(".workout-section").style.display = "block" : "";
}


document.querySelectorAll(".next-button").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".presets-slide")[presetSlideIndex].style.display = "none";
        console.log(presetSlideIndex);
        increaseSlide ? presetSlideIndex++ : "";
        document.querySelectorAll(".presets-slide")[presetSlideIndex].style.display = "block";
        console.log(presetSlideIndex);
    });
});

document.querySelector(".workout-time-btn").addEventListener("click", () => {
    workoutTime = document.querySelector(".workout-time-amount").value;
    workoutTime = parseInt(workoutTime);
    if (workoutTime < 30 || workoutTime > 60) {
        alert("Enter a between 30 and 60");
        document.querySelectorAll(".presets-slide")[0].style.display = "block";
        document.querySelectorAll(".presets-slide")[1].style.display = "none";
        increaseSlide ? presetSlideIndex : "";
        increaseSlide = false;
    } else if (!Number.isInteger(parseInt(workoutTime))) {
        alert("Type in a real number");
        document.querySelectorAll(".presets-slide")[0].style.display = "block";
        document.querySelectorAll(".presets-slide")[1].style.display = "none";
        increaseSlide ? presetSlideIndex : "";
        increaseSlide = false;
    } else {
        document.querySelectorAll(".presets-slide")[0].style.display = "none";
        document.querySelectorAll(".presets-slide")[1].style.display = "block";
        increaseSlide = true;
    }
});

document.querySelector(".rest-time-btn").addEventListener("click", () => {
    restTime = document.querySelector(".rest-time-amount").value;
    restTime = parseInt(restTime);
    if (restTime < 15 || restTime > 30) {
        alert("Enter a between 15 and 30");
        document.querySelectorAll(".presets-slide")[1].style.display = "block";
        document.querySelectorAll(".presets-slide")[2].style.display = "none";
        increaseSlide ? presetSlideIndex : "";
        increaseSlide = false;
    } else if (!Number.isInteger(parseInt(restTime))) {
        alert("Type in a real number");
        document.querySelectorAll(".presets-slide")[1].style.display = "block";
        document.querySelectorAll(".presets-slide")[2].style.display = "none";
        increaseSlide ? presetSlideIndex : "";
        increaseSlide = false;
    } else {
        document.querySelectorAll(".presets-slide")[1].style.display = "none";
        document.querySelectorAll(".presets-slide")[2].style.display = "block";
        increaseSlide = true;
    }
});

document.querySelector(".submit-amount").addEventListener("click", () => {
    exerciseLength = document.querySelector(".exercise-amount").value;
    if (exerciseLength < 5 || exerciseLength > 10) {
        alert("Enter a between 5 and 10");
        document.querySelectorAll(".presets-slide")[2].style.display = "block";
        document.querySelectorAll(".presets-slide")[3].style.display = "none";
        increaseSlide ? presetSlideIndex : "";
        increaseSlide = false;
    } else if (!Number.isInteger(parseInt(exerciseLength))) {
        alert("Type in a real number");
        document.querySelectorAll(".presets-slide")[2].style.display = "block";
        document.querySelectorAll(".presets-slide")[3].style.display = "none";
        increaseSlide ? presetSlideIndex : "";
        increaseSlide = false;
    } else {
        for (let i = 0; i < exerciseLength; i++) {
            let exerciseNum = i + 1;
            let exerciseInput = document.createElement("INPUT");
            exerciseInput.classList.add("text-input");
            exerciseInput.classList.add("workout-input");
            exerciseInput.setAttribute("type", "text");
            exerciseInput.setAttribute("placeholder", "Exercise " + exerciseNum);
            INPUT_EXERCISES.appendChild(exerciseInput);
            INPUT_EXERCISES.appendChild(document.createElement("BR"));
        }
        INPUT_EXERCISES.innerHTML += "<br><button class='submit-workouts' onclick='submitWorkouts()'>Start</button>";
        let defaultTop = document.querySelector(".last-slide").style.top.substring(0, 3);
        document.querySelector(".last-slide").style.top = ((exerciseLength - 5) * 30) + parseInt(defaultTop) + "px";
        document.querySelectorAll(".presets-slide")[2].style.display = "none";
        document.querySelectorAll(".presets-slide")[3].style.display = "block";
        increaseSlide = true;
    }
});