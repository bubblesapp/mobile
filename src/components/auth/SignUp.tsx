import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import I18n from '../../i18n/';
import {authStyleSheet, authStyleSheet as styles} from './Styles';
import * as yup from 'yup';
import {Formik} from 'formik';
import {Title} from './common/Title';
import {useAuth} from '../../auth/Auth';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../nav/Routes';
import {SubmitButton} from '../common/SubmitButton';
import _ from 'lodash';
import {useToast} from '../Toast';
import {Template} from '../common/Template';
import {Input} from './common/Input';
import {CheckBox} from 'react-native-elements';
import {customTheme} from '../../theme/theme';

const validationSchema = yup.object().shape({
  //name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  /* passwordConfirmation: yup
    .string()
    .required()
    .oneOf(
      [yup.ref('password')],
      I18n.t('auth.error.auth/confirmation-mismatch'),
    )
    .label('Password confirmation'), */
  agree: yup.boolean(),
});
type FormValues = yup.InferType<typeof validationSchema> & {general?: string};
const initialValues: FormValues = {
  //name: '',
  email: '',
  password: '',
  //passwordConfirmation: '',
  agree: false,
};

export const SignUp: React.FC = (): JSX.Element => {
  const nav = useNavigation();
  const auth = useAuth();
  const Toast = useToast();

  const signUp = async (
    {email, password}: FormValues,
    {setSubmitting},
  ) => {
    try {
      await auth.signUp(email, password);
      nav.navigate(Routes.SignUpNext);
    } catch (e) {
      console.log(e);
      Toast.danger(e.message);
      setSubmitting(false);
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
            source={require('../../../assets/images/Woman.png')}
            style={{
              width: 104,
              height: 149,
              position: 'absolute',
              zIndex: 4,
              top: -128,
            }}
          />
          <Formik
            initialValues={initialValues}
            validateOnMount={true}
            validationSchema={validationSchema}
            isInitialValid={false}
            onSubmit={signUp}>
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
              <View style={styles.formContainer}>
                {/*<Input
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  placeholder={I18n.t('auth.signUpNamePlaceholder')}
                  errorMessage={
                    touched.name ? _.upperFirst(errors?.name) : undefined
                  }
                />*/}
                <Input
                  autoCapitalize={'none'}
                  textContentType={'emailAddress'}
                  keyboardType={'email-address'}
                  onChangeText={handleChange('email')}
                  doOnBlur={handleBlur('email')}
                  value={values.email}
                  editable={!isSubmitting}
                  label={I18n.t('auth.signUpEmailLabel')}
                  placeholder={I18n.t('auth.signUpEmailPlaceholder')}
                  errorMessage={
                    touched.email ? _.upperFirst(errors?.email || ' ') : ' '
                  }
                  tooltip={I18n.t('auth.signUpEmailDataInfo')}
                />
                <Input
                  autoCapitalize={'none'}
                  secure={true}
                  onChangeText={handleChange('password')}
                  doOnBlur={handleBlur('password')}
                  value={values.password}
                  editable={!isSubmitting}
                  label={I18n.t('auth.signUpPasswordLabel')}
                  placeholder={I18n.t('auth.signUpPasswordPlaceholder')}
                  errorMessage={
                    touched.password
                      ? _.upperFirst(errors?.password || ' ')
                      : ' '
                  }
                />
                {/*<Input
                  autoCapitalize={'none'}
                  secureTextEntry
                  onChangeText={handleChange('passwordConfirmation')}
                  onBlur={handleBlur('passwordConfirmation')}
                  value={values.passwordConfirmation}
                  placeholder={I18n.t(
                    'auth.signUpPasswordConfirmationPlaceholder',
                  )}
                  errorMessage={
                    touched.passwordConfirmation
                      ? _.upperFirst(errors?.passwordConfirmation)
                      : undefined
                  }
                />
                <InfoText>{I18n.t('auth.signUpLegal')}</InfoText>*/}
                <View style={authStyleSheet.rememberContainer}>
                  <CheckBox
                    textStyle={authStyleSheet.checkboxLabel}
                    containerStyle={authStyleSheet.checkboxContainer}
                    title={I18n.t('auth.signUpAgreeToTerms')}
                    checkedIcon={'check-circle'}
                    uncheckedIcon={'circle-thin'}
                    checkedColor={customTheme.colors.success}
                    onPress={() => setFieldValue('agree', !values.agree)}
                    checked={values.agree}
                  />
                </View>
                <SubmitButton
                  containerStyle={{marginVertical: 24}}
                  onPress={() => handleSubmit()}
                  disabled={!isValid || !values.agree}
                  loading={isSubmitting}
                  title={I18n.t('auth.signUpButtonTitle')}
                />
                <View style={authStyleSheet.noAccountContainer}>
                  <Text style={[authStyleSheet.extraText, {marginRight: 8}]}>
                    {I18n.t('auth.alreadyHaveAccount')}
                  </Text>
                  <TouchableOpacity onPress={() => nav.navigate(Routes.SignIn)}>
                    <Text style={authStyleSheet.extraLink}>
                      {I18n.t('auth.alreadyHaveAccountAction')}
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
  {
    /*<View style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff'}}>
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
    </View>*/
  }
};
