import React from 'react';
import I18n from '../../i18n/';
import {View, Text, ScrollView} from 'react-native';
import {Formik, FormikProps} from 'formik';
import * as yup from 'yup';
import {SubmitButton} from '../common/SubmitButton';
import {useAuth} from '../../auth/Auth';
import {Card, Input, ListItem} from 'react-native-elements';
import _ from 'lodash';
import {useToast} from '../Toast';

const emailChangeValidationSchema = yup.object().shape({
  newEmail: yup
    .string()
    .required()
    .email()
    .label(I18n.t('profile.changeEmail.newEmail')),
  password: yup
    .string()
    .required()
    .label(I18n.t('profile.changeEmail.password')),
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
      Toast.info(I18n.t('profile.verifyEmail.codeEmailed'));
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
    <ScrollView>
      <Card title={'Email address'}>
        <ListItem
          title={email}
        />
      </Card>
      <Card title={I18n.t('profile.changeEmail.changeEmail')}>
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
            <View>
              <Input
                autoCapitalize={'none'}
                autoCorrect={false}
                textContentType={'emailAddress'}
                keyboardType={'email-address'}
                onChangeText={handleChange('newEmail')}
                onBlur={handleBlur('newEmail')}
                value={values.newEmail}
                editable={!isSubmitting}
                placeholder={I18n.t('profile.changeEmail.newEmail')}
                errorMessage={
                  touched.newEmail ? _.upperFirst(errors?.newEmail) : undefined
                }
              />
              <Input
                autoCapitalize={'none'}
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                editable={!isSubmitting}
                placeholder={I18n.t('profile.changeEmail.password')}
                errorMessage={
                  touched.password ? _.upperFirst(errors?.password) : undefined
                }
              />
              <Text>{I18n.t('profile.changeEmail.passwordNote')}</Text>
              <SubmitButton
                onPress={() => handleSubmit()}
                disabled={!isValid}
                isSubmitting={isSubmitting}
                label={I18n.t('profile.changeEmail.changeEmail')}
              />
            </View>
          )}
        </Formik>
      </Card>
    </ScrollView>
  );
};
