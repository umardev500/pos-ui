import {authService} from '@app/services/auth';
import {mmkvStorage} from '@app/storage';
import {useUserStore} from '@app/stores';
import {LoginSchema} from '@app/validations/auth';
import {useMutation} from '@tanstack/react-query';
import {Formik} from 'formik';
import {Button, Text, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const LoginScreen = () => {
  const setUser = useUserStore(state => state.setUser);

  const {mutate} = useMutation({
    mutationFn: (values: {email: string; password: string}) => authService.login(values.email, values.password),
    onSuccess: async data => {
      mmkvStorage.set('user.token', data.access_token);
      const user = await authService.getMe();
      setUser(user);
    },
    onError: error => console.log(error),
  });

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
