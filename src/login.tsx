import React, { useEffect, useState } from 'react'
import axios from 'axios';

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
    
    
   
    const [value, setValue] = useState('')
    return (
        
        <AppShell >
            <Page >
                <PageBody p="0" contentWidth="full" >
                    <Section w="60%" h="100%" margin="0 auto" justifyContent="center" maxW="500px" >
                        <Image src='nehemialogo.png' py={"30"} onClick={() => { navigate("/")} } />
                        <Card variant="outline">
                            <CardBody >
                                <Center>
                                    <SectionHeader title="Melden Sie sich an"/>
                                </Center>
                                <Form  
                                    defaultValues={{
                                        title: '',
                                        body: '',
                                    }}
                                    onSubmit={(params) => Auth(params.title, params.body)}
                                >
                                    <FormLayout>
                                        <Field  
                                            name="title"
                                            label="E-Mail"
                                            type="email"
                                            rules={{ required: true }}
                                        />

                                        <Field
                                            name="body"
                                            type="password"
                                            label="Password"
                                            rules={{ required: true }}
                                        />
                                        <Center>
                                            <SubmitButton>Anmelden</SubmitButton>
                                        </Center>
                                    </FormLayout>
                                </Form>
                                
                            </CardBody>
                            <CardFooter justifyContent="center">
                                <VStack>
                                    <Button variant="link" onClick={() => navigate("/register")} colorScheme='brand'>Registrieren Sie sich</Button>
                                    
                                    <Button variant="link" onClick={() => {
                                        disclosure.onOpen()
                                        
                                    }}>Passwort vergessen?</Button>
                                    <Modal {...disclosure}>
                                        <ModalOverlay />
                                        <ModalContent>
                                        <ModalHeader>Passwort zurücksetzen</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <Input 
                                                key="emailInput"
                                                placeholder="Geben Sie Ihre E-Mail-Adresse ein" 
                                                value={value}
                                                onChange={(e) => {setValue(e.target.value); }} />
                                        </ModalBody>

                                        <ModalFooter>
                                            <Button variant="ghost" onClick={disclosure.onClose}>Abbrechen</Button>
                                            <Button colorScheme="primary" mr={3} onClick={async() => {
                                                const response = await axios.post("/api/forgot-password", {
                                                    email: value
                                                })

                                                toast({
                                                    title: 'E-Mail gesendet',
                                                    description: 'Wir haben Ihnen eine E-Mail gesendet.',
                                                    status: 'success',
                                                    duration: 9000,
                                                    isClosable: true,
                                                  });
                                                
                                                disclosure.onClose();
                                            }}>
                                                Senden
                                            </Button>
                                        </ModalFooter>
                                        </ModalContent>
                                    </Modal>

                                    
                                </VStack>
                            </CardFooter>
                        </Card>
                    </Section>
                </PageBody>
            </Page>
        </AppShell>
    )
}
 
export default Login