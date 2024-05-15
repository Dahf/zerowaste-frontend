import { Formik, Form, Field, FieldArray } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  HStack,
  Spacer,
  Center,
  GridItem,
  SimpleGrid,
} from '@chakra-ui/react';
import axios from 'axios';
import { Section } from '../../components/section';
import { BackgroundGradient } from '../../components/gradients/background-gradient';
import { PageTransition } from '../../components/motion/page-transition';

const Meals = () => {
  return (
    <Section innerWidth="container.sm">
        <BackgroundGradient zIndex="-1" />
        <Center height="100%" pt="20">
            <PageTransition width="100%" py="3em">
                <Formik
                
                initialValues={{
                    name: '',
                    description: '',
                    servingSize: '',
                    calories: '',
                    fat: '',
                    carbohydrates: '',
                    protein: '',
                    fiber: '',
                    sugar: '',
                    sodium: '',
                    ingredients: [{ name: '', measure: '', quantity: '' }],
                }}
                onSubmit={async (values, actions) => {
                    try {
                    const response = await axios.post('/api/meal', values);
                    console.log(response.data);
                    // Handle successful response
                    actions.setSubmitting(false);
                    } catch (error) {
                    console.error('Server error:', error.message);
                    // Handle error response
                    actions.setSubmitting(false);
                    }
                }}
                >
                {(props) => (
                    <Form>
                    <Field name="name">
                        {({ field, form }) => (
                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                            <FormLabel>Name</FormLabel>
                            <Input {...field} placeholder="Name" />
                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>

                    <Field name="description">
                        {({ field, form }) => (
                        <FormControl isInvalid={form.errors.description && form.touched.description}>
                            <FormLabel>Description</FormLabel>
                            <Input {...field} placeholder="Description" />
                            <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>

                    <Field name="servingSize">
                        {({ field, form }) => (
                        <FormControl isInvalid={form.errors.servingSize && form.touched.servingSize}>
                            <FormLabel>Serving Size</FormLabel>
                            <Input {...field} placeholder="Serving Size" />
                            <FormErrorMessage>{form.errors.servingSize}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>

                    <SimpleGrid columns={3} spacing={4}>
                        <GridItem colSpan={1}>
                        <Field name="calories">
                            {({ field, form }) => (
                            <FormControl isInvalid={form.errors.calories && form.touched.calories}>
                                <FormLabel>Calories</FormLabel>
                                <Input {...field} placeholder="Calories" />
                                <FormErrorMessage>{form.errors.calories}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                        </GridItem>
                        
                        <GridItem colSpan={1}>
                        <Field name="fat">
                            {({ field, form }) => (
                            <FormControl isInvalid={form.errors.fat && form.touched.fat}>
                                <FormLabel>Fat</FormLabel>
                                <Input {...field} placeholder="Fat" />
                                <FormErrorMessage>{form.errors.fat}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                        </GridItem>

                        <GridItem colSpan={1}>
                        <Field name="carbohydrates">
                            {({ field, form }) => (
                            <FormControl isInvalid={form.errors.carbohydrates && form.touched.carbohydrates}>
                                <FormLabel>Carbohydrates</FormLabel>
                                <Input {...field} placeholder="Carbohydrates" />
                                <FormErrorMessage>{form.errors.carbohydrates}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                        </GridItem>

                        <GridItem colSpan={1}>
                        <Field name="protein">
                            {({ field, form }) => (
                            <FormControl isInvalid={form.errors.protein && form.touched.protein}>
                                <FormLabel>Protein</FormLabel>
                                <Input {...field} placeholder="Protein" />
                                <FormErrorMessage>{form.errors.protein}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                        </GridItem>

                        <GridItem colSpan={1}>
                        <Field name="fiber">
                            {({ field, form }) => (
                            <FormControl isInvalid={form.errors.fiber && form.touched.fiber}>
                                <FormLabel>Fiber</FormLabel>
                                <Input {...field} placeholder="Fiber" />
                                <FormErrorMessage>{form.errors.fiber}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                        </GridItem>

                        <GridItem colSpan={1}>
                        <Field name="sugar">
                            {({ field, form }) => (
                            <FormControl isInvalid={form.errors.sugar && form.touched.sugar}>
                                <FormLabel>Sugar</FormLabel>
                                <Input {...field} placeholder="Sugar" />
                                <FormErrorMessage>{form.errors.sugar}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                        </GridItem>

                        <GridItem colSpan={1}>
                        <Field name="sodium">
                            {({ field, form }) => (
                            <FormControl isInvalid={form.errors.sodium && form.touched.sodium}>
                                <FormLabel>Sodium</FormLabel>
                                <Input {...field} placeholder="Sodium" />
                                <FormErrorMessage>{form.errors.sodium}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                        </GridItem>
                    </SimpleGrid>

                    <FieldArray name="ingredients">
                        {({ remove, push }) => (
                        <div>
                            {props.values.ingredients.length > 0 &&
                            props.values.ingredients.map((ingredient, index) => (
                                <div key={index}>
                                <Field name={`ingredients.${index}.name`}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.ingredients?.[index]?.name && form.touched.ingredients?.[index]?.name}>
                                        <FormLabel>Ingredient Name {index}</FormLabel>
                                        <Input {...field} placeholder="Ingredient Name" />
                                        <FormErrorMessage>{form.errors.ingredients?.[index]?.name}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>
                                <Field name={`ingredients.${index}.measure`}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.ingredients?.[index]?.measure && form.touched.ingredients?.[index]?.measure}>
                                        <FormLabel>Measure {index}</FormLabel>
                                        <Input {...field} placeholder="Measure" />
                                        <FormErrorMessage>{form.errors.ingredients?.[index]?.measure}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>
                                <Field name={`ingredients.${index}.quantity`}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.ingredients?.[index]?.quantity && form.touched.ingredients?.[index]?.quantity}>
                                        <FormLabel>Quantity {index}</FormLabel>
                                        <Input {...field} placeholder="Quantity" />
                                        <FormErrorMessage>{form.errors.ingredients?.[index]?.quantity}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>
                                <Button type="button" onClick={() => remove(index)}>
                                    Remove
                                </Button>
                                </div>
                            ))}
                            <Button type="button" onClick={() => push({ name: '', measure: '', quantity: '' })}>
                            Add Ingredient
                            </Button>
                        </div>
                        )}
                    </FieldArray>

                    <HStack>
                        <Button
                        mt={4}
                        colorScheme="primary"
                        isLoading={props.isSubmitting}
                        type="submit"
                        >
                        Submit
                        </Button>
                    </HStack>
                    </Form>
                )}
                </Formik>
            </PageTransition>
        </Center>
    </Section>
  );
};

export default Meals;
