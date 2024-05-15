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
import { Form, FormLayout, SubmitButton } from '@saas-ui/react';

const Meals = () => {
  return (
    <Section innerWidth="container.sm">
        <BackgroundGradient zIndex="-1" />
        <Center height="100%" pt="20">
            <PageTransition width="100%" py="3em">
                <Form
                defaultValues={{
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
                onSubmit={async (params) => {
                    console.log(params);
                    try {
                    const response = await axios.post('/api/meal', params);
                    console.log(response.data);
                    } catch (error) {
                    console.error('Server error:', error.message);
                    }
                }}
                >
                {({ Field, ArrayField }) => (
                    <FormLayout>
                    <Field
                        name="name"
                        label="Name"
                        type="text"
                        help="Choose a name for this project"
                        rules={{ required: true }}
                    />

                    <Field
                        name="description"
                        type="textarea"
                        label="Description"
                        placeholder="Optional description"
                    />

                    <Field
                        name="servingSize"
                        label="Serving Size"
                        type="text"
                        placeholder="Serving Size"
                    />

                    <SimpleGrid columns={3} spacing={4}>
                        <GridItem colSpan={1}>
                        <Field
                            name="calories"
                            label="Calories"
                            type="text"
                            placeholder="Calories"
                        />
                        </GridItem>
                        
                        <GridItem colSpan={1}>
                        <Field
                            name="fat"
                            label="Fat"
                            type="text"
                            placeholder="Fat"
                        />
                        </GridItem>

                        <GridItem colSpan={1}>
                        <Field
                            name="carbohydrates"
                            label="Carbohydrates"
                            type="text"
                            placeholder="Carbohydrates"
                        />
                        </GridItem>

                        <GridItem colSpan={1}>
                        <Field
                            name="protein"
                            label="Protein"
                            type="text"
                            placeholder="Protein"
                        />
                        </GridItem>

                        <GridItem colSpan={1}>
                        <Field
                            name="fiber"
                            label="Fiber"
                            type="text"
                            placeholder="Fiber"
                        />
                        </GridItem>

                        <GridItem colSpan={1}>
                        <Field
                            name="sugar"
                            label="Sugar"
                            type="text"
                            placeholder="Sugar"
                        />
                        </GridItem>

                        <GridItem colSpan={1}>
                        <Field
                            name="sodium"
                            label="Sodium"
                            type="text"
                            placeholder="Sodium"
                        />
                        </GridItem>
                    </SimpleGrid>

                    <ArrayField name="ingredients">
                        <Field
                            name={`ingredients.$.name`}
                            label={`Ingredient Name $`}
                            type="text"
                            placeholder="Ingredient Name"
                        />
                        <Field
                            name={`ingredients.$.measure`}
                            label={`Measure $`}
                            type="text"
                            placeholder="Measure"
                        />
                        <Field
                            name={`ingredients.$.quantity`}
                            label={`Quantity $`}
                            type="text"
                            placeholder="Quantity"
                        />
                    </ArrayField>

                    <HStack>
                        <SubmitButton>
                        Submit
                        </SubmitButton>
                    </HStack>
                    </FormLayout>
                )}
                </Form>

            </PageTransition>
        </Center>
    </Section>
  );
};

export default Meals;
