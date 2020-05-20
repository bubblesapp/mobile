import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import I18n from '../../services/i18n';
import {Routes} from '../../services/navigation/Routes';
import * as yup from 'yup';
import {Formik} from 'formik';
import {SubmitButton} from '../common/SubmitButton';
import {Title} from '../common/Title';
import {useAuth} from '../../services/auth/useAuth';
import {useNavigation} from '@react-navigation/native';
import {CheckBox} from 'react-native-elements';
import _ from 'lodash';
import {useToast} from '../common/Toast';
import {Template} from './Template';
import {authStyleSheet} from './Styles';
import {customTheme} from '../theme';
import {Input} from '../common/Input';
import assets from '../assets';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  remember: yup.boolean(),
});
type FormValues = yup.InferType<typeof validationSchema>;
const initialValues: FormValues = {
  email: '',
  password: '',
  remember: true,
};

export const SignIn: React.FC = (): JSX.Element => {
  const auth = useAuth();
  const nav = useNavigation();
  const Toast = useToast();

  if (auth.state?.uid && !auth.state?.name) {
    nav.navigate(Routes.SignUpNext);
  }

  const signIn = async (
    {email, password, remember}: FormValues,
    {setSubmitting},
  ) => {
    try {
      await auth.signIn(email, password, remember);
    } catch (e) {
      console.log(e);
      setSubmitting(false);
      Toast.danger(e.message);
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
            validationSchema={validationSchema}
            isInitialValid={false}
            validateOnMount={true}
            onSubmit={signIn}>
            {({
              handleSubmit,
              handleBlur,
              handleChange,
              setFieldValue,
              values,
              errors,
              touched,
              isValid,
              isSubmitting,
            }) => (
              <View style={authStyleSheet.formContainer}>
                <Input
                  autoCapitalize={'none'}
                  textContentType={'emailAddress'}
                  keyboardType={'email-address'}
                  onChangeText={handleChange('email')}
                  doOnBlur={handleBlur('email')}
                  value={values.email}
                  editable={!isSubmitting}
                  label={I18n.t('auth.loginEmailLabel')}
                  placeholder={I18n.t('auth.loginEmailPlaceholder')}
                  errorMessage={
                    touched.email ? _.upperFirst(errors?.email || ' ') : ' '
                  }
                />
                <Input
                  autoCapitalize={'none'}
                  secure={true}
                  onChangeText={handleChange('password')}
                  doOnBlur={handleBlur('password')}
                  value={values.password}
                  editable={!isSubmitting}
                  label={I18n.t('auth.loginPasswordLabel')}
                  placeholder={I18n.t('auth.loginPasswordPlaceholder')}
                  errorMessage={
                    touched.password
                      ? _.upperFirst(errors?.password || ' ')
                      : ' '
                  }
                />
                <View style={authStyleSheet.rememberContainer}>
                  <CheckBox
                    textStyle={authStyleSheet.checkboxLabel}
                    containerStyle={authStyleSheet.checkboxContainer}
                    title={I18n.t('auth.loginRemember')}
                    checkedIcon={'check-circle'}
                    uncheckedIcon={'circle-thin'}
                    checkedColor={customTheme.colors.success}
                    onPress={() => setFieldValue('remember', !values.remember)}
                    checked={values.remember}
                  />
                  <TouchableOpacity
                    onPress={() => nav.navigate(Routes.ForgotPassword)}>
                    <Text style={authStyleSheet.extraLink}>
                      {I18n.t('auth.forgotPassword')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <SubmitButton
                  containerStyle={{marginVertical: 24}}
                  testID={'signIn'}
                  accessibilityLabel={'Sign In'}
                  onPress={() => handleSubmit()}
                  disabled={!isValid}
                  loading={isSubmitting}
                  title={I18n.t('auth.loginButtonTitle')}
                />
                <View style={authStyleSheet.noAccountContainer}>
                  <Text style={[authStyleSheet.extraText, {marginRight: 8}]}>
                    {I18n.t('auth.noAccountYet')}
                  </Text>
                  <TouchableOpacity onPress={() => nav.navigate(Routes.SignUp)}>
                    <Text style={authStyleSheet.extraLink}>
                      {I18n.t('auth.noAccountYetAction')}
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
