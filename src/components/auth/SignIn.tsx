import React from 'react';
import {View} from 'react-native';
import I18n from '../../i18n';
import {Routes} from '../../nav/NavProvider';
import {ExtraText} from './common/ExtraText';
import * as yup from 'yup';
import {Formik} from 'formik';
import {ExtraButton} from '../common/ExtraButton';
import {SubmitButton} from '../common/SubmitButton';
import {Title} from './common/Title';
import {useAuth} from '../../auth/Auth';
import {useNavigation} from '@react-navigation/native';
import {Input} from 'react-native-elements';
import _ from 'lodash';
import {useToast} from '../Toast';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
type FormValues = yup.InferType<typeof validationSchema>;
const initialValues: FormValues = {
  email: '',
  password: '',
};

export const SignIn: React.FC = (): JSX.Element => {
  const auth = useAuth();
  const nav = useNavigation();
  const Toast = useToast();
  console.log('Signnnn in');

  /*if (auth.state?.uid && !auth.state?.emailVerified) {
    nav.navigate(Routes.ConfirmSignUp);
  }*/

  const signIn = async ({email, password}: FormValues, {setSubmitting}) => {
    console.log('Signing in');
    try {
      await auth.signIn(email, password);
      /* if (auth.state?.uid && !auth.state?.emailVerified) {
        nav.navigate(Routes.ConfirmSignUp);
      } */
    } catch (e) {
      console.log(e);
      setSubmitting(false);
      Toast.danger(e.message);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff'}}>
      <Title />
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
            <Input
              autoCapitalize={'none'}
              autoCorrect={false}
              textContentType={'emailAddress'}
              keyboardType={'email-address'}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              editable={!isSubmitting}
              placeholder={I18n.t('auth.loginEmailPlaceholder')}
              errorStyle={{}}
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
              editable={!isSubmitting}
              placeholder={I18n.t('auth.loginPasswordPlaceholder')}
              errorMessage={
                touched.password ? _.upperFirst(errors?.password) : undefined
              }
            />
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
    </View>
  );
};
