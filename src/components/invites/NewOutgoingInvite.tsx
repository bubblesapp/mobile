import React from 'react';
import {View} from 'react-native';
import * as yup from 'yup';
import I18n from '../../i18n';
import {Formik} from 'formik';
import {SubmitButton} from '../common/SubmitButton';
import {useAPI} from '../../api/useAPI';
import Toast from '../common/Toast';
import {Card, Input} from 'react-native-elements';
import _ from 'lodash';

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

  const invite = async ({email}: NewInviteFormValues, {setSubmitting}) => {
    try {
      setSubmitting(true);
      await API.invites.invite(email);
      Toast.success(I18n.t('bubble.newInvite.inviteSent'));
      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
      Toast.danger(err.message);
    }
  };

  return (
    <Card title={I18n.t('bubble.newInvite.title')}>
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
            <Input
              autoCapitalize={'none'}
              autoCorrect={false}
              textContentType={'emailAddress'}
              keyboardType={'email-address'}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              editable={!isSubmitting}
              placeholder={I18n.t('bubble.newInvite.emailLabel')}
              errorMessage={
                touched.email ? _.upperFirst(errors?.email) : undefined
              }
            />
            <SubmitButton
              onPress={() => handleSubmit()}
              disabled={!isValid}
              isSubmitting={isSubmitting}
              label={I18n.t('bubble.newInvite.buttonLabel')}
            />
          </View>
        )}
      </Formik>
    </Card>
  );
};
