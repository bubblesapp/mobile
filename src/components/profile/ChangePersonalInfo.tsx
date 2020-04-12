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
  name: yup
    .string()
    .required()
    .label(I18n.t('profile.changePersonalInfo.fullName')),
});
type FormValues = yup.InferType<typeof validationSchema>;
const initialValues: FormValues = {
  name: '',
};

export type ChangePersonalInfoNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ProfileStackParamsList, Routes.ChangePersonalInfo>,
  ProfileNavigatorNavigationProp
>;

export const ChangePersonalInfo: React.FC = (): JSX.Element => {
  const navigation = useNavigation<ChangePersonalInfoNavigationProp>();

  navigation.setOptions({
    headerLeft: () => (
      <HeaderBackButton
        label={I18n.t('profile.title')}
        onPress={() => navigation.goBack()}
      />
    ),
    title: I18n.t('profile.changePersonalInfo.title'),
  });

  const auth = useAuth();

  const changeName = async ({name}, {setSubmitting}) => {
    try {
      await auth.changeName(name);
      Toast.success('Name changed.');
    } catch (e) {
      Toast.danger(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  initialValues.name = auth.state?.name ?? initialValues.name;

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
                    <View>
                      <Item
                        stackedLabel
                        success={!errors.name}
                        error={touched.name && !!errors.name}>
                        <Label>
                          {I18n.t('profile.changePersonalInfo.fullName')}
                        </Label>
                        <Input
                          autoCapitalize={'words'}
                          onChangeText={handleChange('name')}
                          onBlur={handleBlur('name')}
                          value={values.name}
                          editable={!isSubmitting}
                        />
                      </Item>
                      <FieldError message={touched.name && errors?.name} />
                      <SubmitButton
                        onPress={() => handleSubmit()}
                        disabled={!isValid}
                        isSubmitting={isSubmitting}
                        label={I18n.t('profile.changePersonalInfo.save')}
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
