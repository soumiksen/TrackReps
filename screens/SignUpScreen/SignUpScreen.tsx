import Button from '@/components/Button/Button';
import FormInput from '@/components/FormInput/FormInput';
import { Formik } from 'formik';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import { styles } from './SignUpScreen.styles';

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignUpScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.signInText}>Sign Up</Text>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={SignUpSchema}
      >
        {({
          errors,
          touched,
          handleChange,
          handleSubmit,
          values,
          handleBlur,
        }) => (
          <View>
            <FormInput
              placeholder='First Name'
              onChangeText={handleChange('firstName')}
              value={values.firstName}
              onBlur={() => {
                handleBlur('firstName');
              }}
              errorType={errors.firstName}
              touchedType={touched.firstName}
            />
            <FormInput
              placeholder='Last Name'
              onChangeText={handleChange('lastName')}
              value={values.lastName}
              onBlur={() => {
                handleBlur('lastName');
              }}
              errorType={errors.lastName}
              touchedType={touched.lastName}
            />
            <FormInput
              placeholder='Email'
              onChangeText={handleChange('email')}
              value={values.email}
              onBlur={() => {
                handleBlur('email');
              }}
              errorType={errors.email}
              touchedType={touched.email}
            />
            <FormInput
              placeholder='Password'
              onChangeText={handleChange('password')}
              value={values.password}
              onBlur={() => {
                handleBlur('password');
              }}
              errorType={errors.password}
              touchedType={touched.password}
            />
            <FormInput
              placeholder='Confirm Password'
              onChangeText={handleChange('confirmPassword')}
              value={values.confirmPassword}
              onBlur={() => {
                handleBlur('confirmPassword');
              }}
              errorType={errors.confirmPassword}
              touchedType={touched.confirmPassword}
            />
            <Button onPress={handleSubmit}>Sign Up</Button>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default SignUpScreen;
