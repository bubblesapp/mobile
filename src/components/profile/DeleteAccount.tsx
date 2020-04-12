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
  password: yup.string().required().min(6),
});
type FormValues = yup.InferType<typeof validationSchema>;
const initialValues: FormValues = {
  password: '',
};

export type DeleteAccountNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ProfileStackParamsList, Routes.DeleteAccount>,
  ProfileNavigatorNavigationProp
>;

export const DeleteAccount: React.FC = (): JSX.Element => {
  const navigation = useNavigation<DeleteAccountNavigationProp>();

  navigation.setOptions({
    headerLeft: () => (
      <HeaderBackButton
        label={I18n.t('profile.title')}
        onPress={() => navigation.goBack()}
      />
    ),
    title: I18n.t('profile.deleteAccount.title'),
  });

  const auth = useAuth();

  const deleteAccount = async ({password}, {setSubmitting}) => {
    try {
      await auth.deleteUser(password);
    } catch (e) {
      await Toast.danger(e.message);
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
                    <View>
                      <Item
                        stackedLabel
                        success={!errors.password}
                        error={touched.password && !!errors.password}>
                        <Label>
                          {I18n.t('profile.deleteAccount.password')}
                        </Label>
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
                      <SubmitButton
                        onPress={() => handleSubmit()}
                        disabled={!isValid}
                        isSubmitting={isSubmitting}
                        danger
                        label={I18n.t('profile.deleteAccount.deleteAccount')}
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
