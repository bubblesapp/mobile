import React from 'react';
import I18n from '../../../services/i18n';
import {Formik} from 'formik';
import * as yup from 'yup';
import {SubmitButton} from '../../common/SubmitButton';
import {useAuth} from '../../../services/auth/useAuth';
import _ from 'lodash';
import {Text, View} from 'react-native';
import {useToast} from '../../common/Toast';
import {customTheme} from '../../theme';
import {profileStyles as styles} from './Styles';
import {Header} from './Header';
import {Input} from '../../common/Input';
import {Wrapper} from '../../common/Wrapper';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .label(I18n.t('profile.changePersonalInfo.usernameLabel')),
});
type FormValues = yup.InferType<typeof validationSchema>;
const initialValues: FormValues = {
  name: '',
};

export const ChangePersonalInfo: React.FC = (): JSX.Element => {
  const auth = useAuth();
  const Toast = useToast();

  const changeName = async ({name}: FormValues, {setSubmitting}) => {
    try {
      await auth.changeName(name);
      Toast.success(I18n.t('profile.changePersonalInfo.success'));
    } catch (e) {
      Toast.danger(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  initialValues.name = auth.state?.name ?? initialValues.name;

  return (
    <Wrapper topColor={customTheme.colors.lightBlue} bottomColor={'#fff'}>
      <View style={styles.header}>
        <Header title={I18n.t('profile.changePersonalInfo.title')} />
      </View>
      <View style={styles.content}>
        <Text style={styles.heading1}>
          {I18n.t('profile.changePersonalInfo.heading1')}
        </Text>
        <Text style={styles.heading2}>
          {I18n.t('profile.changePersonalInfo.heading2')}
        </Text>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount={true}
          onSubmit={changeName}>
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
                autoCapitalize={'words'}
                onChangeText={handleChange('name')}
                doOnBlur={handleBlur('name')}
                value={values.name}
                editable={!isSubmitting}
                label={I18n.t('profile.changePersonalInfo.usernameLabel')}
                placeholder={I18n.t(
                  'profile.changePersonalInfo.usernamePlaceholder',
                )}
                errorMessage={
                  touched.name ? _.upperFirst(errors?.name ?? ' ') : ' '
                }
              />
              <SubmitButton
                onPress={() => handleSubmit()}
                disabled={!isValid}
                loading={isSubmitting}
                title={I18n.t('profile.changePersonalInfo.button')}
              />
            </View>
          )}
        </Formik>
      </View>
    </Wrapper>
  );
};
