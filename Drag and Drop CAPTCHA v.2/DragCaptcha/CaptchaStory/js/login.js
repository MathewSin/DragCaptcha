let failedLoginAttempts = 0; // Counter for failed login attempts
let captchaCompleted = false; // Track if CAPTCHA has been completed
let captchaRequired = false; // Track if CAPTCHA is required after failed attempts

function validateLogin(event) {
    event.preventDefault(); // Prevent form from submitting

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Check if the username and password are correct
    if (username === "admin" && password === "admin") {
        errorMessage.textContent = '';

        // If CAPTCHA is required, show CAPTCHA
        if (captchaRequired) {
            showCaptchaPopup(); // Show CAPTCHA if it is required
        } else {
            // If CAPTCHA was completed before, redirect to the home page
            if (captchaCompleted) {
                window.location.href = '../html/home.html'; // Redirect after successful login and CAPTCHA
            } else {
                // Show CAPTCHA if not completed yet
                showCaptchaPopup();
            }
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


