import React from 'react'
import { Grid } from '@material-ui/core'
import FormikControl from '../FormComponent/FormikControl'

const AuthInput = ({name,label,type,autoFocus,handleShowPassword,half}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <FormikControl
                control='input'
                name={name}
                label={label}
                type={type}
                autoFocus={autoFocus}
                handleShowPassword={handleShowPassword}
            />
        </Grid>
    )
}

export default AuthInput
