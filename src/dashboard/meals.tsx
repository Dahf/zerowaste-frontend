import {
  Button,
  HStack,
  Center,
  GridItem,
  SimpleGrid,
  forwardRef,
} from '@chakra-ui/react';
import axios from 'axios';
import { Section } from '../../components/section';
import { BackgroundGradient } from '../../components/gradients/background-gradient';
import { PageTransition } from '../../components/motion/page-transition';
import { SubmitButton } from '@saas-ui/react';
import { Text } from '@chakra-ui/react'
import {
  FileUpload,
  FileUploadTrigger,
  FileUploadDropzone,
} from '@saas-ui/file-upload'
import { Form, FormLayout, createField } from '@saas-ui/forms'
const Meals = () => {

    const UploadField = createField(
        forwardRef((props, ref) => {
          const { onChange, ...rest } = props
          return (
            <FileUpload
              maxFileSize={1024 * 1024}
              accept="image/*"
              {...rest}
              onFilesChange={(files) => {
                onChange(files.acceptedFiles[0])
              }}
              maxFiles={1}
              inputRef={ref}
            >
              {({ files, deleteFile }) => (
                <FileUploadDropzone>
                  <Text fontSize="sm">Drag your image here</Text>
                  {!files?.length ? (
                    <FileUploadTrigger as={Button}>Select files</FileUploadTrigger>
                  ) : (
                    <HStack>
                      <Text fontSize="sm">{files[0].name}</Text>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteFile(files[0])
                        }}
                      >
                        Clear
                      </Button>
                    </HStack>
                  )}
                </FileUploadDropzone>
              )}
            </FileUpload>
          )
        }),
        {
          isControlled: true,
        }
      )
      
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
                    const formData = new FormData();
                    formData.append('name', params.name);
                    formData.append('description', params.description);
                    formData.append('servingSize', params.servingSize);
                    formData.append('calories', params.calories);
                    formData.append('fat', params.fat);
                    formData.append('carbohydrates', params.carbohydrates);
                    formData.append('protein', params.protein);
                    formData.append('fiber', params.fiber);
                    formData.append('sugar', params.sugar);
                    formData.append('sodium', params.sodium);
                    formData.append('ingredients', JSON.stringify(params.ingredients));
                    if(params.file)
                        formData.append('file', params.file);

                    try {
                        console.log(formData);
                        return fetch('/api/meal', {
                            method: 'POST',
                            body: formData,
                        }).then((response) => {
                            if (response.ok) {
                                // Handle successful upload
                            } else {
                                // Handle error
                            }
                        })
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
                    <UploadField name="file" label="Meal Image" />
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