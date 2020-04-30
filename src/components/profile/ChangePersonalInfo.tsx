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
  name: yup
    .string()
    .required()
    .label(I18n.t('profile.changePersonalInfo.fullName')),
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
      Toast.success('Name changed.');
    } catch (e) {
      Toast.danger(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  initialValues.name = auth.state?.name ?? initialValues.name;

  return (
    <ScrollView>
      <Card title={I18n.t('profile.changePersonalInfo.title')}>
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
            <>
              <Input
                autoCapitalize={'words'}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                editable={!isSubmitting}
                placeholder={I18n.t('profile.changePersonalInfo.fullName')}
                errorMessage={
                  touched.name ? _.upperFirst(errors?.name) : undefined
                }
              />
              <SubmitButton
                onPress={() => handleSubmit()}
                disabled={!isValid}
                isSubmitting={isSubmitting}
                label={I18n.t('profile.changePersonalInfo.save')}
              />
            </>
          )}
        </Formik>
      </Card>
    </ScrollView>
  );
};
