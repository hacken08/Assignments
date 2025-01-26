// import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD2gdh-bGeNaVMtmcf3rHx-YHCJwSQkM_Q",
    authDomain: "my-portfolio-7a719.firebaseapp.com",
    projectId: "my-portfolio-7a719",
    storageBucket: "my-portfolio-7a719.firebasestorage.app",
    messagingSenderId: "128299156888",
    appId: "1:128299156888:web:ba1016954fd8cef94157ed",
    measurementId: "G-DFD9R51ECR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// on form submit
const button = document.getElementById("submit");
button.addEventListener("click", async () => {

    //  fetching user data and validating
    const projectName = document.getElementById("project_name").value.trim();
    const budget = document.getElementById("budget").value.trim();
    const projectDescription = document.getElementById("project_description").value.trim();
    const timeLine = document.getElementById("timeline").value.trim();
    const validationErrors = validateForm({ projectName, budget, projectDescription, timeLine });

    if (validationErrors.length > 0) {
        alert("Please fix the following errors:\n" + validationErrors.join("\n"));
        return;
    }

    console.log({   
        projectName,
        budget,
        projectDescription,
        timeLine,
    });

    // saving data to database
    db.collection("projects").add({
        projectName,
        budget,
        projectDescription,
        timeLine
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        alert("Your request has been submitted")
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        aler("Fail to submitted your request. Please try again")
    });

});


function validateForm({ projectName, budget, projectDescription, timeLine }) {
    const errors = [];

    if (!projectName) {
        errors.push("Project name is required.");
    } else if (projectName.length < 3) {
        errors.push("Project name must be at least 3 characters long.");
    }

    if (!budget) {
        errors.push("Budget is required.");
    } else if (isNaN(budget) || Number(budget) <= 0) {
        errors.push("Budget must be a positive number.");
    }

    if (!projectDescription) {
        errors.push("Project description is required.");
    } else if (projectDescription.length < 5) {
        errors.push("Project description must be at least 10 characters long.");
    }

    if (!timeLine) {
        errors.push("Timeline is required.");
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(timeLine)) {
        errors.push("Time must be in the format YYYY-MM-DD.");
    }

    return errors;
}
