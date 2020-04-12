import React from 'react';
import {View} from 'react-native';
import * as yup from 'yup';
import I18n from '../../i18n';
import {
  Body,
  Card,
  CardItem,
  Form,
  Input,
  Item,
  Label,
  Text,
} from 'native-base';
import {Formik} from 'formik';
import {FieldError} from '../common/FieldError';
import {SubmitButton} from '../common/SubmitButton';
import {useAPI} from '../../api/useAPI';
import Toast from '../common/Toast';
import {useNetInfo} from '@react-native-community/netinfo';

const newInviteValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email()
    .label(I18n.t('bubble.newInvite.emailLabel')),
});
type NewInviteFormValues = yup.InferType<typeof newInviteValidationSchema>
const newInviteInitialValues: NewInviteFormValues = {
  email: '',
};

export const NewOutgoingInvite: React.FC = () => {
  const API = useAPI();
  const netInfo = useNetInfo();

  const invite = async ({email}, {setSubmitting}) => {
    try {
      setSubmitting(true);
      if (netInfo.isInternetReachable) {
        await API.invite(email);
      } else {
        API.invite(email).catch(async (err) => {
          if (err) {
            // Rollback
            await API.cancelInvite(email);
          }
        });
      }
      Toast.success(I18n.t('bubble.newInvite.inviteSent'));
      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
      Toast.danger(err.message);
    }
  };

  return (
    <Card>
      <CardItem header>
        <Text>{I18n.t('bubble.newInvite.title')}</Text>
      </CardItem>
      <Form>
        <CardItem>
          <Body style={{alignItems: 'stretch'}}>
            <Formik
              initialValues={newInviteInitialValues}
              validationSchema={newInviteValidationSchema}
              validateOnMount={false}
              onSubmit={invite}>
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
                    success={!errors.email}
                    error={touched.email && !!errors.email}>
                    <Label>{I18n.t('bubble.newInvite.emailLabel')}</Label>
                    <Input
                      autoCapitalize={'none'}
                      autoCorrect={false}
                      textContentType={'emailAddress'}
                      keyboardType={'email-address'}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      editable={!isSubmitting}
                    />
                  </Item>
                  <FieldError message={touched.email && errors?.email} />
                  <SubmitButton
                    onPress={() => handleSubmit()}
                    disabled={!isValid}
                    isSubmitting={isSubmitting}
                    label={I18n.t('bubble.newInvite.buttonLabel')} />
                </View>
              )}
            </Formik>
          </Body>
        </CardItem>
      </Form>
    </Card>
  );
};
