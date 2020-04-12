import React from 'react';
import {View} from 'react-native';
import I18n from '../../i18n/';
import {authStyleSheet as styles} from "./Styles";
import {Routes} from "../../nav/Routes";
import {CompositeNavigationProp, RouteProp, useNavigation, useRoute} from "@react-navigation/core";
import {RootNavigationProp} from "../../../App";
import {Formik} from "formik";
import * as yup from "yup";
import {StackNavigationProp} from "@react-navigation/stack";
import {AuthStackParamList} from "./AuthNavigator";
import {ExtraButton} from "../common/ExtraButton";
import {SubmitButton} from "../common/SubmitButton";
import {Title} from "./common/Title";
import {FieldError} from "../common/FieldError";
import {useAuth} from "../../auth/Auth";
import {Container, Content, Form, Input, Item, Label} from "native-base";
import Toast from "../common/Toast";

const validationSchema = yup.object().shape({
    email: yup.string().email().required()
});
type FormValues = yup.InferType<typeof validationSchema>
const initialValues: FormValues = {
    email: '',
};
type ResetPasswordRouteProp = RouteProp<AuthStackParamList, Routes.ResetPassword>;
type ResetPasswordNavigationProp = CompositeNavigationProp<StackNavigationProp<AuthStackParamList, Routes.ResetPassword>, RootNavigationProp>

export const ResetPassword: React.FC = (): JSX.Element => {
    const navigation = useNavigation<ResetPasswordNavigationProp>();
    const auth = useAuth();
    const resetPassword = async ({ email }, { setSubmitting }) => {
        try {
            await auth.resetPassword(email);
        } catch(e) {
            console.log(e);
        } finally {
            setSubmitting(false);
            navigation.replace(Routes.ConfirmResetPassword, { email })
        }
    };
    const route = useRoute<ResetPasswordRouteProp>();
    initialValues.email = route?.params?.email ?? initialValues.email;
    return (
        <Container>
            <Content padder contentContainerStyle={{flex: 1, justifyContent: "center"}}>
            <Title />
            <Form>
            <Formik initialValues={initialValues}
                    validateOnMount={true}
                    validationSchema={validationSchema}
                    onSubmit={resetPassword}>
                {({
                      handleSubmit,
                      handleBlur,
                      handleChange,
                      values,
                      errors,
                      touched,
                      isSubmitting,
                      isValid,
                  }) =>
                    <View style={styles.formContainer}>
                        <Item stackedLabel
                              last
                              success={!errors.email}
                              error={touched.email && !!errors.email}>
                            <Label>{I18n.t('auth.resetPasswordEmailPlaceholder')}</Label>
                            <Input
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                textContentType={"emailAddress"}
                                keyboardType={'email-address'}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                editable={!isSubmitting}
                            />
                        </Item>
                        <FieldError message={touched.email && errors?.email} />
                        <SubmitButton onPress={() => handleSubmit()}
                                      disabled={!isValid}
                                      isSubmitting={isSubmitting}
                                      label={I18n.t('auth.resetPasswordSubmitButtonTitle')} />
                    </View>}
                </Formik>
                <ExtraButton to={Routes.SignIn} label={I18n.t('auth.backToLoginButtonTitle')} />
                </Form>
            </Content>
        </Container>
    )
};