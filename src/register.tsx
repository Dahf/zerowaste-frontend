import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, HStack, Input, Spacer, Stack } from '@chakra-ui/react';
import { BackgroundGradient } from '../components/gradients/background-gradient';
import { Section } from '../components/section';
import { PageTransition } from '../components/motion/page-transition';
import { Features } from '../components/features';
import siteConfig from '../data/config'
import { Formik, Field, Form } from 'formik';
const Register = () => {

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
      <Section height="100vh" innerWidth="container.xl">
      <BackgroundGradient
        zIndex="-1"
        left="auto"
        right="0"
        borderLeftWidth="1px"
        borderColor="gray.200"
        _dark={{
          borderColor: 'gray.700',
        }}
      />
      <PageTransition height="100%" display="flex" alignItems="center">
        <Stack
          width="100%"
          alignItems={{ base: 'center', lg: 'flex-start' }}
          spacing="20"
          flexDirection={{ base: 'column', lg: 'row' }}
        >
          <Box pe="20">
            <Features
              display={{ base: 'none', lg: 'flex' }}
              columns={1}
              iconSize={4}
              flex="1"
              py="0"
              ps="0"
              maxW={{ base: '100%', xl: '80%' }}
              features={siteConfig.signup.features.map((feature) => ({
                iconPosition: 'left',
                variant: 'left-icon',

                ...feature,
              }))}
            />
          </Box>
          <Center height="100%" flex="1">
            <Box width="container.sm" pt="8" px="8">
              <Formik
                  initialValues={{ }}
                  onSubmit={(values, actions) => {
                      const promise = axios.post('/api/register', {
                          vorname: values.vorname,
                          nachname: values.nachname,
                          email: values.email,
                          password: values.password
                      })
                  }}
              >
                {(props) => (
                  <Form>
                    <Field name='vorname'>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                          <FormLabel>Vorname</FormLabel>
                          <Input type='text' {...field} placeholder='Max' />
                          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='nachname'>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                          <FormLabel>Nachname</FormLabel>
                          <Input type='text' {...field} placeholder='Mustermann' />
                          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='email'>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                          <FormLabel>E-Mail</FormLabel>
                          <Input type='email' {...field} placeholder='max.mustermann9@gmail.com' />
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
                      <a href='/login'>
                        <Button
                          mt={4}
                          colorScheme='primary'
                        >
                          Login
                        </Button>
                      </a>
                    </HStack>
                    
                  </Form>
                )}
              </Formik>
            </Box>
          </Center>
        </Stack>
      </PageTransition>
    </Section>
        
    )
}
 
export default Register