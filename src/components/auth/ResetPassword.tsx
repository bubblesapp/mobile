import {Modal as ModalNative, Platform, Text, TouchableOpacity, View,} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../../auth/Auth';
import {useToast} from '../Toast';
import I18n from '../../i18n';
import {Overlay} from 'react-native-elements';
import {SmallSpinner} from '../common/Spinner';
import ModalWeb from 'modal-react-native-web';
import {authStyleSheet} from './Styles';
import {Input} from '../common/Input';
import _ from 'lodash';
import {SubmitButton} from '../common/SubmitButton';
import {Formik} from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  password: yup.string().required().label(I18n.t('auth.resetPasswordNewPasswordLabel')),
});
type FormValues = yup.InferType<typeof validationSchema>;
const initialValues: FormValues = {
  password: '',
};

const Modal = Platform.OS === 'web' ? ModalWeb : ModalNative;

type Props = {
  oobCode: string;
};

export const ResetPassword: React.FC<Props> = (props) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isActionCodeVerified, setIsActionCodeVerified] = useState(false);
  const [email, setEmail] = useState<string>();
  const auth = useAuth();
  const Toast = useToast();

  if (!props.oobCode) {
    setIsVisible(false);
  }

  useEffect(() => {
    auth
      .verifyPasswordResetCode(props.oobCode)
      .then((e) => {
        setEmail(e);
        setIsActionCodeVerified(true);
      })
      .catch((err) => {
        setIsVisible(false);
        Toast.danger(err.message);
      });
  }, []);

  const confirmResetPassword = async (
    {password}: FormValues,
    {setSubmitting},
  ) => {
    try {
      if (email) {
        await auth.confirmResetPassword(props.oobCode, password);
        Toast.success(I18n.t('auth.resetPasswordSuccess'));
        await auth.signIn(email, password);
        if (Platform.OS === 'web') {
          window.history.pushState(
            null,
            window.history.state?.title || 'Bubbles',
            '/',
          );
        }
        setIsVisible(false);
        setSubmitting(false);
      }
    } catch (e) {
      console.log(e);
      Toast.danger(e.message);
      setSubmitting(false);
    }
  };

  return (
    <Overlay
      overlayStyle={authStyleSheet.overlay}
      isVisible={isVisible}
      ModalComponent={Modal}>
      {!isActionCodeVerified ? (
        <SmallSpinner />
      ) : (
        <Formik
          initialValues={initialValues}
          validateOnMount={true}
          validationSchema={validationSchema}
          isInitialValid={false}
          onSubmit={confirmResetPassword}>
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
            <View style={{padding: 8}}>
              <Input
                autoCapitalize={'none'}
                secure={true}
                onChangeText={handleChange('password')}
                doOnBlur={handleBlur('password')}
                value={values.password}
                editable={!isSubmitting}
                label={I18n.t('auth.resetPasswordNewPasswordLabel')}
                placeholder={I18n.t(
                  'auth.resetPasswordNewPasswordPlaceholder',
                )}
                errorMessage={
                  touched.password
                    ? _.upperFirst(errors?.password || ' ')
                    : ' '
                }
              />
              <SubmitButton
                onPress={() => handleSubmit()}
                disabled={!isValid}
                loading={isSubmitting}
                title={I18n.t('auth.resetPasswordSubmitButtonTitle')}
              />
              <View style={[authStyleSheet.noAccountContainer, {marginTop: 24}]}>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <Text style={authStyleSheet.extraLink}>
                    {I18n.t('auth.cancel')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      )}
    </Overlay>
  );
};
