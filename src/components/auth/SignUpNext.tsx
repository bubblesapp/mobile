import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import I18n from '../../i18n/';
import {authStyleSheet, authStyleSheet as styles} from './Styles';
import {Routes} from '../../nav/NavProvider';
import {Formik} from 'formik';
import * as yup from 'yup';
import {SubmitButton} from '../common/SubmitButton';
import {Title} from './common/Title';
import {useAuth} from '../../auth/Auth';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import {Template} from '../common/Template';
import {Input} from '../common/Input';
import assets from '../../assets';

const validationSchema = yup.object().shape({
  name: yup.string().label(I18n.t('auth.signUpNameLabel')).required(),
});
type FormValues = yup.InferType<typeof validationSchema>;
const initialValues: FormValues = {
  name: '',
};

export const SignUpNext: React.FC = (): JSX.Element => {
  const nav = useNavigation();
  const auth = useAuth();
  const setName = async ({name}: FormValues, {setSubmitting}) => {
    try {
      await auth.changeName(name);
      setSubmitting(false);
      //nav.navigate(Routes.ConfirmSignUp);
    } catch (e) {
      console.log(e);
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
          <View style={authStyleSheet.columnText}>
            <Text style={authStyleSheet.heading1}>
              {I18n.t('auth.signUpNextTitle')}
            </Text>
            <Text style={[authStyleSheet.heading2, {marginTop: 16}]}>
              {I18n.t('auth.signUpNextSubtitle')}
            </Text>
          </View>
          <Formik
            initialValues={initialValues}
            validateOnMount={true}
            validationSchema={validationSchema}
            isInitialValid={false}
            onSubmit={setName}>
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
                  onChangeText={handleChange('name')}
                  doOnBlur={handleBlur('name')}
                  value={values.name}
                  editable={!isSubmitting}
                  label={I18n.t('auth.signUpNameLabel')}
                  placeholder={I18n.t('auth.signUpNamePlaceholder')}
                  errorMessage={
                    touched.name ? _.upperFirst(errors?.name || ' ') : ' '
                  }
                  tooltip={I18n.t('auth.signUpNameDataInfo')}
                />
                <SubmitButton
                  containerStyle={{marginBottom: 24}}
                  onPress={() => handleSubmit()}
                  disabled={!isValid}
                  loading={isSubmitting}
                  title={I18n.t('auth.signUpContinue')}
                />
              </View>
            )}
          </Formik>
        </>
      }
    />
  );
};
