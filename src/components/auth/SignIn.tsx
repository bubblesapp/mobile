import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import I18n from '../../i18n';
import {Routes} from '../../nav/Routes';
import * as yup from 'yup';
import {Formik} from 'formik';
import {SubmitButton} from '../common/SubmitButton';
import {Title} from './common/Title';
import {useAuth} from '../../auth/Auth';
import {useNavigation} from '@react-navigation/native';
import {CheckBox} from 'react-native-elements';
import _ from 'lodash';
import {useToast} from '../Toast';
import {Template} from '../common/Template';
import {authStyleSheet} from './Styles';
import {customTheme} from '../../theme/theme';
import {Input} from './common/Input';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  remember: yup.boolean(),
});
type FormValues = yup.InferType<typeof validationSchema>;
const initialValues: FormValues = {
  email: '',
  password: '',
  remember: false,
};

export const SignIn: React.FC = (): JSX.Element => {
  const auth = useAuth();
  const nav = useNavigation();
  const Toast = useToast();
  console.log('Signnnn in');

  if (auth.state?.uid && !auth.state?.name) {
    nav.navigate(Routes.SignUpNext);
  } else if (auth.state?.uid && !auth.state?.emailVerified) {
    nav.navigate(Routes.ConfirmSignUp);
  }

  const signIn = async (
    {email, password, remember}: FormValues,
    {setSubmitting},
  ) => {
    console.log('Signing in');
    try {
      await auth.signIn(email, password, remember);
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
    <Template
      title={<Title />}
      headerStyle={{
        height: 250,
      }}
      content={
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
          <Image
            source={require('../../../assets/images/Man.png')}
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
                      Forgot password?
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
        </View>
      }
    />
  );
  {
    /*<View style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff'}}>
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
        to={Routes.ForgotPassword}
        label={I18n.t('auth.resetPasswordButtonTitle')}
      />
    </View>*/
  }
};
