import {Locale} from './Locale';

export const fr: Locale = {
  title: 'Bubbles',
  dataInfo: 'Pourquoi ?',
  responsiveContainer: {
    leftSubtitle: 'La bulle qui compte pour vous',
    leftButton: "Qu'est-ce que Bubbles ?",
    rightTip: 'Astuce',
    rightInstall: 'Installez Bubbles sur votre ordinateur',
  },
  onboarding: {
    screen1: {
      heading1: 'Créez votre Bulle',
      heading2: 'Agrandissez-là progressivement',
    },
    screen2: {
      heading1: 'Suivez vos contacts',
      heading2: 'Enregistrez vos rencontres',
    },
    screen3: {
      heading1: 'Alertez et soyez alerté',
      heading2: 'Envoyez un message anonyme si nécessaire',
    },
  },
  auth: {
    loginEmailLabel: 'E-mail',
    loginEmailPlaceholder: 'hello@bubblesapp.org',
    loginPasswordLabel: 'Mot de passe',
    loginPasswordPlaceholder: '••••••••••••',
    loginRemember: 'Se souvenir de moi',
    loginButtonTitle: 'Se connecter',
    noAccountYet: 'Pas encore de Bulle ?',
    noAccountYetAction: 'Créez-là',
    backToLoginButtonTitle: 'Retour',
    signUpButtonTitle: 'Créez votre Bulle',
    signUpNameLabel: 'Pseudonyme',
    signUpNamePlaceholder: 'Manu',
    signUpNameDataInfo:
      'Votre pseudonyme permet:\n - aux personnes de votre Bulle de vous identifier,\n' +
      '- la personalisation des notifications.\n\n' +
      'Il est stocké en accord avec notre politique de confidentalité tant que votre compte existe.',
    signUpEmailLabel: 'E-mail',
    signUpEmailPlaceholder: 'hello@bubblesapp.org',
    signUpEmailDataInfo:
      "Votre e-mail permet:\n - d'identifier votre compte,\n" +
      '- de recevoir les alertes de votre Bulle,\n ' +
      '- de recevoir des notifications.\n\n' +
      'Il est stocké en accord avec notre politique de confidentalité tant que votre compte existe.',
    signUpPasswordLabel: 'Mot de passe',
    signUpPasswordPlaceholder: '••••••••••••',
    signUpAgreeToTerms: "J'accepte les CGU",
    signUpContinue: 'Suivant',
    alreadyHaveAccount: 'Vous avez une Bulle?',
    alreadyHaveAccountAction: 'Connexion',
    cancel: 'Annuler',
    close: 'Fermer',
    welcomeText: 'Bienvenue $0!',
    emailVerificationLoading: "Vérification de l'e-mail...",
    emailVerificationSuccess: 'E-mail verifié avec succès.',
    emailRestorationLoading: "Récupération de l'e-mail...",
    emailRestorationSuccess: 'E-mail récupéré avec succès.',
    confirmAccountText: 'Un lien de véfification a été envoyé à',
    confirmAccountText2: 'Suivez-le pour vérifier votre compte.',
    confirmSignUpEmailPlaceholder: 'Adresse e-mail',
    confirmSignUpResendCodeButtonTitle: 'Renvoyer le lien',
    confirmSignUpCodeResent: 'Lien renvoyé.',
    confirmSignUpSomethingWrong: 'Un problème ?',
    forgotPassword: 'Mot de passe oublié ?',
    passwordResetEmailSentTitle: 'Un lien a été envoyé à',
    passwordResetEmailSentText: 'Suivez-le pour modifier votre mot de passe.',
    passwordResetEmailSentResendButtonTitle: 'Renvoyer le lien',
    resetPasswordButtonTitle: 'Modifier le mot de passe',
    resetPasswordEmailLabel: 'E-mail',
    resetPasswordEmailPlaceholder: 'hello@bubblesapp.org',
    resetPasswordSubmitButtonTitle: 'Modifier le mot de passe',
    resetPasswordNewPasswordLabel: 'Nouveau mot de passe',
    resetPasswordNewPasswordPlaceholder: '••••••••••••',
    chooseNewPassword: 'Nouveau mot de passe',
    resetPasswordSuccess: 'Mot de passe modifié avec succès.',
    backToLogin: 'Retour',
    codeNotReceived: 'Lien non reçu ? - Vérifiez vos spams',
  },
  bubble: {
    title: 'Bulle',
    takeCare: 'Prenez soin de votre Bulle',
    recommendationsButton: 'Voir les recommendations',
    bubbleTitle: '$0',
    noAlert: "Pas d'alerte",
    xAlerts: '$0 alerte(s)',
    invites: {
      title: "Inviter quelqu'un",
      linkLabel: 'Votre lien Bubbles',
      linkInstructions: "Partagez-le pour inviter quelqu'un",
      copyButton: 'Copier',
      copiedToClipboard: 'Lien copié.',
      clipboardError: 'Erreur lors de la copie.',
      shareMessageTitle: 'Rejoins ma Bulle',
      shareMessageContent: "Rejoins ma Bulle et veillons l'un sur l'autre. $0",
      shareButton: 'Partager',
      tapToRespond: 'Invitation reçue',
      awaitingResponse: 'Invitation envoyée...',
      accept: 'Accepter',
      decline: 'Décliner',
      cancel: 'Annuler',
      acceptSuccess: 'Utilisateur ajouté.',
    },
    friends: {
      title: 'Personnes',
      whenDidYouLastMeet: 'Dernière recontre ?',
      notMetYet: 'Pas vu récemment',
      removeFriend: 'Supprimer',
      lastMet: 'Vu',
      lastMetToday: "Vu aujourd'hui",
      lastMetYesterday: 'Vu hier',
      lastMetXDaysAgo: 'Vu il y a $0 jours',
      emptyText: 'Bulle vide',
      emptyButtonTitle: "Inviter quelqu'un",
      deleteFriendSuccess: 'Personne supprimée',
      today: "aujourd'hui",
      yesterday: 'hier',
      xDaysAgo: 'il y $0 jours',
      dayPickerFormat: 'dddd D MMM',
      logTitle: 'Noter un contact',
      logQuestion: 'Quand avez vous vu $0?',
      logExplanation: 'Prévenez les bonnes personnes en cas de risque',
      logButton: 'Sauvegarder',
    },
    alerts: {
      emptyText: 'Tout va bien',
      title: 'Alertes',
      newAlertTitle: 'Nouvelle Alerte',
      newAlertSubtitle: 'Anonyme',
      newAlertWho: 'Qui prévenir ?',
      newAlertContinueButton: 'Continuer',
      newAlertOpenMailApp: 'Ouvrir Mail',
      newAlertWhy: "Raison de l'alerte ?",
      newAlertQA: 'FAQ Alertes',
      newAlertHow: 'Comment rédiger une alerte efficace',
      newAlertMessageLabel: 'Caractères restants: $0',
      newAlertMessagePlaceholder: 'Message...',
      newAlertSendButton: 'Envoyer',
      recentFriendsTitle: 'Vus récemment',
      recentFriendsSubtitle: 'Il y a moins de $0 jours',
      alertsHeaderTitle: 'Alertes récentes uniquement',
      alertsHeaderSubtitle: 'Les alertes sont supprimées après 21 jours.',
      alertSent: 'Alerte envoyée avec succès',
      deleteButton: 'Supprimer',
      deleteSuccess: 'Alerte supprimée avec succès',
      detailsTitle: 'Alerte',
      detailsDate: 'Reçue $0 ($1)',
      detailsDateFormat: 'dddd D MMM',
      detailsCloseButton: 'Fermer',
      detailsDeleteButton: 'Supprimer',
    },
  },
  profile: {
    title: 'Profil',
    //credentials: 'Credentials',
    personalInfo: 'Données personnelles',
    notifications: 'Notifications',
    pushNotifications: 'Notifications Push',
    emailNotifications: 'Notifications E-mail',
    //account: 'Account',
    logout: 'Déconnexion',
    delete: 'Supprimer le compte',
    email: 'E-mail',
    password: 'Mot de passe',
    username: 'Pseudonyme',
    passwordNote: 'Mot de passe requis par sécurité.',
    helpTitle: 'Des questions ?',
    helpSubtitle: 'hello@bubblesapp.org',
    changeEmail: {
      title: 'E-mail',
      heading1: 'Modifier votre e-mail',
      heading2: 'Un lien de vérification sera envoyé.',
      newEmailLabel: 'Nouvel e-mail',
      newEmailPlaceholder: 'hello@bubblesapp.org',
      button: 'Envoyer le lien',
      passwordLabel: 'Mot de passe actuel',
      passwordPlaceholder: '••••••••••••',
    },
    changePassword: {
      title: 'Mot de passe',
      heading1: 'Modifier votre mot de passe',
      button: 'Modifier',
      currentPasswordLabel: 'Mot de passe actuel',
      currentPasswordPlaceholder: '••••••••••••',
      newPasswordLabel: 'Nouveau mot de passe',
      newPasswordPlaceholder: '••••••••••••',
      success: 'Mot de passe modifié',
    },
    changePersonalInfo: {
      title: 'Pseudonyme',
      heading1: 'Modifier votre pseudonyme',
      heading2: 'Visible à tous dans votre Bulle',
      usernameLabel: 'Pseudonyme',
      usernamePlaceholder: 'Pseudonyme',
      button: 'Modifier',
      success: 'Pseudonyme modifié',
    },
    deleteAccount: {
      title: 'Supprimer le compte',
      button: 'Supprimer',
      heading1: 'Quitter votre Bulle ?',
      passwordLabel: 'Mot de passe',
      passwordPlaceholder: '••••••••••••',
    },
    legalInfo: {
      title: 'Légal',
      terms: "Conditions Générales d'Utilisation",
      privacy: 'Politique de Confidentialité',
      legalNotice: 'Mentions Légales',
    },
    verifyEmail: {
      title: "Vérification de l'e-mail",
      verifyEmail: "Vérification de l'e-mail",
      emailVerified: 'E-mail vérifié.',
    },
  },
  closeToast: 'Fermer',
};