import React from 'react';
import {View} from 'react-native';
import I18n from '../../i18n/';
import {authStyleSheet as styles} from './Styles';
import * as yup from 'yup';
import {Formik} from 'formik';
import {Title} from './common/Title';
import {useAuth} from '../../auth/Auth';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../nav/NavProvider';
import {Input} from 'react-native-elements';
import {InfoText} from './common/InfoText';
import {SubmitButton} from '../common/SubmitButton';
import {ExtraText} from './common/ExtraText';
import {ExtraButton} from '../common/ExtraButton';
import _ from 'lodash';
import {useToast} from '../Toast';

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
const initialValues: FormValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

export const SignUp: React.FC = (): JSX.Element => {
  const nav = useNavigation();
  const auth = useAuth();
  const Toast = useToast();

  const signUp = async (
    {name, email, password}: FormValues,
    {setSubmitting},
  ) => {
    try {
      await auth.signUp(name, email, password);
      nav.navigate(Routes.ConfirmSignUp);
    } catch (e) {
      console.log(e);
      Toast.danger(e);
      setSubmitting(false);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff'}}>
      <Title />
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
            <Input
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder={I18n.t('auth.signUpNamePlaceholder')}
              errorMessage={
                touched.name ? _.upperFirst(errors?.name) : undefined
              }
            />
            <Input
              autoCapitalize={'none'}
              autoCorrect={false}
              textContentType={'emailAddress'}
              keyboardType={'email-address'}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder={I18n.t('auth.signUpEmailPlaceholder')}
              errorMessage={
                touched.email ? _.upperFirst(errors?.email) : undefined
              }
            />
            <Input
              autoCapitalize={'none'}
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder={I18n.t('auth.signUpPasswordPlaceholder')}
              errorMessage={
                touched.password ? _.upperFirst(errors?.password) : undefined
              }
            />
            <Input
              autoCapitalize={'none'}
              secureTextEntry
              onChangeText={handleChange('passwordConfirmation')}
              onBlur={handleBlur('passwordConfirmation')}
              value={values.passwordConfirmation}
              placeholder={I18n.t('auth.signUpPasswordConfirmationPlaceholder')}
              errorMessage={
                touched.passwordConfirmation
                  ? _.upperFirst(errors?.passwordConfirmation)
                  : undefined
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
    </View>
  );
};
