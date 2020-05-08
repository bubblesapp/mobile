import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import I18n from '../../i18n/';
import {authStyleSheet, authStyleSheet as styles} from './Styles';
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
import {SmallSpinner} from '../common/Spinner';
import {Template} from '../common/Template';
import {useNavigation, useRoute} from '@react-navigation/native';
import assets from '../../assets';

/*const validationSchema = yup.object().shape({
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
};*/

export const ResetPasswordEmailSent: React.FC = (): JSX.Element => {
  const auth = useAuth();
  const nav = useNavigation();
  const route = useRoute();
  const email = route.params?.email;
  const Toast = useToast();

  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const resendEmail = async () => {
    if (!email) {
      return;
    }
    try {
      setIsResendingEmail(true);
      await auth.resetPassword(email);
      setIsResendingEmail(false);
      Toast.success(I18n.t('auth.confirmSignUpCodeResent'));
    } catch (e) {
      setIsResendingEmail(false);
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
          <View style={authStyleSheet.formContainer}>
            <Text style={[authStyleSheet.heading1, {marginTop: 40}]}>
              {I18n.t('auth.passwordResetEmailSentTitle')}
            </Text>
            <Text
              style={[
                authStyleSheet.heading2,
                {marginTop: 16, fontWeight: 'bold'},
              ]}>
              {email}
            </Text>
            <Text style={[authStyleSheet.heading2, {marginTop: 16}]}>
              {I18n.t('auth.passwordResetEmailSentText')}
            </Text>
            <Text
              style={[
                authStyleSheet.extraText,
                {marginTop: 32, marginBottom: 16},
              ]}>
              {I18n.t('auth.codeNotReceived')}
            </Text>
            <SubmitButton
              containerStyle={{marginBottom: 24}}
              onPress={() => resendEmail()}
              loading={isResendingEmail}
              title={I18n.t('auth.confirmSignUpResendCodeButtonTitle')}
            />
            <View style={[authStyleSheet.noAccountContainer]}>
              <TouchableOpacity onPress={() => nav.navigate(Routes.SignIn)}>
                <Text style={authStyleSheet.extraLink}>
                  {I18n.t('auth.backToLogin')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      }
    />
  );
};
