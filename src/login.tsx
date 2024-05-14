import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';

const Login = () => {

    const navigate = useNavigate();
    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            await axios.get('/api/token');
            navigate("/");
        } catch (error) {
           //nothing
        }
    }
    
    return (
        <Formik
        initialValues={{ }}
        onSubmit={(values, actions) => {
            const promise = axios.post('/api/login', {
                email: values.name,
                password: values.password
            })
        }}
    >
      {(props) => (
        <Form>
          <Field name='name'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>E-Mail</FormLabel>
                <Input type='email' {...field} placeholder='E-Mail' />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='password'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>Password</FormLabel>
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