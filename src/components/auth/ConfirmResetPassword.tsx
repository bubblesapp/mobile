import React from 'react';
import {View} from 'react-native';
import I18n from '../../i18n/';
import {authStyleSheet as styles} from './Styles';
import {Routes} from '../../nav/Routes';
import * as yup from 'yup';
import {Formik} from 'formik';
import {SubmitButton} from '../common/SubmitButton';
import {Title} from './common/Title';
import {InfoText} from './common/InfoText';
import {useAuth} from '../../auth/Auth';
import {Input} from 'react-native-elements';
import _ from 'lodash';
import {ExtraText} from './common/ExtraText';
import {ExtraButton} from '../common/ExtraButton';
import {useToast} from '../Toast';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  code: yup.string().required().label('Confirmation code'),
  password: yup.string().required().min(6),
  passwordConfirmation: yup
    .string()
    .required()
    .min(6)
    .oneOf(
      [yup.ref('password')],
      I18n.t('auth.error.auth/confirmation-mismatch'),
    )
    .label('Password confirmation'),
});
type FormValues = yup.InferType<typeof validationSchema>;
const initialValues: FormValues = {
  email: '',
  code: '',
  password: '',
  passwordConfirmation: '',
};

export const ConfirmResetPassword: React.FC = (): JSX.Element => {
  const auth = useAuth();
  const Toast = useToast();
  const confirmResetPassword = async (
    {email, code, password, passwordConfirmation}: FormValues,
    {setSubmitting},
  ) => {
    try {
      await auth.confirmResetPassword(email, code, password);
      await auth.signIn(email, password);
      setSubmitting(false);
    } catch (e) {
      setSubmitting(false);
      Toast.danger(e.message);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff'}}>
      <Title />
      <InfoText>{I18n.t('auth.confirmResetPasswordText')}</InfoText>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount={true}
        onSubmit={confirmResetPassword}>
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
              secureTextEntry
              onChangeText={handleChange('code')}
              onBlur={handleBlur('code')}
              value={values.code}
              editable={!isSubmitting}
              placeholder={I18n.t('auth.confirmResetPasswordCodePlaceholder')}
              errorMessage={
                touched.code ? _.upperFirst(errors?.code) : undefined
              }
            />
            <Input
              autoCapitalize={'none'}
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder={I18n.t(
                'auth.confirmResetPasswordNewPasswordPlaceholder',
              )}
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
              placeholder={I18n.t(
                'auth.confirmResetPasswordNewPasswordConfirmationPlaceholder',
              )}
              errorMessage={
                touched.passwordConfirmation
                  ? _.upperFirst(errors?.passwordConfirmation)
                  : undefined
              }
            />
            <SubmitButton
              onPress={() => handleSubmit()}
              disabled={!isValid}
              isSubmitting={isSubmitting}
              label={I18n.t('auth.confirmResetPasswordSubmitButtonTitle')}
            />
            <ExtraText>{I18n.t('auth.codeNotReceived')}</ExtraText>
            <ExtraButton
              to={Routes.ResetPassword}
              params={{email: values.email}}
              label={I18n.t('auth.confirmResetPasswordTryAgainButtonTitle')}
            />
          </View>
        )}
      </Formik>
      <ExtraButton
        to={Routes.SignIn}
        label={I18n.t('auth.backToLoginButtonTitle')}
      />
    </View>
  );
};
