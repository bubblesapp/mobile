import React from 'react';
import I18n from '../../i18n/';
import {ScrollView, View} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {SubmitButton} from '../common/SubmitButton';
import {useAuth} from '../../auth/Auth';
import {Card, Input} from 'react-native-elements';
import _ from 'lodash';
import {useToast} from '../Toast';

const validationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required()
    .min(6)
    .label(I18n.t('profile.changePassword.currentPassword')),
  newPassword: yup
    .string()
    .required()
    .min(6)
    .label(I18n.t('profile.changePassword.newPassword')),
  newPasswordConfirmation: yup
    .string()
    .required()
    .min(6)
    .oneOf(
      [yup.ref('newPassword')],
      I18n.t('auth.error.auth/confirmation-mismatch'),
    )
    .label(I18n.t('profile.changePassword.newPasswordConfirmation')),
});
type FormValues = yup.InferType<typeof validationSchema> & {general?: string};
const initialValues: FormValues = {
  currentPassword: '',
  newPassword: '',
  newPasswordConfirmation: '',
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
      await Toast.success('Password changed.');
    } catch (e) {
      await Toast.danger(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView>
      <Card title={I18n.t('profile.changePassword.title')}>
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
            <View>
              <Input
                autoCapitalize={'none'}
                secureTextEntry
                onChangeText={handleChange('currentPassword')}
                onBlur={handleBlur('currentPassword')}
                value={values.currentPassword}
                editable={!isSubmitting}
                placeholder={I18n.t('profile.changePassword.currentPassword')}
                errorMessage={
                  touched.currentPassword
                    ? _.upperFirst(errors?.currentPassword)
                    : undefined
                }
              />
              <Input
                autoCapitalize={'none'}
                secureTextEntry
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                value={values.newPassword}
                editable={!isSubmitting}
                placeholder={I18n.t('profile.changePassword.newPassword')}
                errorMessage={
                  touched.newPassword
                    ? _.upperFirst(errors?.newPassword)
                    : undefined
                }
              />
              <Input
                autoCapitalize={'none'}
                secureTextEntry
                onChangeText={handleChange('newPasswordConfirmation')}
                onBlur={handleBlur('newPasswordConfirmation')}
                value={values.newPasswordConfirmation}
                editable={!isSubmitting}
                placeholder={I18n.t(
                  'profile.changePassword.newPasswordConfirmation',
                )}
                errorMessage={
                  touched.newPasswordConfirmation
                    ? _.upperFirst(errors?.newPasswordConfirmation)
                    : undefined
                }
              />
              <SubmitButton
                onPress={() => handleSubmit()}
                disabled={!isValid}
                isSubmitting={isSubmitting}
                label={I18n.t('profile.changePassword.changePassword')}
              />
            </View>
          )}
        </Formik>
      </Card>
    </ScrollView>
  );
};
