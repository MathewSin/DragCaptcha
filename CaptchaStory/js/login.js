let failedLoginAttempts = 0; // Counter for failed login attempts
let captchaCompleted = false; // Track if CAPTCHA has been completed
let captchaRequired = false; // Track if CAPTCHA is required after failed attempts or successful login

function validateLogin(event) {
    event.preventDefault(); // Prevent form from submitting

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Check if the username and password are correct
    if (username === "admin" && password === "admin") {
        errorMessage.textContent = '';

        // If CAPTCHA is required, show CAPTCHA before redirecting
        if (!captchaCompleted) {
            captchaRequired = true;
            showCaptchaPopup(); // Show CAPTCHA before redirecting
        } else {
            // Redirect to home page if CAPTCHA was completed successfully
            window.location.href = '../html/home.html';
        }
    } else {
        failedLoginAttempts++; // Increment failed login attempts
        errorMessage.textContent = 'Invalid username or password!';
        document.getElementById('password').value = '';

        // Check if failed attempts reached 5
        if (failedLoginAttempts >= 5) {
            errorMessage.textContent = 'You have failed to login 5 times. Please complete the CAPTCHA and try again.';
            captchaRequired = true; // Set to true to indicate that CAPTCHA is now required
            showCaptchaPopup(); // Show CAPTCHA after 5 failed attempts
        }
    }
}

function checkCaptchaLock() {
    const captchaLock = sessionStorage.getItem("captchaLock");
    if (captchaLock && Date.now() < captchaLock) {
        // Jika waktu belum habis, redirect kembali ke index2.html
        window.location.href = "../html/index2.html";
        return false;
    }
    return true;
}

function showCaptchaPopup() {
    if (!checkCaptchaLock()) return; // Cek apakah CAPTCHA masih terkunci

    const modal = document.getElementById("captchaModal");
    const captchaContent = document.getElementById("captcha-content");
    loadRandomCaptcha(captchaContent);

    modal.style.display = "block";
}


// Function to reset login fields and error message
function resetLogin() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('error-message').textContent = '';

    captchaCompleted = false; // Reset CAPTCHA completion status
    captchaRequired = false; // Reset CAPTCHA requirement
}
