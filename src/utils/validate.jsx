export const validateEmail = (email) => {
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    return isEmailValid
}

export const validatePass = (pass) => {
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/.test(pass)
    // At least one lowercase letter (a-z), At least one uppercase letter (A-Z), At least one digit (0-9), At least one special character (@$!%*?&#), 8-60 characters total (more secure than 4)
    return isPasswordValid
}