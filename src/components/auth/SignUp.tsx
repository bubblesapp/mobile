import React from 'react';
import {Platform, View} from 'react-native';
import I18n from '../../i18n/';
import {authStyleSheet as styles} from './Styles';
import {Routes} from '../../nav/Routes';
import {ExtraText} from './common/ExtraText';
import * as yup from 'yup';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from './AuthNavigator';
import {RootNavigationProp} from '../../../App';
import {Formik} from 'formik';
import {ExtraButton} from '../common/ExtraButton';
import {SubmitButton} from '../common/SubmitButton';
import {Title} from './common/Title';
import {FieldError} from '../common/FieldError';
import {InfoText} from './common/InfoText';
import {useAuth} from '../../auth/Auth';
import Toast from '../common/Toast';
import {Container, Content, Form, Input, Item, Label} from 'native-base';

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf(
      [yup.ref('password')],
      I18n.t('auth.error.auth/confirmation-mismatch'),
    )
    .label('Password confirmation'),
});
type FormValues = yup.InferType<typeof validationSchema> & {general?: string};
const initialValues: FormValues =
  Platform.OS === 'ios'
    ? {
        name: 'Edouard',
        email: 'edouard.goossens@gmail.com',
        password: 'buksibuksi',
        passwordConfirmation: 'buksibuksi',
      }
    : {
        name: 'Edouard',
        email: 'edouard@tastyelectrons.com',
        password: 'buksibuksi',
        passwordConfirmation: 'buksibuksi',
      };
type SignUpNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList, Routes.SignUp>,
  RootNavigationProp
>;

export const SignUp: React.FC = (): JSX.Element => {
  const navigation = useNavigation<SignUpNavigationProp>();
  const auth = useAuth();

  const signUp = async (
    {name, email, password}: FormValues,
    {setSubmitting},
  ) => {
    try {
      await auth.signUp(name, email, password);
      navigation.navigate(Routes.ConfirmSignUp);
    } catch (e) {
      console.log(e);
      Toast.danger(e);
      setSubmitting(false);
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
            validateOnMount={true}
            validationSchema={validationSchema}
            onSubmit={signUp}>
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
              <View style={styles.formContainer}>
                <Item
                  stackedLabel
                  last
                  success={!errors.name}
                  error={touched.name && !!errors.name}>
                  <Label>{I18n.t('auth.signUpNamePlaceholder')}</Label>
                  <Input
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                </Item>
                <FieldError message={touched.name && errors?.name} />

                <Item
                  stackedLabel
                  last
                  success={!errors.email}
                  error={touched.email && !!errors.email}>
                  <Label>{I18n.t('auth.signUpEmailPlaceholder')}</Label>
                  <Input
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    textContentType={'emailAddress'}
                    keyboardType={'email-address'}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                </Item>
                <FieldError message={touched.email && errors?.email} />

                <Item
                  stackedLabel
                  last
                  success={!errors.password}
                  error={touched.password && !!errors.password}>
                  <Label>{I18n.t('auth.signUpPasswordPlaceholder')}</Label>
                  <Input
                    autoCapitalize={'none'}
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                </Item>
                <FieldError message={touched.password && errors?.password} />

                <Item
                  stackedLabel
                  last
                  success={!errors.passwordConfirmation}
                  error={
                    touched.passwordConfirmation &&
                    !!errors.passwordConfirmation
                  }>
                  <Label>
                    {I18n.t('auth.signUpPasswordConfirmationPlaceholder')}
                  </Label>
                  <Input
                    autoCapitalize={'none'}
                    secureTextEntry
                    onChangeText={handleChange('passwordConfirmation')}
                    onBlur={handleBlur('passwordConfirmation')}
                    value={values.passwordConfirmation}
                  />
                </Item>
                <FieldError
                  message={
                    touched.passwordConfirmation && errors?.passwordConfirmation
                  }
                />
                <InfoText>{I18n.t('auth.signUpLegal')}</InfoText>
                <SubmitButton
                  onPress={() => handleSubmit()}
                  disabled={!isValid}
                  isSubmitting={isSubmitting}
                  label={I18n.t('auth.signUpButtonTitle')}
                />
              </View>
            )}
          </Formik>

          <ExtraText>{I18n.t('auth.alreadyHaveAccount')}</ExtraText>
          <ExtraButton
            to={Routes.SignIn}
            label={I18n.t('auth.backToLoginButtonTitle')}
          />
        </Form>
      </Content>
    </Container>
  );
};
