import React, {useState} from 'react';
import I18n from '../../i18n';
import {Routes} from '../../nav/Routes';
import {SubmitButton} from '../common/SubmitButton';
import {Title} from './common/Title';
import {InfoText} from './common/InfoText';
import {useAuth} from '../../auth/Auth';
import {SmallSpinner} from '../common/Spinner';
import {useNavigation} from '@react-navigation/native';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useToast} from '../Toast';
import {Template} from '../common/Template';
import {authStyleSheet} from './Styles';
import assets from '../../assets';

/* const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  code: yup.string().required().label('Confirmation code'),
});
type FormValues = yup.InferType<typeof validationSchema>;
const initialValues: FormValues = {
  email: '',
  code: '',
}; */

export const ConfirmSignUp: React.FC = (): JSX.Element => {
  const nav = useNavigation();
  const auth = useAuth();
  const Toast = useToast();
  //const route = useRoute<ConfirmSignUpRouteProp>();
  //initialValues.email = route?.params?.email ?? initialValues.email;

  if (!auth.state?.uid) {
    nav.navigate(Routes.SignIn);
  } else if (auth.state?.uid && !auth.state?.name) {
    nav.navigate(Routes.SignUpNext);
  }

  const startOver = async () => {
    await auth.deleteUser();
    nav.navigate(Routes.SignUp);
  };

  /* const confirmSignUp = async ({email, code}: FormValues, {setSubmitting}) => {
    try {
      await auth.confirmSignUp(email, code);
      console.log('SignUp confirmed');
      if (route?.params?.password) {
        await auth.signIn(email, route?.params?.password);
        setSubmitting(false);
      } else {
        setSubmitting(false);
        navigation.replace(Routes.SignIn, {email, signUpConfirmed: true});
      }
    } catch (e) {
      console.log(e);
      Toast.danger(e.message);
      setSubmitting(false);
    }
  }; */

  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const resendEmail = async () => {
    try {
      setIsResendingEmail(true);
      await auth.sendVerificationEmail();
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
            source={assets.images.bubble.bubble}
            style={{
              width: 100,
              height: 100,
              position: 'absolute',
              zIndex: 4,
              top: -50,
            }}
          />
          <Image
            source={assets.images.bubble.avatarMultiBig}
            style={{
              width: 70,
              height: 70,
              position: 'absolute',
              zIndex: 4,
              top: -35,
            }}
          />
          <View style={authStyleSheet.formContainer}>
            <Text style={[authStyleSheet.heading1, {marginTop: 40}]}>
              {I18n.t('auth.welcomeText').replace(
                ' $0',
                auth.state?.name ? ` ${auth.state.name}` : '',
              )}
            </Text>
            <Text style={[authStyleSheet.heading2, {marginTop: 16}]}>
              {I18n.t('auth.confirmAccountText')}
            </Text>
            <Text
              style={[
                authStyleSheet.heading2,
                {marginTop: 16, fontWeight: 'bold'},
              ]}>
              {auth.state?.email}
            </Text>
            <Text style={[authStyleSheet.heading2, {marginTop: 16}]}>
              {I18n.t('auth.confirmAccountText2')}
            </Text>
            <Text
              style={[
                authStyleSheet.extraText,
                {marginTop: 32, marginBottom: 16},
              ]}>
              {I18n.t('auth.codeNotReceived')}
            </Text>
            <SubmitButton
              onPress={() => resendEmail()}
              loading={isResendingEmail}
              title={I18n.t('auth.confirmSignUpResendCodeButtonTitle')}
            />
            <View style={[authStyleSheet.noAccountContainer, {marginTop: 32}]}>
              <Text style={[authStyleSheet.extraText, {marginRight: 8}]}>
                {I18n.t('auth.confirmSignUpSomethingWrong')}
              </Text>
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
