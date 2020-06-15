import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup, Label } from 'reactstrap';
// import { PHOTO_CATEGORY_OPTIONS } from '../../../../constants/global';
// import Images from '../../../../constants/images';
import { PHOTO_CATEGORY_OPTIONS } from 'constants/global';
import Images from 'constants/images';
import * as Yup from 'yup';
import { Formik, Form, FastField } from 'formik';
import InputField from 'custom-field/InputField';
import SelectField from 'custom-field/SelectField';
import RandomPhotoField from 'custom-field/RandomPhotoField';

PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
  onSubmit: null,
}

function PhotoForm(props) {
    const initialValues = {
        title: '',
        categoryId: null,
        photo: '',
      };
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('This field is required.'),

        categoryId: Yup.number()
            .required('This field is required.')
            .nullable(),

        photo: Yup.string().when('categoryId', {
            is: 1,
            then: Yup.string().required('This field is required.'),
            otherwise: Yup.string().notRequired(),
        })
    });
    return (
        <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => console.log('Submit', values)}
        >
            { formikProps => {
                const { values, errors, touched } = formikProps;
                console.log({ values, errors, touched });

                return (
                    <Form>
                        <FastField
                            name="title"
                            component={InputField}
              
                            label="Title"
                            placeholder="Eg: Wow nature ..."
                        />

                        <FastField
                            name="categoryId"
                            component={SelectField}

                            label="Category"
                            placeholder="What's your photo category?"
                            options={PHOTO_CATEGORY_OPTIONS}
                        />

                        <FastField
                            name="photo"
                            component={RandomPhotoField}
                            label="Photo"
                        />

                        <FormGroup>
                            <Button type="submit" color="primary">Add to album</Button>
                        </FormGroup>
                    </Form>
                )
            }}
        </Formik>

        
    );
}

export default PhotoForm;