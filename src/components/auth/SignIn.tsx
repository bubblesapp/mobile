import React, {useEffect} from 'react';
import {Platform, View} from 'react-native';
import I18n from '../../i18n';
import {Routes} from '../../nav/Routes';
import {ExtraText} from './common/ExtraText';
import * as yup from 'yup';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/core';
import {AuthStackParamList} from './AuthNavigator';
import {Formik} from 'formik';
import {ExtraButton} from '../common/ExtraButton';
import {SubmitButton} from '../common/SubmitButton';
import {Title} from './common/Title';
import {FieldError} from '../common/FieldError';
import {useAuth} from '../../auth/Auth';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationProp} from '../../../App';
import Toast from '../common/Toast';
import {Container, Content, Form, Input, Item, Label} from 'native-base';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
type FormValues = yup.InferType<typeof validationSchema>;
const initialValues: FormValues =
  Platform.OS === 'ios' || 'android'
    ? {
        email: 'edouard.goossens@gmail.com',
        password: 'buksibuksi',
      }
    : {
        email: 'edouard@tastyelectrons.com',
        password: 'buksibuksi',
      };
type SignInNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList, Routes.SignIn>,
  RootNavigationProp
>;

export const SignIn: React.FC = (): JSX.Element => {
  const auth = useAuth();
  const navigation = useNavigation<SignInNavigationProp>();
  console.log('Sign in');

  if (auth.state?.uid && !auth.state?.emailVerified) {
    navigation.navigate(Routes.ConfirmSignUp);
  }

  const signIn = async ({email, password}, {setSubmitting}) => {
    console.log('Signing in');
    try {
      await auth.signIn(email, password);
      if (auth.state?.uid && !auth.state?.emailVerified) {
        navigation.navigate(Routes.ConfirmSignUp);
      }
    } catch (e) {
      console.log(e);
      setSubmitting(false);
      Toast.danger(e.message);
    }
  };

  return (
    <Container>
      <Content
        padder
        contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
        <Title />
        <Form>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnMount={true}
            onSubmit={signIn}>
            {({
              handleSubmit,
              handleBlur,
              handleChange,
              values,
              errors,
              touched,
              isValid,
              isSubmitting,
            }) => (
              <View>
                <Item
                  stackedLabel
                  last
                  success={!errors.email}
                  error={touched.email && !!errors.email}>
                  <Label>{I18n.t('auth.loginEmailPlaceholder')}</Label>
                  <Input
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    textContentType={'emailAddress'}
                    keyboardType={'email-address'}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    editable={!isSubmitting}
                  />
                </Item>
                <FieldError message={touched.email && errors?.email} />
                <Item
                  stackedLabel
                  last
                  success={!errors.password}
                  error={touched.password && !!errors.password}>
                  <Label>{I18n.t('auth.loginPasswordPlaceholder')}</Label>
                  <Input
                    autoCapitalize={'none'}
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    editable={!isSubmitting}
                  />
                </Item>
                <FieldError message={touched.password && errors?.password} />
                <SubmitButton
                  testID={'signIn'}
                  accessibilityLabel={'Sign In'}
                  onPress={() => handleSubmit()}
                  disabled={!isValid}
                  isSubmitting={isSubmitting}
                  label={I18n.t('auth.loginButtonTitle')}
                />
              </View>
            )}
          </Formik>
          <ExtraText>{I18n.t('auth.noAccountYet')}</ExtraText>
          <ExtraButton
            to={Routes.SignUp}
            label={I18n.t('auth.signUpButtonTitle')}
          />
          <ExtraText>{I18n.t('auth.forgotPassword')}</ExtraText>
          <ExtraButton
            to={Routes.ResetPassword}
            label={I18n.t('auth.resetPasswordButtonTitle')}
          />
        </Form>
      </Content>
    </Container>
  );
};
