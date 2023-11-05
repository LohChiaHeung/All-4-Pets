// Document ready function to ensure the DOM is fully loaded
$(document).ready(function () {
    $("#registerButton").show();

    // Function to show the user's name in the navigation bar
    function showUserName(userName) {
        $(".nav_username").html(`<span class="navBarUserName">Welcome, ${userName}</span> &nbsp; &nbsp; <a href="#" id="logoutLink" class="navBarLinkClass">Logout <i class="fa fa-sign-out falogOutColor" aria-hidden="true"></i></a>`);
        $("#loginNavBar").hide();
        $(".registerButtonContainer").hide();
    }

    // Function to hide the user's name in the navigation bar
    function hideUserName() {
        $("#loginNavBar").show();
        $("#logoutLink").hide();
        $(".nav_username").html(" ");
    }

    //Click event for the Logout link
    $(document).on("click", "#logoutLink", function () {
        // Clear user information from localStorage
        localStorage.removeItem("User Name");
        localStorage.removeItem("User Email");
        localStorage.removeItem("User Password");
        localStorage.removeItem("IsLoggedIn");
        sessionStorage.removeItem("User Name");
        sessionStorage.removeItem("IsLoggedIn");
        $(".secNavBarMobileVersion #loginNavBar").show();
        // Hide the user's name and show the login link
        hideUserName();
    });

    // $("#logoutLink").click(function (e) {
    //     e.preventDefault(); // Prevent the link from navigating to the href
    //     localStorage.removeItem("User Name"); // Remove the user's name from storage
    //     hideUserName(); // Hide the username
    //     window.location.href = "homepage.html"; // Redirect to the login page
    // });


    // Check if the user is already logged in
    var storedName = localStorage.getItem("User Name");

    if (storedName) {
        // User is logged in
        //showUserName(storedName);
    } else {
        // User is not logged in
        hideUserName();
    }

    // Hide the registration block initially
    $(".registerBlock").hide();

    // Register button click event
    $("#btn-register").click(function () {
        var userEmail = $("#reg-email").val();
        var userPassword = $("#reg-password").val();
        var userName = $("#reg-userName").val();

        // Validate email format using a regular expression
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(userEmail)) {
            // Display an error message for invalid email format
            $("#registrationError").text("Invalid email format. Please enter a valid email address.");
            return; // Exit registration function
        } else {
            // Clear the error message if the email is valid
            $("#registrationError").text("");
        }

        // Perform password validation here if needed
        if (userPassword.length < 8) {
            $("#registrationError").text("Password must be at least 8 characters long.");
            return; // Prevent registration if validation fails
        }

        // Check if the user name is provided
        if (!userName) {
            $("#registrationError").text("Please enter a username.");
            return; // Prevent registration if validation fails
        }

        // Perform password validation here if needed

        // Store the user's name in localStorage
        localStorage.setItem("User Name", userName);
        localStorage.setItem("User Email", userEmail); // Add this line
        localStorage.setItem("User Password", userPassword); // Add this line


        alert("Congratulations! Your account is registered successfully!");

        // Hide the register block and show the login block
        $(".registerBlock").hide();
        $(".loginBlock").show();
    });

    // Login button click event
    $("#btn-login").click(function () {
        var userEmail = $("#log-email").val();
        var userPassword = $("#log-password").val();
        var storedEmail = localStorage.getItem("User Email");
        var storedPassword = localStorage.getItem("User Password");
        var storedName = localStorage.getItem("User Name");

        if (userEmail === storedEmail && userPassword === storedPassword) {
            // Login successful
            alert("Welcome Back, " + storedName + "!");

            // Set the text of the navUserName element to the username
            hideUserName();
            showUserName(storedName);
            sessionStorage.setItem("IsLoggedIn", "true");
            sessionStorage.setItem("User Name", storedName);

            // Hide the login block
            $(".loginBlock").hide();
            window.location.href = "homepage.html"; // Redirect to the login page
        } else {
            // Login failed
            alert("Incorrect email or password. Please try again.");
        }
    });

    // Register button click event to switch to registration block
    $("#registerButton").click(function () {
        // Show the registration block and hide the login block
        $(".registerBlock").show();
        $(".loginBlock").hide();
        $("#showLoginSection").show();
        $(this).hide();
        // Reset the input fields
        $("#reg-email, #reg-password, #reg-userName").val("");
    });

    // ShowLoginSection button click event to switch to login block
    $("#showLoginSection").click(function () {
        // Hide the registration block and show the login block
        $(".registerBlock").hide();
        $(".loginBlock").show();
        $(this).hide();
        $("#registerButton").show();
        // Reset the input fields
        $("#log-email, #log-password").val("");
    });
});

// Navigation Bar (Mobile Version Toggle)
function openNav() {
    document.getElementById("mobileVerNavBar").style.display = "block";
}

function closeNav() {
    document.getElementById("mobileVerNavBar").style.display = "none";
}

function toggleNav() {
    var navBar = document.getElementById("mobileVerNavBar");
    if (navBar.style.display === "block") {
        navBar.style.display = "none";
    } else {
        navBar.style.display = "block";
    }
}


//Checking User is logging or not?
// Function to show the username
function showUserName(userName) {
    $(".nav_username").html(`<span class="navBarUserName">Welcome, ${userName}</span> &nbsp; &nbsp; &nbsp; <a href="#" id="logoutLink" class="navBarLinkClass">Logout <i class="fa fa-sign-out falogOutColor" aria-hidden="true"></i></a>`);
    document.getElementById("navUserName").innerHTML = `<a href="userPage.html" class="hrefName">Welcome, ${userName} </a>  <a href="#" id="logoutLink" class="navBarLinkClass">Logout <i class="fa fa-sign-out falogOutColor" aria-hidden="true"></i></a>`;
    document.getElementById("navUserName").style.display = "flex";
    document.getElementById("loginNavBar").style.display = "none";
    $("#loginNavBar").hide();
    $(".secNavBarMobileVersion #loginNavBar").hide();
}

// Function to hide the username
function hideUserName() {
    document.getElementById("navUserName").style.display = "none";
}

// Check if the user is logged in on page load
document.addEventListener("DOMContentLoaded", function () {
    var isLoggedIn = sessionStorage.getItem("IsLoggedIn");
    var storedName = sessionStorage.getItem("User Name");

    if (isLoggedIn === "true" && storedName) {
        // User is logged in, so display the username
        showUserName(storedName);
    } else {
        // User is not logged in, so hide the username
        hideUserName();
    }
});