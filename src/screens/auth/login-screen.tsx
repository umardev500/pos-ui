import {logo2} from '@app/assets/images';
import {Button, Input} from '@app/components/atoms';
import {Loading} from '@app/components/atoms/loading';
import {authHooks} from '@app/hooks';
import {colors} from '@app/styles';
import {LoginSchema} from '@app/validations/auth';
import {Formik} from 'formik';
import {Image, ScrollView, StatusBar, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const LoginScreen = () => {
  const {mutate, isPending} = authHooks.useLogin();

  return (
    <SafeAreaView className="flex-1">
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView>
        <View className="p-4 flex-1 pt-24">
          {/* Top */}
          <View className="justify-center items-center mb-8">
            <Image className="w-40 h-40" source={logo2} />
            <View className="gap-1 items-center">
              <Text className="text-3xl font-jost font-bold text-gray-800">TomSir</Text>
              <Text className="text-lg font-jost">Silahkan masuk</Text>
            </View>
          </View>

          {/* Form */}
          <Loading />

          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={LoginSchema}
            onSubmit={values => {
              mutate(values);
            }}>
            {({handleChange, handleBlur, handleSubmit, errors, touched, isValid, values}) => (
              <View className="gap-4">
                <Input
                  leadingIcon="alternate_email"
                  size="md"
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                  placeholder="Email"
                />

                <Input
                  leadingIcon="lock"
                  size="md"
                  secureTextEntry
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  placeholder="Enter your password"
                />

                <Button
                  isLoading={isPending}
                  onPress={handleSubmit}
                  title="Submit"
                  containerColor={colors.sky[500]}
                  textColor="white"
                  textSize={18}
                />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
