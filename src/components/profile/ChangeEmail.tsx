import React from 'react';
import I18n from '../../i18n/';
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Formik, FormikProps} from 'formik';
import * as yup from 'yup';
import {SubmitButton} from '../common/SubmitButton';
import {useAuth} from '../../auth/Auth';
import _ from 'lodash';
import {useToast} from '../Toast';
import {customTheme} from '../../theme/theme';
import {profileStyles as styles} from './Styles';
import {Input} from '../common/Input';
import {BackButton} from '../common/BackButton';
import {Header} from './Header';
import {PasswordNote} from './PasswordNote';
import {Wrapper} from '../common/Wrapper';

const emailChangeValidationSchema = yup.object().shape({
  newEmail: yup
    .string()
    .required()
    .email()
    .label(I18n.t('profile.changeEmail.newEmailLabel')),
  password: yup
    .string()
    .required()
    .label(I18n.t('profile.changeEmail.passwordLabel')),
});
type EmailChangeFormValues = yup.InferType<typeof emailChangeValidationSchema>;
const emailChangeInitialValues: EmailChangeFormValues = {
  newEmail: '',
  password: '',
};

export const ChangeEmail: React.FC = (): JSX.Element => {
  const auth = useAuth();
  const Toast = useToast();

  /* const verifyEmail = async (
    {code},
    {setSubmitting}: FormikProps<EmailVerificationFormValues>,
  ) => {
    try {
      await auth.verifyEmail(code);
      Toast.info(I18n.t('profile.verifyEmail.emailVerified'));
    } catch (e) {
      Toast.danger(e.message);
      setSubmitting(false);
    }
  };

  const [isRequestingCode, setIsRequestingCode] = useState(false);

  const requestEmailVerificationCode = async () => {
    try {
      setIsRequestingCode(true);
      await auth.requestEmailVerificationCode();
      await Toast.info(I18n.t('profile.verifyEmail.codeEmailed'));
    } catch (e) {
      await Toast.danger(e.message);
    } finally {
      setIsRequestingCode(false);
    }
  }; */

  const changeEmail = async (
    {newEmail, password}: EmailChangeFormValues,
    {setSubmitting, resetForm}: FormikProps<EmailChangeFormValues>,
  ) => {
    try {
      await auth.changeEmail(newEmail, password);
      Toast.success(I18n.t('profile.verifyEmail.codeEmailed'));
      resetForm();
    } catch (e) {
      console.log(e);
      Toast.danger(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const {email} = auth.state;
  return (
    <Wrapper topColor={customTheme.colors.lightBlue} bottomColor={'#fff'}>
      <View style={styles.header}>
        <Header title={I18n.t('profile.changeEmail.title')} />
      </View>
      <View style={styles.content}>
        <Text style={styles.heading1}>
          {I18n.t('profile.changeEmail.heading1')}
        </Text>
        <Text style={styles.heading2}>
          {I18n.t('profile.changeEmail.heading2')}
        </Text>
        <Formik
          initialValues={emailChangeInitialValues}
          validationSchema={emailChangeValidationSchema}
          validateOnMount={true}
          onSubmit={changeEmail}>
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
                textContentType={'emailAddress'}
                keyboardType={'email-address'}
                onChangeText={handleChange('newEmail')}
                doOnBlur={handleBlur('newEmail')}
                value={values.newEmail}
                editable={!isSubmitting}
                label={I18n.t('profile.changeEmail.newEmailLabel')}
                placeholder={I18n.t('profile.changeEmail.newEmailPlaceholder')}
                errorMessage={
                  touched.newEmail ? _.upperFirst(errors?.newEmail ?? ' ') : ' '
                }
              />
              <Input
                autoCapitalize={'none'}
                onChangeText={handleChange('password')}
                doOnBlur={handleBlur('password')}
                value={values.password}
                editable={!isSubmitting}
                label={I18n.t('profile.changeEmail.passwordLabel')}
                placeholder={I18n.t('profile.changeEmail.passwordPlaceholder')}
                secure={true}
                errorMessage={
                  touched.password ? _.upperFirst(errors?.password ?? ' ') : ' '
                }
              />
              <SubmitButton
                onPress={() => handleSubmit()}
                disabled={!isValid}
                loading={isSubmitting}
                title={I18n.t('profile.changeEmail.button')}
              />
            </View>
          )}
        </Formik>
      </View>
    </Wrapper>
  );
};
