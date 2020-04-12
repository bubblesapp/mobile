import {Toast} from "native-base";
import I18n from "../../i18n";

type ToastType =  "success" | "warning" | "danger"
const showToast = (text: string, buttonText: string = I18n.t("closeToast"), duration: number = 3000, type?: ToastType) => Toast.show({
    position: "bottom",
    type,
    text,
    buttonText,
    duration,
});

export default {
    info: (text: string, buttonText?: string, duration?: number) => showToast(text, buttonText, duration),
    success: (text: string, buttonText?: string, duration?: number) => showToast(text, buttonText, duration, "success"),
    warning:(text: string, buttonText?: string, duration?: number) => showToast(text, buttonText, duration, "warning"),
    danger: (text: string, buttonText?: string, duration?: number) => showToast(text, buttonText, duration, "danger"),
}