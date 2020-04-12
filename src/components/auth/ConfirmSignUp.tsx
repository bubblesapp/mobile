import React, {useState} from 'react';
import I18n from '../../i18n';
import {Routes} from '../../nav/Routes';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/core';
import {AuthStackParamList} from './AuthNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationProp} from '../../../App';
import {ExtraText} from './common/ExtraText';
import {ExtraButton} from '../common/ExtraButton';
import {SubmitButton} from '../common/SubmitButton';
import {Title} from './common/Title';
import {InfoText} from './common/InfoText';
import {useAuth} from '../../auth/Auth';
import Toast from '../common/Toast';
import {Container, Content} from 'native-base';
import {SmallSpinner} from '../common/Spinner';

/* const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  code: yup.string().required().label('Confirmation code'),
});
type FormValues = yup.InferType<typeof validationSchema>;
const initialValues: FormValues = {
  email: '',
  code: '',
}; */
type ConfirmSignUpRouteProp = RouteProp<
  AuthStackParamList,
  Routes.ConfirmSignUp
>;
type ConfirmSignUpNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList, Routes.ConfirmSignUp>,
  RootNavigationProp
>;

export const ConfirmSignUp: React.FC = (): JSX.Element => {
  const navigation = useNavigation<ConfirmSignUpNavigationProp>();
  const auth = useAuth();
  //const route = useRoute<ConfirmSignUpRouteProp>();
  //initialValues.email = route?.params?.email ?? initialValues.email;

  if (!auth.state?.uid) {
    navigation.navigate(Routes.SignIn);
  }

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
    <Container>
      <Content
        padder
        contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
        <Title />
        {auth.state?.verifyingEmail ? (
          <>
            <InfoText>
              {I18n.t('auth.welcomeText').replace(
                ' $0',
                ` ${auth.state?.name ?? ''}`,
              )}
              {'\n'}
              {'\n'}
              {I18n.t('auth.verifyingEmailText')}
            </InfoText>
            <SmallSpinner />
          </>
        ) : (
          <>
            <InfoText>
              {I18n.t('auth.welcomeText').replace(
                ' $0',
                ` ${auth.state?.name ?? ''}`,
              )}
              {'\n'}
              {'\n'}
              {I18n.t('auth.confirmAccountText')}
              {'\n'}
              {auth.state?.email}
              {'\n'}
              {'\n'}
              {I18n.t('auth.confirmAccountText2')}
            </InfoText>
            <ExtraText>{I18n.t('auth.codeNotReceived')}</ExtraText>
            <SubmitButton
              onPress={() => resendEmail()}
              isSubmitting={isResendingEmail}
              label={I18n.t('auth.confirmSignUpResendCodeButtonTitle')}
            />
            <ExtraButton
              onPress={() => auth.signOut()}
              label={I18n.t('auth.backToLoginButtonTitle')}
            />
          </>
        )}
      </Content>
    </Container>
  );
};
