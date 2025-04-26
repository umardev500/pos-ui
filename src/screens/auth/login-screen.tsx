import {authService} from '@app/services/auth';
import {useMutation} from '@tanstack/react-query';
import {Formik} from 'formik';
import {Button, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const LoginScreen = () => {
  const {mutate} = useMutation({
    mutationFn: (values: {email: string; password: string}) =>
      authService.login(values.email, values.password),
    onSuccess: data => console.log(data),
    onError: error => console.log(error),
  });

  return (
    <SafeAreaView>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values => {
          mutate(values);
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <>
            <TextInput
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <TextInput
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <Button title="Login" onPress={handleSubmit as any} />
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};
