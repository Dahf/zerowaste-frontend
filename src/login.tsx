import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';

const Login = () => {
    
    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            await axios.get('/api/token');
            navigate("/dashboard/home");
        } catch (error) {
           //nothing
        }
    }
    const Auth = async (email: string, password: string) => {
        const promise = axios.post('/api/login', {
            email: email,
            password: password
        })
    }
    
    return (
        <Formik
        initialValues={{ name: 'Sasuke' }}
        onSubmit={(values, actions) => {
            setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
        }, 1000)
      }}
    >
      {(props) => (
        <Form>
          <Field name='name'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>E-Mail</FormLabel>
                <Input type='email' {...field} placeholder='E-Mail' />
                <FormLabel>Passwort</FormLabel>
                <Input type='password' {...field} placeholder='Password' />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme='teal'
            isLoading={props.isSubmitting}
            type='submit'
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
        
    )
}
 
export default Login