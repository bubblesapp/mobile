import React from 'react';
import I18n from '../../i18n/';
import {Formik} from 'formik';
import * as yup from 'yup';
import {SubmitButton} from '../common/SubmitButton';
import {useAuth} from '../../auth/Auth';
import _ from 'lodash';
import {Image, Text, View} from 'react-native';
import {useToast} from '../Toast';
import {Wrapper} from '../common/Wrapper';
import {profileStyles as styles} from './Styles';
import {Header} from './Header';
import {Input} from '../common/Input';
import {customTheme} from '../../theme/theme';

const validationSchema = yup.object().shape({
  password: yup.string().required().min(6),
});
type FormValues = yup.InferType<typeof validationSchema>;
const initialValues: FormValues = {
  password: '',
};

export const DeleteAccount: React.FC = (): JSX.Element => {
  const auth = useAuth();
  const Toast = useToast();

  const deleteAccount = async ({password}: FormValues, {setSubmitting}) => {
    try {
      await auth.deleteUser(password);
    } catch (e) {
      await Toast.danger(e.message);
      setSubmitting(false);
    }
  };

  return (
    <Wrapper topColor={customTheme.colors.red} bottomColor={'#fff'}>
      <View style={[styles.header, {backgroundColor: customTheme.colors.red}]}>
        <Header title={I18n.t('profile.deleteAccount.title')} color={'#fff'} />
      </View>
      <View style={styles.content}>
        <Text style={styles.heading1}>
          {I18n.t('profile.deleteAccount.heading1')}
        </Text>
        <Image
          source={require('../../../assets/images/profile/BubbleSad.png')}
          style={{width: 108, height: 108, alignSelf: 'center', marginTop: 24}}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount={true}
          onSubmit={deleteAccount}>
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
                secure={true}
                onChangeText={handleChange('password')}
                doOnBlur={handleBlur('password')}
                value={values.password}
                editable={!isSubmitting}
                label={I18n.t('profile.deleteAccount.passwordLabel')}
                placeholder={I18n.t(
                  'profile.deleteAccount.passwordPlaceholder',
                )}
                errorMessage={
                  touched.password ? _.upperFirst(errors?.password ?? ' ') : ' '
                }
              />
              <SubmitButton
                onPress={() => handleSubmit()}
                disabled={!isValid}
                loading={isSubmitting}
                buttonStyle={{backgroundColor: customTheme.colors.red}}
                title={I18n.t('profile.deleteAccount.button')}
              />
            </View>
          )}
        </Formik>
      </View>
    </Wrapper>
  );
};
