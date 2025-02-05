let captchaTimeout; // Global variable to hold timeout
let captchaFailCount = 0; // Variable to count failed CAPTCHA attempts

function showCaptchaPopup() {
    const modal = document.getElementById("captchaModal");
    const captchaContent = document.getElementById("captcha-content");

    // Load random CAPTCHA
    loadRandomCaptcha(captchaContent);

    modal.style.display = "block"; // Show the modal
    modal.style.pointerEvents = "auto"; // Enable interactions for now

    // Close the modal when user clicks on <span> (x) (disabled during 30s timeout)
    document.getElementById("closeModal").onclick = function () {
        // Prevent closing during 30s lock
        if (captchaFailCount >= 3) {
            Swal.fire({
                title: "Wait 30 seconds",
                text: "You cannot close the CAPTCHA right now. Please wait until the timer finishes.",
                icon: "info",
                confirmButtonText: "OK",
            });
        } else {
            modal.style.display = "none";
        }
    };

    // Close the modal if user clicks outside of it (disabled during 30s timeout)
    window.onclick = function (event) {
        if (event.target == modal && captchaFailCount < 3) {
            modal.style.display = "none";
        } else if (captchaFailCount >= 3) {
            Swal.fire({
                title: "Wait 30 seconds",
                text: "You cannot close the CAPTCHA right now. Please wait until the timer finishes.",
                icon: "info",
                confirmButtonText: "OK",
            });
        }
    };
}

function completeCaptcha() {
    clearTimeout(captchaTimeout); // Clear timeout when CAPTCHA is completed
    const modal = document.getElementById("captchaModal");
    modal.style.display = "none"; // Close CAPTCHA modal immediately

    captchaCompleted = true; // Mark CAPTCHA as completed
    captchaRequired = false; // Reset CAPTCHA requirement after completion

    captchaFailCount = 0; // Reset failed attempts counter after successful completion

    if (failedLoginAttempts >= 5) {
        // If user failed 5 times, show message and reset form
        Swal.fire({
            title: "CAPTCHA Completed",
            text: "Please enter your username and password again to proceed.",
            icon: "info",
            confirmButtonText: "OK",
        }).then(() => {
            resetLogin(); // Reset form to allow user to re-enter login details
            failedLoginAttempts = 0; // Reset failed attempts counter
        });
    } else {
        window.location.href = "https://mathewsin.github.io/CaptchaTester/"; // Redirect to another page
    }
}

// Function to reload the CAPTCHA after incorrect answer
function reloadCaptcha() {
    const captchaContent = document.getElementById("captcha-content");
    captchaContent.innerHTML = ""; // Clear existing CAPTCHA content
    loadRandomCaptcha(captchaContent); // Load new random CAPTCHA

    captchaFailCount++; // Increment failed CAPTCHA attempts

    if (captchaFailCount >= 3) {
        // If failed 3 times, show the popup and redirect immediately
        Swal.fire({
            title: "Too many attempts",
            text: "You have failed the CAPTCHA 3 times. You will be redirected to the login page.",
            icon: "error",
            confirmButtonText: "OK",
            allowOutsideClick: false, // Disable clicking outside to close
            showCancelButton: false, // Disable cancel button
        }).then(() => {
            window.location.href = "../html/index2.html";
        });
    }
}

// Function to load random CAPTCHA
function loadRandomCaptcha(captchaContent) {
    const captchaPages = ["page1.html", "page2.html", "page3.html"];
    const randomIndex = Math.floor(Math.random() * captchaPages.length);
    const randomPage = `${captchaPages[randomIndex]}?t=${Date.now()}`;

    fetch(randomPage)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then((html) => {
            captchaContent.innerHTML = html;

            // Set data-type based on the loaded page
            if (randomPage.includes("page1.html")) {
                captchaContent.setAttribute("data-type", "house");
            } else if (randomPage.includes("page2.html")) {
                captchaContent.setAttribute("data-type", "fruit");
            } else if (randomPage.includes("page3.html")) {
                captchaContent.setAttribute("data-type", "animal");
            }

            // Initialize the CAPTCHA event listeners
            initializeCaptcha(captchaContent.getAttribute("data-type"));

            // Restart the timeout for CAPTCHA
            restartCaptchaTimeout();
        })
        .catch((error) => {
            console.error("Error loading CAPTCHA:", error);
            Swal.fire({
                title: "Error loading CAPTCHA",
                text: "Please try again later.",
                icon: "error",
                confirmButtonText: "OK",
            });
        });
}

// Function to restart CAPTCHA timeout
function restartCaptchaTimeout() {
    clearTimeout(captchaTimeout); // Clear previous timeout
    captchaTimeout = setTimeout(() => {
        Swal.fire({
            title: "CAPTCHA Failed",
            text: "Time limit exceeded. Please try logging in again.",
            icon: "error",
            confirmButtonText: "OK",
        }).then(() => {
            const modal = document.getElementById("captchaModal");
            modal.style.display = "none"; // Close the modal
            resetLogin(); // Reset login form and error message
        });
    }, 15000); // 15 seconds
}

// Initialize CAPTCHA event listeners based on type
function initializeCaptcha(captchaType) {
    console.log("Initializing CAPTCHA of type:", captchaType);
    if (captchaType === "fruit") {
        initializeFruitCaptcha(); // Initialize fruit-related event listeners
    } else if (captchaType === "house") {
        initializeHouseCaptcha(); // Initialize house-related event listeners
    } else if (captchaType === "animal") {
        initializeAnimalCaptcha(); // Initialize animal-related event listeners
    } else {
        console.error("Unknown CAPTCHA type:", captchaType);
    }
}

// Initialize the CAPTCHA with drag-and-drop for fruit
function initializeFruitCaptcha() {
    const carrotImage = document.getElementById("carrot");
    const appleImage = document.getElementById("apple");
    const bananaImage = document.getElementById("banana");

    if (!carrotImage || !appleImage || !bananaImage) {
        console.error("CAPTCHA images not found. Make sure the fruit images are loaded correctly.");
        return;
    }

    const images = [carrotImage, appleImage, bananaImage];

    // Shuffle the image order
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        images[i].parentNode.appendChild(images[j]);
    }

    // Set draggable attribute on the correct answer
    carrotImage.setAttribute("draggable", "true");
    carrotImage.id = "draggable"; // Set the ID for drag-and-drop
    appleImage.id = "apple";
    bananaImage.id = "banana";

    // Set dragstart event listener
    carrotImage.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("text/plain", "draggable");
    });

    // Enable drag-and-drop functionality
    enableDragAndDrop("fruit");
}

// Initialize the CAPTCHA with drag-and-drop for house
function initializeHouseCaptcha() {
    const rabbitHouseImage = document.getElementById("rabbitHouse");
    const dogHouseImage = document.getElementById("dogHouse");
    const catHouseImage = document.getElementById("catHouse");

    if (!rabbitHouseImage || !dogHouseImage || !catHouseImage) {
        console.error("CAPTCHA images not found. Make sure the house images are loaded correctly.");
        return;
    }

    const images = [rabbitHouseImage, dogHouseImage, catHouseImage];

    // Shuffle the image order
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        images[i].parentNode.appendChild(images[j]);
    }

    // Set draggable attribute on the correct answer
    rabbitHouseImage.setAttribute("draggable", "true");
    rabbitHouseImage.id = "draggable"; // Set the ID for drag-and-drop
    dogHouseImage.id = "dogHouse";
    catHouseImage.id = "catHouse";

    // Set dragstart event listener
    rabbitHouseImage.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("text/plain", "draggable");
    });

    // Enable drag-and-drop functionality
    enableDragAndDrop("house");
}

// Initialize the CAPTCHA with drag-and-drop for animal
function initializeAnimalCaptcha() {
    const fishImage = document.getElementById("fish");
    const birdImage = document.getElementById("bird");
    const turtleImage = document.getElementById("turtle");

    if (!fishImage || !birdImage || !turtleImage) {
        console.error("CAPTCHA images not found. Make sure the animal images are loaded correctly.");
        return;
    }

    const images = [fishImage, birdImage, turtleImage];

    // Shuffle the image order
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        images[i].parentNode.appendChild(images[j]);
    }

    // Set draggable attribute on the correct answer
    turtleImage.setAttribute("draggable", "true");
    turtleImage.id = "draggable"; // Set the ID for drag-and-drop
    fishImage.id = "fish";
    birdImage.id = "bird";

    // Set dragstart event listener
    turtleImage.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("text/plain", "draggable");
    });

    // Enable drag-and-drop functionality
    enableDragAndDrop("animal");
}

// Function to enable drag-and-drop
function enableDragAndDrop(captchaType) {
    const dropZone = document.getElementById("dropBox");

    // Allow Drop
    dropZone.addEventListener("dragover", function (event) {
        event.preventDefault();
        dropZone.classList.add("dragover");
    });

    // Handle Drop Event
    dropZone.addEventListener("drop", function (event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text/plain");

        if (captchaType === "fruit" && data === "draggable") {
            Swal.fire({
                title: "Correct!",
                text: "CAPTCHA completed successfully.",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                completeCaptcha(); // CAPTCHA completed successfully
            });
        } else if (captchaType === "house" && data === "draggable") {
            Swal.fire({
                title: "Correct!",
                text: "CAPTCHA completed successfully.",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                completeCaptcha(); // CAPTCHA completed successfully
            });
        } else if (captchaType === "animal" && data === "draggable") {
            Swal.fire({
                title: "Correct!",
                text: "CAPTCHA completed successfully.",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                completeCaptcha(); // CAPTCHA completed successfully
            });
        } else {
            Swal.fire({
                title: "Incorrect!",
                text: "Try dragging the correct image!",
                icon: "error",
                confirmButtonText: "OK",
            }).then(() => {
                reloadCaptcha();
            });
        }
    });

    dropZone.addEventListener("dragleave", function () {
        dropZone.classList.remove("dragover");
    });
}

// Reset login form and error message
function resetLogin() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("error-message").textContent = "";

    // Reset CAPTCHA requirement
    if (captchaRequired) {
        showCaptchaPopup(); // Show CAPTCHA again for the user to try again
    } else {
        captchaCompleted = false; // Reset CAPTCHA completion status
    }
}
