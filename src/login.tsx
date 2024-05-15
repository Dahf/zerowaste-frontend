import React, { useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { Button, Center, FormControl, FormErrorMessage, FormLabel, HStack, Input, Spacer } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { BackgroundGradient } from '../components/gradients/background-gradient';
import { Section } from '../components/section';
import { PageTransition } from '../components/motion/page-transition';
const Login = () => {

    const navigate = useNavigate();
    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            await axios.get('/api/token');
            navigate("/meals");
        } catch (error) {
           //nothing
        }
    }

    return (
      <Section height="calc(100vh - 200px)" innerWidth="container.sm">
        <BackgroundGradient zIndex="-1" />

        <Center height="100%" pt="20">
          <PageTransition width="100%">
            <Formik
                initialValues={{ }}
                onSubmit={async (values, actions) => {
                    Promise.resolve(axios.post('/api/login', {
                        email: values.name,
                        password: values.password
                    }))
                    navigate("/meals");
                    actions.setSubmitting(false);
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
                      <FormControl isInvalid={form.errors.password && form.touched.password}>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' {...field} placeholder='Password' />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <HStack>
                    <Button
                      mt={4}
                      colorScheme='primary'
                      isLoading={props.isSubmitting}
                      type='submit'
                    >
                      Submit
                    </Button>
                    <Spacer />
                    <a href='/register'>
                      <Button
                        mt={4}
                        colorScheme='primary'
                      >
                        Register
                      </Button>
                    </a>
                  </HStack>
                  
                </Form>
              )}
            </Formik>
          </PageTransition>
        </Center>
      </Section>
        
        
    )
}
 
export default Login