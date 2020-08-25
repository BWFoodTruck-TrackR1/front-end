import * as yup from 'yup'

const loginFormSchema = yup.object().shape({
    username: yup
        .string()
        .required('You must enter a username'),
    password: yup
        .string()
        .required('You must enter a password')
    
    
    

})

export default loginFormSchema;