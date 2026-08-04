const validateEmail = (email) => {
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    return isEmailValid
}

const validatePass = (pass) => {
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/.test(pass)
    // At least one lowercase letter (a-z), At least one uppercase letter (A-Z), At least one digit (0-9), At least one special character (@$!%*?&#), 8-60 characters total (more secure than 4)
    return isPasswordValid
}

const validateLogin = (email, password) => {
    if (!email.trim()) return "Email required!"
    if (!password.trim()) return "Password required!"
    return null
}

const validateSignup = (firstName, lastName, email, password) => {
    if (!firstName.trim()) return "Firstname required!"
    if (!lastName.trim()) return "Lastname required!"
    if (!validateEmail(email.trim())) return "Invalid Email!"
    if (!validatePass(password)) {
        return "Your password must be 8-60 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character."
    }
    return null
}

export { validateEmail, validatePass, validateSignup, validateLogin }