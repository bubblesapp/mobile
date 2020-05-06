import React from 'react';
import I18n from '../../i18n/';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {SubmitButton} from '../common/SubmitButton';
import {useAuth} from '../../auth/Auth';
import _ from 'lodash';
import {useToast} from '../Toast';
import {customTheme} from '../../theme/theme';
import {profileStyles as styles} from './Styles';
import {Header} from './Header';
import {Input} from '../common/Input';
import {PasswordNote} from './PasswordNote';
import {Wrapper} from '../common/Wrapper';

const validationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required()
    .min(6)
    .label(I18n.t('profile.changePassword.currentPasswordLabel')),
  newPassword: yup
    .string()
    .required()
    .min(6)
    .label(I18n.t('profile.changePassword.newPasswordLabel')),
  /* newPasswordConfirmation: yup
    .string()
    .required()
    .min(6)
    .oneOf(
      [yup.ref('newPassword')],
      I18n.t('auth.error.auth/confirmation-mismatch'),
    )
    .label(I18n.t('profile.changePassword.newPasswordConfirmation')), */
});
type FormValues = yup.InferType<typeof validationSchema> & {general?: string};
const initialValues: FormValues = {
  currentPassword: '',
  newPassword: '',
  //newPasswordConfirmation: '',
};

export const ChangePassword: React.FC = (): JSX.Element => {
  const auth = useAuth();
  const Toast = useToast();

  const changePassword = async (
    {currentPassword, newPassword}: FormValues,
    {setFieldError, setSubmitting},
  ) => {
    try {
      await auth.changePassword(currentPassword, newPassword);
      await Toast.success(I18n.t('profile.changePassword.success'));
    } catch (e) {
      await Toast.danger(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Wrapper topColor={customTheme.colors.lightBlue} bottomColor={'#fff'}>
      <View style={styles.header}>
        <Header title={I18n.t('profile.changePassword.title')} />
      </View>
      <View style={styles.content}>
        <Text style={styles.heading1}>
          {I18n.t('profile.changePassword.heading1')}
        </Text>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount={true}
          onSubmit={changePassword}>
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
                secure={true}
                onChangeText={handleChange('currentPassword')}
                doOnBlur={handleBlur('currentPassword')}
                value={values.currentPassword}
                editable={!isSubmitting}
                label={I18n.t('profile.changePassword.currentPasswordLabel')}
                placeholder={I18n.t(
                  'profile.changePassword.currentPasswordPlaceholder',
                )}
                errorMessage={
                  touched.currentPassword
                    ? _.upperFirst(errors?.currentPassword ?? ' ')
                    : ' '
                }
              />
              <Input
                autoCapitalize={'none'}
                secure={true}
                onChangeText={handleChange('newPassword')}
                doOnBlur={handleBlur('newPassword')}
                value={values.newPassword}
                editable={!isSubmitting}
                label={I18n.t('profile.changePassword.newPasswordLabel')}
                placeholder={I18n.t(
                  'profile.changePassword.newPasswordPlaceholder',
                )}
                errorMessage={
                  touched.newPassword
                    ? _.upperFirst(errors?.newPassword ?? ' ')
                    : ' '
                }
              />
              <SubmitButton
                onPress={() => handleSubmit()}
                disabled={!isValid}
                loading={isSubmitting}
                title={I18n.t('profile.changePassword.button')}
              />
            </View>
          )}
        </Formik>
      </View>
    </Wrapper>
  );
};
