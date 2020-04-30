import React from 'react';
import {View} from 'react-native';
import I18n from '../../i18n/';
import {authStyleSheet as styles} from './Styles';
import {Routes} from '../../nav/NavProvider';
import {Formik} from 'formik';
import * as yup from 'yup';
import {ExtraButton} from '../common/ExtraButton';
import {SubmitButton} from '../common/SubmitButton';
import {Title} from './common/Title';
import {useAuth} from '../../auth/Auth';
import {useNavigation} from '@react-navigation/native';
import {Input} from 'react-native-elements';
import _ from 'lodash';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
});
type FormValues = yup.InferType<typeof validationSchema>;
const initialValues: FormValues = {
  email: '',
};

export const ResetPassword: React.FC = (): JSX.Element => {
  const nav = useNavigation();
  const auth = useAuth();
  const resetPassword = async ({email}: FormValues, {setSubmitting}) => {
    try {
      await auth.resetPassword(email);
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
      nav.navigate(Routes.ConfirmResetPassword);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff'}}>
      <Title />
      <Formik
        initialValues={initialValues}
        validateOnMount={true}
        validationSchema={validationSchema}
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
              autoCorrect={false}
              textContentType={'emailAddress'}
              keyboardType={'email-address'}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              editable={!isSubmitting}
              placeholder={I18n.t('auth.resetPasswordEmailPlaceholder')}
              errorMessage={
                touched.email ? _.upperFirst(errors?.email) : undefined
              }
            />
            <SubmitButton
              onPress={() => handleSubmit()}
              disabled={!isValid}
              isSubmitting={isSubmitting}
              label={I18n.t('auth.resetPasswordSubmitButtonTitle')}
            />
            <ExtraButton
              to={Routes.SignIn}
              label={I18n.t('auth.backToLoginButtonTitle')}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
