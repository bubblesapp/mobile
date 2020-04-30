import React from 'react';
import I18n from '../../i18n/';
import {Formik} from 'formik';
import * as yup from 'yup';
import {SubmitButton} from '../common/SubmitButton';
import {useAuth} from '../../auth/Auth';
import {Card, Input} from 'react-native-elements';
import _ from 'lodash';
import {ScrollView} from 'react-native';
import {useToast} from '../Toast';

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
    <ScrollView>
      <Card title={I18n.t('profile.deleteAccount.title')}>
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
            <>
              <Input
                autoCapitalize={'none'}
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                editable={!isSubmitting}
                placeholder={I18n.t('profile.deleteAccount.password')}
                errorMessage={
                  touched.password ? _.upperFirst(errors?.password) : undefined
                }
              />
              <SubmitButton
                onPress={() => handleSubmit()}
                disabled={!isValid}
                isSubmitting={isSubmitting}
                label={I18n.t('profile.deleteAccount.deleteAccount')}
              />
            </>
          )}
        </Formik>
      </Card>
    </ScrollView>
  );
};
