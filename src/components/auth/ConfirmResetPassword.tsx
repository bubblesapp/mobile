import React from 'react';
import {View} from 'react-native';
import I18n from '../../i18n/';
import {authStyleSheet as styles} from "./Styles";
import {Routes} from "../../nav/Routes";
import * as yup from "yup";
import {RouteProp, useRoute} from "@react-navigation/core";
import {AuthStackParamList} from "./AuthNavigator";
import {Formik} from "formik";
import {ExtraText} from "./common/ExtraText";
import {ExtraButton} from "../common/ExtraButton";
import {SubmitButton} from "../common/SubmitButton";
import {Title} from "./common/Title";
import {InfoText} from "./common/InfoText";
import {FieldError} from "../common/FieldError";
import {useAuth} from "../../auth/Auth";
import {Container, Content, Form, Input, Item, Label} from "native-base";
import Toast from "../common/Toast";

const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    code: yup.string().required().label("Confirmation code"),
    password: yup.string().required().min(6),
    passwordConfirmation: yup.string()
        .required()
        .min(6)
        .oneOf([yup.ref('password')], I18n.t('auth.error.auth/confirmation-mismatch'))
        .label("Password confirmation")
});
type FormValues = yup.InferType<typeof validationSchema>
const initialValues: FormValues = {
    email: '',
    code: '',
    password: '',
    passwordConfirmation: '',
};
type ConfirmResetPasswordRouteProp = RouteProp<AuthStackParamList, Routes.ConfirmResetPassword>;

export const ConfirmResetPassword: React.FC = (): JSX.Element => {
    const auth = useAuth();
    const confirmResetPassword = async ({email, code, password, passwordConfirmation}: FormValues, {setSubmitting}) => {
        try {
            await auth.confirmResetPassword(email, code, password);
            await auth.signIn(email, password);
            setSubmitting(false);
        } catch (e) {
            setSubmitting(false);
            Toast.danger(e.message)
        }
    };
    const route = useRoute<ConfirmResetPasswordRouteProp>();
    initialValues.email = route?.params?.email ?? initialValues.email;
    return (
        <Container>
            <Content padder contentContainerStyle={{flex: 1, justifyContent: "center"}}>
                <Title/>
                <InfoText>{I18n.t('auth.confirmResetPasswordText')}</InfoText>
                <Form>
                <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        validateOnMount={true}
                        onSubmit={confirmResetPassword}>
                    {({
                          handleSubmit,
                          handleBlur,
                          handleChange,
                          values,
                          errors,
                          touched,
                          isValid,
                          isSubmitting,
                      }) =>
                        <View style={styles.formContainer}>
                            <Item stackedLabel
                                  last
                                  success={!errors.code}
                                  error={touched.code && !!errors.code}>
                                <Label>{I18n.t('auth.confirmResetPasswordCodePlaceholder')}</Label>
                                <Input
                                    autoCapitalize={'none'}
                                    secureTextEntry
                                    onChangeText={handleChange('code')}
                                    onBlur={handleBlur('code')}
                                    value={values.code}
                                    editable={!isSubmitting}
                                />
                            </Item>
                            <FieldError message={touched.code && errors?.code}/>

                            <Item stackedLabel
                                  last
                                  success={!errors.password}
                                  error={touched.password && !!errors.password}>
                                <Label>{I18n.t('auth.confirmResetPasswordNewPasswordPlaceholder')}</Label>
                                <Input
                                    autoCapitalize={'none'}
                                    secureTextEntry
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                            </Item>
                            <FieldError message={touched.password && errors?.password}/>

                            <Item stackedLabel
                                  last
                                  success={!errors.passwordConfirmation}
                                  error={touched.passwordConfirmation && !!errors.passwordConfirmation}>
                                <Label>{I18n.t('auth.confirmResetPasswordNewPasswordConfirmationPlaceholder')}</Label>
                                <Input
                                    autoCapitalize={'none'}
                                    secureTextEntry
                                    onChangeText={handleChange('passwordConfirmation')}
                                    onBlur={handleBlur('passwordConfirmation')}
                                    value={values.passwordConfirmation}
                                />
                            </Item>
                            <FieldError message={touched.passwordConfirmation && errors?.passwordConfirmation}/>

                            <SubmitButton
                                onPress={() => handleSubmit()}
                                disabled={!isValid}
                                isSubmitting={isSubmitting}
                                label={I18n.t('auth.confirmResetPasswordSubmitButtonTitle')}/>
                            <ExtraText>{I18n.t('auth.codeNotReceived')}</ExtraText>
                            <ExtraButton to={Routes.ResetPassword} params={{email: values.email}} label={I18n.t('auth.confirmResetPasswordTryAgainButtonTitle')}/>

                        </View>}
                </Formik>
                    <ExtraButton to={Routes.SignIn} label={I18n.t('auth.backToLoginButtonTitle')}/>
                </Form>
            </Content>
        </Container>
    )
};