import React, {useState} from 'react';
import {
  Badge,
  Body,
  Card,
  CardItem,
  Container,
  Content,
  Form,
  Input,
  Item,
  Label,
  Text,
} from 'native-base';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import I18n from '../../i18n/';
import {View} from 'react-native';
import {Formik, FormikProps} from 'formik';
import * as yup from 'yup';
import {FieldError} from '../common/FieldError';
import {SubmitButton} from '../common/SubmitButton';
import Toast from '../common/Toast';
import {CompositeNavigationProp} from '@react-navigation/core';
import {
  ProfileNavigatorNavigationProp,
  ProfileStackParamsList,
} from './ProfileNavigator';
import {Routes} from '../../nav/Routes';
import {useAuth} from '../../auth/Auth';

const emailChangeValidationSchema = yup.object().shape({
  newEmail: yup
    .string()
    .required()
    .email()
    .label(I18n.t('profile.changeEmail.newEmail')),
  password: yup
    .string()
    .required()
    .label(I18n.t('profile.changeEmail.password')),
});
type EmailChangeFormValues = yup.InferType<typeof emailChangeValidationSchema>;
const emailChangeInitialValues: EmailChangeFormValues = {
  newEmail: '',
  password: '',
};

export type ChangeEmailNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ProfileStackParamsList, Routes.ChangeEmail>,
  ProfileNavigatorNavigationProp
>;

export const ChangeEmail: React.FC = (): JSX.Element => {
  const navigation = useNavigation<ChangeEmailNavigationProp>();

  navigation.setOptions({
    title: I18n.t('profile.changeEmail.title'),
  });

  const auth = useAuth();

  /* const verifyEmail = async (
    {code},
    {setSubmitting}: FormikProps<EmailVerificationFormValues>,
  ) => {
    try {
      await auth.verifyEmail(code);
      Toast.info(I18n.t('profile.verifyEmail.emailVerified'));
    } catch (e) {
      Toast.danger(e.message);
      setSubmitting(false);
    }
  };

  const [isRequestingCode, setIsRequestingCode] = useState(false);

  const requestEmailVerificationCode = async () => {
    try {
      setIsRequestingCode(true);
      await auth.requestEmailVerificationCode();
      await Toast.info(I18n.t('profile.verifyEmail.codeEmailed'));
    } catch (e) {
      await Toast.danger(e.message);
    } finally {
      setIsRequestingCode(false);
    }
  }; */

  const changeEmail = async (
    {newEmail, password}: EmailChangeFormValues,
    {setSubmitting, resetForm}: FormikProps<EmailChangeFormValues>,
  ) => {
    try {
      await auth.changeEmail(newEmail, password);
      Toast.info(I18n.t('profile.verifyEmail.codeEmailed'));
      resetForm();
    } catch (e) {
      console.log(e);
      Toast.danger(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const {email} = auth.state;
  return (
    <Container>
      <Content padder>
        <Card>
          <CardItem header>
            <Text>Email address </Text>
            {/*emailVerified ? (
              <Badge success>
                <Text>Verified</Text>
              </Badge>
            ) : (
              <Badge warning>
                <Text>Unverified</Text>
              </Badge>
            )*/}
          </CardItem>
          <CardItem>
            <Text>{email}</Text>
          </CardItem>
        </Card>
        <Card>
          <CardItem header>
            <Text>{I18n.t('profile.changeEmail.changeEmail')}</Text>
          </CardItem>
          <Form>
            <CardItem>
              <Body style={{alignItems: 'stretch'}}>
                <Formik
                  initialValues={emailChangeInitialValues}
                  validationSchema={emailChangeValidationSchema}
                  validateOnMount={true}
                  onSubmit={changeEmail}>
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
                    <View>
                      <Item
                        stackedLabel
                        success={!errors.newEmail}
                        error={touched.newEmail && !!errors.newEmail}>
                        <Label>{I18n.t('profile.changeEmail.newEmail')}</Label>
                        <Input
                          autoCapitalize={'none'}
                          autoCorrect={false}
                          textContentType={'emailAddress'}
                          keyboardType={'email-address'}
                          onChangeText={handleChange('newEmail')}
                          onBlur={handleBlur('newEmail')}
                          value={values.newEmail}
                          editable={!isSubmitting}
                        />
                      </Item>
                      <FieldError
                        message={touched.newEmail && errors?.newEmail}
                      />
                      <Item
                        stackedLabel
                        last
                        success={!errors.password}
                        error={touched.password && !!errors.password}>
                        <Label>{I18n.t('profile.changeEmail.password')}</Label>
                        <Input
                          autoCapitalize={'none'}
                          secureTextEntry
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          value={values.password}
                          editable={!isSubmitting}
                        />
                      </Item>
                      <FieldError
                        message={touched.password && errors?.password}
                      />
                      <Text note>
                        {I18n.t('profile.changeEmail.passwordNote')}
                      </Text>
                      <SubmitButton
                        onPress={() => handleSubmit()}
                        disabled={!isValid}
                        isSubmitting={isSubmitting}
                        label={I18n.t('profile.changeEmail.changeEmail')}
                      />
                    </View>
                  )}
                </Formik>
              </Body>
            </CardItem>
          </Form>
        </Card>
      </Content>
    </Container>
  );
};
