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
import { SubmitButton, useSnackbar } from '@saas-ui/react';
import { Text } from '@chakra-ui/react'
import {
  FileUpload,
  FileUploadTrigger,
  FileUploadDropzone,
} from '@saas-ui/file-upload'
import Select from '../../components/Select';
import type { Option } from '../../components/Select/types';

import { Form, FormLayout, createField } from '@saas-ui/forms'
import { useEffect, useState } from 'react';
const Meals = () => {
    const snackbar = useSnackbar();
    const [categories, setCategories] = useState();
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get('/api/categories');
          setCategories(response.data.categories);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
  
      fetchCategories();
    }, []);

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

    const handleSubmit = async (params) => {
        const formData = new FormData();
        console.log(params)
        for (const key in params) {
            if (key === 'ingredients' && Array.isArray(params[key])) {
              formData.append(key, JSON.stringify(params[key])); // Konvertiere Array von Objekten zu JSON String
            } else if (key === 'file') {
              formData.append('image', params.file); // Datei mit dem Namen 'image' anhängen
            } else {
              formData.append(key, params[key]);
            }
        }

        try {
            const token = await axios.get('/api/token');
            const response = axios.post('/api/meal', formData, {
              headers: {
                  Authorization: `Bearer ${token.data.accessToken}`
              }
            });

            snackbar.promise(Promise.resolve(response), {
                loading: 'Erstellen...',
                success: 'Die Mahlzeit wurde erfolgreich hinzugefügt.',
                error: "Wir konnten die Mahlzeit nicht erstellen.",
            });
            response.then(() => {
                
            }).catch(() => {
                
            })
        } catch (error) {
            console.error('Server error:', error.message);
        }
    };
  return (
    <Section innerWidth="container.sm">
        <BackgroundGradient zIndex="-1" />
        <Center height="100%" pt="20">
            <PageTransition width="100%" py="3em">
                <Form
                defaultValues={{
                    name: '',
                    category: '',
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
                onSubmit={handleSubmit}
                >
                {({ Field, ArrayField }) => (
                    <FormLayout>
                    <Field
                        name="name"
                        label="Name"
                        type="text"
                        help="Choose a name for this project"
                        isRequired
                    />
                    <Field
                        name="category"
                        label="Category"
                        type="text"
                        placeholder="Choose a category"
                        isRequired
                      
                    />
                    <Select
                      // Label displayed above the field
                      label="Single"
                      // String displayed before value selected
                      placeholder="Select a category"
                      // Array of Option type
                      options={categories} 
                      onClear={function (): void {
                        throw new Error('Function not implemented.');
                      }}                    
                    />

                    <Field
                        name="description"
                        type="textarea"
                        label="Description"
                        placeholder="Optional description"
                        isRequired
                    />
                    <UploadField name="file" label="Meal Image" isRequired />
                    <Field
                        name="servingSize"
                        label="Serving Size"
                        type="text"
                        placeholder="Serving Size"
                        isRequired
                    />

                    <SimpleGrid columns={3} spacing={4}>
                        <GridItem colSpan={1}>
                        <Field
                            name="calories"
                            label="Calories"
                            type="number"
                            placeholder="Calories"
                        />
                        </GridItem>
                        
                        <GridItem colSpan={1}>
                        <Field
                            name="fat"
                            label="Fat"
                            type="number"
                            placeholder="Fat"
                        />
                        </GridItem>

                        <GridItem colSpan={1}>
                        <Field
                            name="carbohydrates"
                            label="Carbohydrates"
                            type="number"
                            placeholder="Carbohydrates"
                        />
                        </GridItem>

                        <GridItem colSpan={1}>
                        <Field
                            name="protein"
                            label="Protein"
                            type="number"
                            placeholder="Protein"
                        />
                        </GridItem>

                        <GridItem colSpan={1}>
                        <Field
                            name="fiber"
                            label="Fiber"
                            type="number"
                            placeholder="Fiber"
                        />
                        </GridItem>

                        <GridItem colSpan={1}>
                        <Field
                            name="sugar"
                            label="Sugar"
                            type="number"
                            placeholder="Sugar"
                        />
                        </GridItem>

                        <GridItem colSpan={1}>
                        <Field
                            name="sodium"
                            label="Sodium"
                            type="number"
                            placeholder="Sodium"
                        />
                        </GridItem>
                    </SimpleGrid>

                    <ArrayField name="ingredients">
                        <Field
                            name={`ingredients.$.name`}
                            label={`Ingredient Name`}
                            type="text"
                            placeholder="Butter"
                            isRequired
                        />
                        <Field
                            name={`ingredients.$.measure`}
                            label={`Measure`}
                            type="text"
                            placeholder="Grams"
                            isRequired
                        />
                        <Field
                            name={`ingredients.$.quantity`}
                            label={`Quantity`}
                            type="text"
                            placeholder="100"
                            isRequired
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
