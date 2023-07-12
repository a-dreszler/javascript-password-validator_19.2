let containsAtLeast1UppercaseLetter = (password) => /[A-Z]/.test(password);
let containsAtLeast1LowercaseLetter = (password) => /[a-z]/.test(password);
let containsAtLeast1SpecialSign = (password) => /[^a-zA-Z0-9]/.test(password);
let hasRequiredLength = (password) => password.length > 8;
let passwordsMatch = (password) => {
    let repeatedPassword = document.getElementById("password-repeat").value;
    return password === repeatedPassword;
}

function createPrompt (message, id) {
    let prompt = document.createElement("p");
    prompt.append(message);
    prompt.setAttribute("id", id);
    prompt.classList.add("text-danger");
    return prompt;
}

function removeAllPrompts(promptDiv) {
    while (promptDiv.firstChild !== null) {
        promptDiv.removeChild(promptDiv.firstChild);
    }
}

let alreadyPrompted = (prompt) => document.contains(prompt);

let passwordMatchDiv = document.getElementById("password-match-messages");
let errorMessageDiv = document.getElementById("error-messages");
let tooShortPrompt = createPrompt("Hasło jest za krótkie. Min. 8 znaków", "too-short");
let noUppercaseLetters = createPrompt("Min. 1 wielka litera", "no-uppercase");
let noLowercaseLetters = createPrompt("Min. 1 mała litera", "no-lowercase");
let noSpecialSigns = createPrompt("Min. 1 znak specjalny", "no-special-signs");
let passwordsDontMatch = createPrompt("Hasła różnią się od siebie", "passwords-differ");
let button = document.getElementById("submit");
button.disabled = true;

let passwordChecks = {
    lengthCheck : [hasRequiredLength, tooShortPrompt, errorMessageDiv],
    uppercaseCheck : [containsAtLeast1UppercaseLetter, noUppercaseLetters, errorMessageDiv],
    lowercaseCheck : [containsAtLeast1LowercaseLetter, noLowercaseLetters, errorMessageDiv],
    specialSignCheck : [containsAtLeast1SpecialSign, noSpecialSigns, errorMessageDiv],
    passwordMatchCheck : [passwordsMatch, passwordsDontMatch, passwordMatchDiv]
}


function registerPasswordChange() {
    let passwordInput = document.getElementById("password");
    let passwordInputRepeat = document.getElementById("password-repeat");
    passwordInput.addEventListener("input", validate);
    passwordInputRepeat.addEventListener("input", validate);
}


function validate() {
    let password = document.getElementById("password").value;
    let valid = true;
    
    for (const check of Object.entries(passwordChecks)) {
        let isValid, prompt, promptDiv;
        [isValid, prompt, promptDiv] = check[1];
        if (!isValid(password)) {
            valid = false;
            if (!alreadyPrompted(prompt)) {
                promptDiv.append(prompt);
            }
            if (password.length === 0) {
                removeAllPrompts(promptDiv);
            }
        } else if (alreadyPrompted(prompt)) {
            promptDiv.removeChild(prompt);
        }
    }
    button.disabled = !valid;
}

registerPasswordChange();