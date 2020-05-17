import {Locale} from './Locale';

export const en: Locale = {
  title: 'Bubbles',
  dataInfo: 'Why do we need this?',
  responsiveContainer: {
    leftSubtitle: 'Safely get your social life back.',
    leftButton: 'Learn more',
    rightTip: 'Tip',
    rightInstall: 'Install Bubbles on your computer',
  },
  onboarding: {
    login: 'Log In',
    signUp: 'Sign Up',
    screen1: {
      heading1: 'Create your Bubble',
      heading2: "Using your e-mail, it's just three clicks away",
    },
    screen2: {
      heading1: 'Take care of your Bubble',
      heading2: 'Log your contacts',
    },
    screen3: {
      heading1: 'Warn and be warned',
      heading2: 'Send an alert to the right people in case of risk',
    },
  },
  auth: {
    loginEmailLabel: 'Email',
    loginEmailPlaceholder: 'hello@bubblesapp.org',
    loginPasswordLabel: 'Password',
    loginPasswordPlaceholder: '••••••••••••',
    loginRemember: 'Remember me',
    loginButtonTitle: 'Log in to your Bubble',
    noAccountYet: 'No Bubble yet?',
    noAccountYetAction: 'Set it up',
    backToLoginButtonTitle: 'Back to Login',
    signUpButtonTitle: 'Setup your Bubble',
    signUpNameLabel: 'Username',
    signUpNamePlaceholder: 'John',
    signUpNameDataInfo:
      'Your username is used to:\n - help people in your Bubble identify you,\n' +
      '- personalize notifications from the app.\n\n' +
      'It is stored according to our Privacy Policy as long as your account exists.',
    signUpEmailLabel: 'Email',
    signUpEmailPlaceholder: 'hello@bubblesapp.org',
    signUpEmailDataInfo:
      'Your email is used to:\n - identify your account,\n' +
      '- receive anonymous alerts from people in your Bubble,\n ' +
      '- receive notifications from the app.\n\n' +
      'It is stored according to our Privacy Policy as long as your account exists.',
    signUpPasswordLabel: 'Password',
    signUpPasswordPlaceholder: '••••••••••••',
    signUpAgreeToTerms: ' I agree to ',
    signUpAgreeToTermsLink: 'Terms & Conditions',
    signUpContinue: 'Continue',
    alreadyHaveAccount: 'Already have a Bubble?',
    alreadyHaveAccountAction: 'Log in',
    signUpNextTitle: 'We are setting it up...',
    signUpNextSubtitle: 'In the meantime, make yourself at home.',
    cancel: 'Cancel',
    close: 'Close',
    welcomeText: 'Welcome $0!',
    emailVerificationLoading: 'Verifying your email...',
    emailVerificationSuccess: 'Email verified successfully.',
    emailRestorationLoading: 'Restoring your email...',
    emailRestorationSuccess: 'Email restored successfully.',
    confirmAccountText: "We've emailed a verification link to:",
    confirmAccountText2: 'Please click it to confirm your account.',
    confirmSignUpEmailPlaceholder: 'Email address',
    confirmSignUpResendCodeButtonTitle: 'Resend link',
    confirmSignUpCodeResent: 'Link resent.',
    confirmSignUpSomethingWrong: 'Something wrong?',
    forgotPassword: 'Forgot password?',
    passwordResetEmailSentTitle: "We've emailed a link to",
    passwordResetEmailSentText: 'Please click it to reset your password.',
    passwordResetEmailSentResendButtonTitle: 'Resend link',
    resetPasswordButtonTitle: 'Reset password',
    resetPasswordEmailLabel: 'Email',
    resetPasswordEmailPlaceholder: 'hello@bubblesapp.org',
    resetPasswordSubmitButtonTitle: 'Reset password',
    resetPasswordNewPasswordLabel: 'New password',
    resetPasswordNewPasswordPlaceholder: '••••••••••••',
    chooseNewPassword: 'Choose a new password',
    resetPasswordSuccess: 'Password reset successfully.',
    backToLogin: 'Back to log in',
    codeNotReceived: 'Link not received? - Check spam folder',
  },
  bubble: {
    title: 'Bubble',
    takeCare: 'Take care of your Bubble',
    recommendationsButton: 'View recommendations',
    bubbleTitle: "$0's Bubble",
    noAlert: 'No alerts',
    xAlerts: '$0 alert(s)',
    sendAlert: 'Send an alert',
    invites: {
      title: 'Invite someone',
      linkLabel: 'Your Bubble link',
      linkInstructions: 'Share this link to invite someone to your Bubble ',
      copyButton: 'Copy',
      copiedToClipboard: 'Link copied to clipboard.',
      clipboardError: 'Failed to copy link.',
      shareMessageTitle: 'Join my Bubble',
      shareMessageContent:
        "Join my Bubble and let's help each other stay safe. $0",
      shareButton: 'Share',
      tapToRespond: 'Incoming invite',
      awaitingResponse: 'Invitation pending...',
      accept: 'Accept',
      decline: 'Decline',
      cancel: 'Cancel',
      acceptSuccess: 'User joined your bubble.',
      inviteSent: 'Invite sent successfully.',
    },
    friends: {
      title: 'People',
      whenDidYouLastMeet: 'When did you last meet?',
      notMetYet: 'Not met recently',
      removeFriend: 'Remove',
      lastMet: 'Last met',
      lastMetToday: 'Last met today',
      lastMetYesterday: 'Last met yesterday',
      lastMetXDaysAgo: 'Last met $0 days ago',
      emptyText: "You're alone here",
      emptyButtonTitle: 'Invite Someone',
      deleteFriendSuccess: 'Friend removed.',
      today: 'today',
      yesterday: 'yesterday',
      xDaysAgo: '$0 days ago',
      dayPickerFormat: 'dddd, MMM D',
      logTitle: 'Save a close contact',
      logQuestion: 'When did you last meet with $0?',
      logExplanation: 'It will help you warn the right people in case of risk',
      logButton: 'Save',
    },
    alerts: {
      emptyText: 'All good',
      title: 'Alerts',
      newAlertTitle: 'New Bubble Alert',
      newAlertSubtitle: 'Anonymous',
      newAlertWho: 'Who do you want to warn?',
      newAlertContinueButton: 'Continue',
      newAlertOpenMailApp: 'Open Mail App',
      newAlertWhy: "What's the reason?",
      newAlertQA: 'Alerting FAQ',
      newAlertHow: 'How to write a useful alert',
      newAlertMessageLabel: 'Characters left: $0',
      newAlertMessagePlaceholder: 'Alert message...',
      newAlertSendButton: 'Send',
      recentFriendsTitle: 'Everyone you met recently',
      recentFriendsSubtitle: 'Less than $0 days ago',
      alertsHeaderTitle: 'Showing only recent alerts.',
      alertsHeaderSubtitle: 'Alerts older than 21 days are deleted.',
      alertSent: 'Alert sent successfully',
      deleteButton: 'Delete',
      deleteSuccess: 'Alert deleted successfully',
      detailsTitle: 'Bubble Alert',
      detailsDate: 'Received $0 ($1)',
      detailsDateFormat: 'dddd, MMM D',
      detailsCloseButton: 'Close',
      detailsDeleteButton: 'Delete',
    },
  },
  profile: {
    title: 'Profile',
    //credentials: 'Credentials',
    personalInfo: 'Personal Info',
    notifications: 'Notifications',
    pushNotifications: 'Push notifications',
    emailNotifications: 'Email notifications',
    comingSoon: 'Coming soon',
    //account: 'Account',
    version: 'Version $0',
    upToDate: 'Application up to date',
    updateAvailable: '$0 available',
    updateButton: 'Update',
    logout: 'Log out',
    delete: 'Delete account',
    email: 'Email',
    password: 'Password',
    username: 'Username',
    passwordNote: 'Password required for security reasons.',
    helpTitle: 'Any question, feedback?',
    helpSubtitle: 'hello@bubblesapp.org ou chat',
    changeEmail: {
      title: 'Email',
      heading1: 'Change your email',
      heading2: 'A verification link will be sent',
      newEmailLabel: 'New email',
      newEmailPlaceholder: 'hello@bubblesapp.org',
      button: 'Send verification link',
      passwordLabel: 'Current password',
      passwordPlaceholder: '••••••••••••',
    },
    changePassword: {
      title: 'Password',
      heading1: 'Change your password',
      button: 'Change password',
      currentPasswordLabel: 'Current password',
      currentPasswordPlaceholder: '••••••••••••',
      newPasswordLabel: 'New password',
      newPasswordPlaceholder: '••••••••••••',
      success: 'Password changed',
    },
    changePersonalInfo: {
      title: 'Username',
      heading1: 'Change your username',
      heading2: 'People in your Bubble see this',
      usernameLabel: 'Username',
      usernamePlaceholder: 'Username',
      button: 'Change username',
      success: 'Username changed',
    },
    deleteAccount: {
      title: 'Delete Account',
      button: 'Delete account',
      heading1: 'Leave your Bubble?',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••••••',
    },
    legalInfo: {
      title: 'Legal',
      terms: 'Terms & conditions',
      privacy: 'Privacy policy',
      legalNotice: 'Legal notice',
    },
    verifyEmail: {
      title: 'Verify Email',
      verifyEmail: 'Verify email',
      emailVerified: 'Email verified.',
    },
  },
  closeToast: 'Close',
};
