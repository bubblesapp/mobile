export type Locale = {
  title: string;
  dataInfo: string;
  responsiveContainer: {
    leftSubtitle: string;
    leftButton: string;
    rightTip: string;
    rightInstall: string;
  };
  update: {
    text: string;
    cta: string;
  };
  onboarding: {
    login: string;
    signUp: string;
    screen1: {
      heading1: string;
      heading2: string;
    };
    screen2: {
      heading1: string;
      heading2: string;
    };
    screen3: {
      heading1: string;
      heading2: string;
    };
  };
  auth: {
    loginEmailLabel: string;
    loginEmailPlaceholder: string;
    loginPasswordLabel: string;
    loginPasswordPlaceholder: string;
    loginRemember: string;
    loginButtonTitle: string;
    noAccountYet: string;
    noAccountYetAction: string;
    backToLoginButtonTitle: string;
    signUpButtonTitle: string;
    signUpNameLabel: string;
    signUpNamePlaceholder: string;
    signUpNameDataInfo: string;
    signUpEmailLabel: string;
    signUpEmailPlaceholder: string;
    signUpEmailDataInfo: string;
    signUpPasswordLabel: string;
    signUpPasswordPlaceholder: string;
    signUpAgreeToTerms: string;
    signUpAgreeToTermsLink: string;
    signUpContinue: string;
    signUpNextTitle: string;
    signUpNextSubtitle: string;
    alreadyHaveAccount: string;
    alreadyHaveAccountAction: string;
    cancel: string;
    close: string;
    welcomeText: string;
    emailVerificationLoading: string;
    emailVerificationSuccess: string;
    emailRestorationLoading: string;
    emailRestorationSuccess: string;
    confirmAccountText: string;
    confirmAccountText2: string;
    confirmSignUpEmailPlaceholder: string;
    confirmSignUpResendCodeButtonTitle: string;
    confirmSignUpCodeResent: string;
    confirmSignUpSomethingWrong: string;
    forgotPassword: string;
    passwordResetEmailSentTitle: string;
    passwordResetEmailSentText: string;
    passwordResetEmailSentResendButtonTitle: string;
    resetPasswordButtonTitle: string;
    resetPasswordEmailLabel: string;
    resetPasswordEmailPlaceholder: string;
    resetPasswordSubmitButtonTitle: string;
    resetPasswordNewPasswordLabel: string;
    resetPasswordNewPasswordPlaceholder: string;
    chooseNewPassword: string;
    resetPasswordSuccess: string;
    backToLogin: string;
    codeNotReceived: string;
  };
  bubble: {
    title: string;
    takeCare: string;
    recommendationsButton: string;
    bubbleTitle: string;
    noAlert: string;
    xAlerts: string;
    sendAlert: string;
    invites: {
      title: string;
      linkLabel: string;
      linkInstructions: string;
      copyButton: string;
      copiedToClipboard: string;
      clipboardError: string;
      shareMessageTitle: string;
      shareMessageContent: string;
      shareButton: string;
      tapToRespond: string;
      awaitingResponse: string;
      accept: string;
      decline: string;
      cancel: string;
      acceptSuccess: string;
      inviteSent: string;
    };
    friends: {
      title: string;
      whenDidYouLastMeet: string;
      notMetYet: string;
      removeFriend: string;
      lastMet: string;
      lastMetToday: string;
      lastMetYesterday: string;
      lastMetXDaysAgo: string;
      emptyText: string;
      emptyButtonTitle: string;
      deleteFriendSuccess: string;
      today: string;
      yesterday: string;
      xDaysAgo: string;
      dayPickerFormat: string;
      logTitle: string;
      logQuestion: string;
      logExplanation: string;
      logButton: string;
    };
    alerts: {
      emptyText: string;
      title: string;
      newAlertTitle: string;
      newAlertSubtitle: string;
      newAlertWho: string;
      newAlertContinueButton: string;
      newAlertOpenMailApp: string;
      newAlertWhy: string;
      newAlertQA: string;
      newAlertHow: string;
      newAlertMessageLabel: string;
      newAlertMessagePlaceholder: string;
      newAlertSendButton: string;
      recentFriendsTitle: string;
      recentFriendsSubtitle: string;
      alertsHeaderTitle: string;
      alertsHeaderSubtitle: string;
      alertSent: string;
      deleteButton: string;
      deleteSuccess: string;
      detailsTitle: string;
      detailsDate: string;
      detailsDateFormat: string;
      detailsCloseButton: string;
      detailsDeleteButton: string;
    };
  };
  profile: {
    title: string;
    //credentials: 'Credentials',
    personalInfo: string;
    notifications: string;
    pushNotifications: string;
    emailNotifications: string;
    comingSoon: string;
    //account: 'Account',
    version: string;
    upToDate: string;
    updateAvailable: string;
    updateButton: string;
    logout: string;
    delete: string;
    email: string;
    password: string;
    username: string;
    passwordNote: string;
    helpTitle: string;
    helpSubtitle: string;
    changeEmail: {
      title: string;
      heading1: string;
      heading2: string;
      newEmailLabel: string;
      newEmailPlaceholder: string;
      button: string;
      passwordLabel: string;
      passwordPlaceholder: string;
    };
    changePassword: {
      title: string;
      heading1: string;
      button: string;
      currentPasswordLabel: string;
      currentPasswordPlaceholder: string;
      newPasswordLabel: string;
      newPasswordPlaceholder: string;
      success: string;
    };
    changePersonalInfo: {
      title: string;
      heading1: string;
      heading2: string;
      usernameLabel: string;
      usernamePlaceholder: string;
      button: string;
      success: string;
    };
    deleteAccount: {
      title: string;
      button: string;
      heading1: string;
      passwordLabel: string;
      passwordPlaceholder: string;
    };
    legalInfo: {
      title: string;
      terms: string;
      privacy: string;
      legalNotice: string;
    };
    verifyEmail: {
      title: string;
      verifyEmail: string;
      emailVerified: string;
    };
  };
  closeToast: string;
};
