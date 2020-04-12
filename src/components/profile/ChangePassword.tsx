import React from 'react';
import {
  Body,
  Card,
  CardItem,
  Container,
  Content,
  Form,
  Input,
  Item,
  Label,
} from 'native-base';
import {HeaderBackButton, StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import I18n from '../../i18n/';
import {View} from 'react-native';
import {Formik} from 'formik';
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

const validationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required()
    .min(6)
    .label(I18n.t('profile.changePassword.currentPassword')),
  newPassword: yup
    .string()
    .required()
    .min(6)
    .label(I18n.t('profile.changePassword.newPassword')),
  newPasswordConfirmation: yup
    .string()
    .required()
    .min(6)
    .oneOf(
      [yup.ref('newPassword')],
      I18n.t('auth.error.auth/confirmation-mismatch'),
    )
    .label(I18n.t('profile.changePassword.newPasswordConfirmation')),
});
type FormValues = yup.InferType<typeof validationSchema> & {general?: string};
const initialValues: FormValues = {
  currentPassword: '',
  newPassword: '',
  newPasswordConfirmation: '',
};

export type ChangePasswordNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ProfileStackParamsList, Routes.ChangePassword>,
  ProfileNavigatorNavigationProp
>;

export const ChangePassword: React.FC = (): JSX.Element => {
  const navigation = useNavigation<ChangePasswordNavigationProp>();

  navigation.setOptions({
    title: I18n.t('profile.changePassword.title'),
    headerLeft: (props) => (
      <HeaderBackButton
        label={I18n.t('profile.title')}
        onPress={() => navigation.goBack()}
      />
    ),
  });

  const auth = useAuth();

  const changePassword = async (
    {currentPassword, newPassword},
    {setFieldError, setSubmitting},
  ) => {
    try {
      await auth.changePassword(currentPassword, newPassword);
      await Toast.success('Password changed.');
    } catch (e) {
      await Toast.danger(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Content padder>
        <Card>
          <Form>
            <CardItem>
              <Body style={{alignItems: 'stretch'}}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  validateOnMount={true}
                  onSubmit={changePassword}>
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
                        success={!errors.currentPassword}
                        error={
                          touched.currentPassword && !!errors.currentPassword
                        }>
                        <Label>
                          {I18n.t('profile.changePassword.currentPassword')}
                        </Label>
                        <Input
                          autoCapitalize={'none'}
                          secureTextEntry
                          onChangeText={handleChange('currentPassword')}
                          onBlur={handleBlur('currentPassword')}
                          value={values.currentPassword}
                          editable={!isSubmitting}
                        />
                      </Item>
                      <FieldError
                        message={
                          touched.currentPassword && errors?.currentPassword
                        }
                      />
                      <Item
                        stackedLabel
                        success={!errors.currentPassword}
                        error={touched.newPassword && !!errors.newPassword}>
                        <Label>
                          {I18n.t('profile.changePassword.newPassword')}
                        </Label>
                        <Input
                          autoCapitalize={'none'}
                          secureTextEntry
                          onChangeText={handleChange('newPassword')}
                          onBlur={handleBlur('newPassword')}
                          value={values.newPassword}
                          editable={!isSubmitting}
                        />
                      </Item>
                      <FieldError
                        message={touched.newPassword && errors?.newPassword}
                      />
                      <Item
                        stackedLabel
                        last
                        success={!errors.currentPassword}
                        error={
                          touched.newPasswordConfirmation &&
                          !!errors.newPasswordConfirmation
                        }>
                        <Label>
                          {I18n.t(
                            'profile.changePassword.newPasswordConfirmation',
                          )}
                        </Label>
                        <Input
                          autoCapitalize={'none'}
                          secureTextEntry
                          onChangeText={handleChange('newPasswordConfirmation')}
                          onBlur={handleBlur('newPasswordConfirmation')}
                          value={values.newPasswordConfirmation}
                          editable={!isSubmitting}
                        />
                      </Item>
                      <FieldError
                        message={
                          touched.newPasswordConfirmation &&
                          errors?.newPasswordConfirmation
                        }
                      />
                      <SubmitButton
                        onPress={() => handleSubmit()}
                        disabled={!isValid}
                        isSubmitting={isSubmitting}
                        label={I18n.t('profile.changePassword.changePassword')}
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
