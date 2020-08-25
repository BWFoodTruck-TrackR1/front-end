import * as yup from 'yup'

const registerFormSchema = yup.object().shape({
    newUsername: yup
        .string()
        .required('You must enter a username')
        .min(2, "Username must be at least 2 characters long"),
    email: yup
        .string()
        .email()
        .required("You must enter an email"),
    newPassword: yup
        .string()
        .required("You must enter a password")
        .min(5, "Password must be at least 5 characters long"),
    location: yup
        .string()
        .required('You must enter a location')
    
    

})

export default registerFormSchema;