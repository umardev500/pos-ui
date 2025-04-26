import {authHooks} from '@app/hooks';
import {LoginSchema} from '@app/validations/auth';
import {Formik} from 'formik';
import {Button, Text, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const LoginScreen = () => {
  const {mutate} = authHooks.useLogin();

  return (
    <SafeAreaView>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={values => {
          mutate(values);
        }}>
        {({handleChange, handleBlur, handleSubmit, errors, touched, isValid, values}) => (
          <>
            <TextInput
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email && <Text style={{color: 'red', marginBottom: 8}}>{errors.email}</Text>}

            <TextInput
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password && (
              <Text style={{color: 'red', marginBottom: 8}}>{errors.password}</Text>
            )}

            <Button title="Login" onPress={handleSubmit as any} disabled={!isValid} />
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};
