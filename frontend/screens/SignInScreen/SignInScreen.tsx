import Button from '@/components/Button/Button';
import FormInput from '@/components/FormInput/FormInput';
import { signIn } from '@/services/users';
import { Link } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import { styles } from './SignInScreen.styles';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignInScreen = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.signInText}>Sign In</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => {
            signIn(values.email, values.password);
          }}
          validationSchema={SignInSchema}
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
                type='password'
              />
              <Button onPress={handleSubmit}>Sign In</Button>
            </View>
          )}
        </Formik>
        <View style={styles.signUpLink}>
          <Text>Don't have an account?</Text>
          <Link href='/auth/signup'> Sign up.</Link>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
