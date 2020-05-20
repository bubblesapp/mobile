import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import I18n from '../../services/i18n/';
import {authStyleSheet, authStyleSheet as styles} from './Styles';
import {Routes} from '../../services/navigation/Routes';
import {Formik} from 'formik';
import * as yup from 'yup';
import {SubmitButton} from '../common/SubmitButton';
import {Title} from '../common/Title';
import {useAuth} from '../../services/auth/useAuth';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import {Template} from './Template';
import {Input} from '../common/Input';
import assets from '../assets';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
});
type FormValues = yup.InferType<typeof validationSchema>;
const initialValues: FormValues = {
  email: '',
};

export const ForgotPassword: React.FC = (): JSX.Element => {
  const nav = useNavigation();
  const auth = useAuth();
  const resetPassword = async ({email}: FormValues, {setSubmitting}) => {
    try {
      await auth.initiatePasswordReset(email);
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
      nav.navigate(Routes.ResetPasswordEmailSent, {email});
    }
  };
  return (
    <Template
      title={<Title />}
      headerStyle={{
        height: 250,
      }}
      content={
        <>
          <Image
            source={assets.images.auth.man}
            style={{
              width: 106,
              height: 121,
              position: 'absolute',
              zIndex: 4,
              top: -110,
            }}
          />
          <Formik
            initialValues={initialValues}
            validateOnMount={true}
            validationSchema={validationSchema}
            isInitialValid={false}
            onSubmit={resetPassword}>
            {({
              handleSubmit,
              handleBlur,
              handleChange,
              values,
              errors,
              touched,
              isSubmitting,
              isValid,
            }) => (
              <View style={styles.formContainer}>
                <Input
                  autoCapitalize={'none'}
                  textContentType={'emailAddress'}
                  keyboardType={'email-address'}
                  onChangeText={handleChange('email')}
                  doOnBlur={handleBlur('email')}
                  value={values.email}
                  editable={!isSubmitting}
                  label={I18n.t('auth.resetPasswordEmailLabel')}
                  placeholder={I18n.t('auth.resetPasswordEmailPlaceholder')}
                  errorMessage={
                    touched.email ? _.upperFirst(errors?.email || ' ') : ' '
                  }
                />
                <SubmitButton
                  containerStyle={{marginBottom: 24}}
                  onPress={() => handleSubmit()}
                  disabled={!isValid}
                  loading={isSubmitting}
                  title={I18n.t('auth.resetPasswordSubmitButtonTitle')}
                />
                <View style={authStyleSheet.noAccountContainer}>
                  <TouchableOpacity onPress={() => nav.navigate(Routes.SignIn)}>
                    <Text style={authStyleSheet.extraLink}>
                      {I18n.t('auth.backToLogin')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </>
      }
    />
  );
};
