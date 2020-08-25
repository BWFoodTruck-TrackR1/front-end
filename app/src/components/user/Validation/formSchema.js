import * as yup from 'yup'

const formSchema = yup.object().shape({
    newUsername: yup
        .string()
        .required('You must enter a username')
        .min(2, "Username must be at least 2 characters long"),
    email: yup
        .string(),
    newPassword: yup
        .string(),
    confirmPassword: yup
        .string(),
    location: yup
        .string()
    
    

})

export default formSchema;