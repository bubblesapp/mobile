import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import I18n from '../../services/i18n/';
import {authStyleSheet, authStyleSheet as styles} from './Styles';
import * as yup from 'yup';
import {Formik} from 'formik';
import {Title} from '../common/Title';
import {useAuth} from '../../services/auth/useAuth';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../services/navigation/Routes';
import {SubmitButton} from '../common/SubmitButton';
import _ from 'lodash';
import {useToast} from '../common/Toast';
import {Template} from './Template';
import {Input} from '../common/Input';
import {CheckBox} from 'react-native-elements';
import {customTheme} from '../theme';
import assets from '../assets';
import {openURLInNewTab} from '../../services/util/utils';
import Constants from '../../services/util/Constants';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  agree: yup.boolean(),
});
type FormValues = yup.InferType<typeof validationSchema> & {general?: string};
const initialValues: FormValues = {
  email: '',
  password: '',
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
            source={assets.images.auth.woman}
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
                <View style={authStyleSheet.rememberContainer}>
                  <CheckBox
                    title={
                      <Text style={authStyleSheet.checkboxLabel}>
                        {I18n.t('auth.signUpAgreeToTerms')}
                        <TouchableOpacity
                          onPress={() => openURLInNewTab(Constants.TERMS_LINK)}>
                          <Text style={authStyleSheet.checkboxLabelLink}>
                            {I18n.t('auth.signUpAgreeToTermsLink')}
                          </Text>
                        </TouchableOpacity>
                      </Text>
                    }
                    containerStyle={authStyleSheet.checkboxContainer}
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
};
