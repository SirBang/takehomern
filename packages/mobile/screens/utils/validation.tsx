export const validateInput = (input: string, type: string): string => {
    const inputLength = input.length;
    if (!input) return `${type} is required`;
    if (inputLength < 3) return `${type} must be at least 3 characters long`;
    if (inputLength > 20) return `${type} must be less than 20 characters long`;
    return "";
  };
  
export const validatePassword = (password: string, confirmPass?:string): string => {
    const passwordLength = password.length;
    if (!password) return "Password is required";
    if (passwordLength < 8) return "Password must be at least 8 characters long";
    if (passwordLength > 20) return "Password must be less than 20 characters long";
    const passwordRegex = /^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*\d+)(?=.*[!@#$%^&*]+).{8,}$/;
    if (!password) {
      return "Password must not be empty";
    }
    if(confirmPass&&confirmPass !== password) {
      return "Passwords do not match";
    }
    
    if (!passwordRegex.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    return "";
};