export function isEmailValid(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}