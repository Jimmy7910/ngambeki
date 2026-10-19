"use strict";

const accountMessages = {
  sw: {
    loggedOut: "Hujaingia kwenye akaunti.",
    emailLabel: "Email",
    passwordLabel: "Nenosiri",
    loginButton: "Ingia",
    signupButton: "Jisajili",
    logoutButton: "Toka kwenye akaunti",
    historyTitle: "Historia Yangu",
    historyDescription: "Maswali uliyouliza ukiwa umeingia kwenye akaunti yako.",
    refreshHistory: "🔄 Sasisha historia",
    loggedIn: "Umeingia kama: ",
    loginSuccess: "Umeingia kikamilifu.",
    signupSuccess: "Akaunti imeundwa na umeingia kikamilifu.",
    logoutSuccess: "Umetoka kwenye akaunti kikamilifu.",
    loginError: "Imeshindikana kuingia. Hakiki email na nenosiri.",
    signupError: "Imeshindikana kutengeneza akaunti.",
    logoutError: "Imeshindikana kutoka kwenye akaunti.",
    sessionError: "Imeshindikana kuthibitisha akaunti.",
    networkError: "Tatizo la muunganisho. Tafadhali jaribu tena.",
    duplicate: "Email hiyo tayari imesajiliwa.",
    passwordShort: "Nenosiri liwe na angalau herufi 8.",
    busy: "Tafadhali subiri...",
    historyLoading: "Inapakia historia...",
    historyEmpty: "Bado huna historia ya maswali.",
    historyLoaded: "Historia yako imepakiwa.",
    historyError: "Imeshindikana kupata historia yako.",
    historyNetworkError: "Tatizo la muunganisho. Jaribu tena."
  },
  en: {
    loggedOut: "You are not signed in.",
    emailLabel: "Email",
    passwordLabel: "Password",
    loginButton: "Sign in",
    signupButton: "Sign up",
    logoutButton: "Sign out",
    historyTitle: "My History",
    historyDescription: "Questions you asked while signed in to your account.",
    refreshHistory: "🔄 Refresh history",
    loggedIn: "Signed in as: ",
    loginSuccess: "You have signed in successfully.",
    signupSuccess: "Account created and signed in successfully.",
    logoutSuccess: "You have signed out successfully.",
    loginError: "Sign-in failed. Check your email and password.",
    signupError: "Account creation failed.",
    logoutError: "Sign-out failed.",
    sessionError: "Could not verify your account.",
    networkError: "Connection problem. Please try again.",
    duplicate: "That email is already registered.",
    passwordShort: "Password must contain at least 8 characters.",
    busy: "Please wait...",
    historyLoading: "Loading history...",
    historyEmpty: "You do not have any question history yet.",
    historyLoaded: "Your history has loaded.",
    historyError: "Could not load your history.",
    historyNetworkError: "Connection problem. Please try again."
  },
  fr: {
    loggedOut: "Vous n’êtes pas connecté.",
    emailLabel: "Email",
    passwordLabel: "Mot de passe",
    loginButton: "Se connecter",
    signupButton: "S’inscrire",
    logoutButton: "Se déconnecter",
    historyTitle: "Mon historique",
    historyDescription: "Questions posées lorsque vous étiez connecté à votre compte.",
    refreshHistory: "🔄 Actualiser l’historique",
    loggedIn: "Connecté en tant que : ",
    loginSuccess: "Connexion réussie.",
    signupSuccess: "Compte créé et connexion réussie.",
    logoutSuccess: "Vous êtes déconnecté.",
    loginError: "Échec de connexion. Vérifiez votre email et mot de passe.",
    signupError: "Échec de la création du compte.",
    logoutError: "Échec de la déconnexion.",
    sessionError: "Impossible de vérifier votre compte.",
    networkError: "Problème de connexion. Réessayez.",
    duplicate: "Cet email est déjà enregistré.",
    passwordShort: "Le mot de passe doit contenir au moins 8 caractères.",
    busy: "Veuillez patienter...",
    historyLoading: "Chargement de l’historique...",
    historyEmpty: "Vous n’avez pas encore d’historique de questions.",
    historyLoaded: "Votre historique est chargé.",
    historyError: "Impossible de charger votre historique.",
    historyNetworkError: "Problème de connexion. Réessayez."
  },
  pt: {
    loggedOut: "Você não está conectado.",
    emailLabel: "Email",
    passwordLabel: "Senha",
    loginButton: "Entrar",
    signupButton: "Criar conta",
    logoutButton: "Sair da conta",
    historyTitle: "Meu histórico",
    historyDescription: "Perguntas feitas enquanto você estava conectado à sua conta.",
    refreshHistory: "🔄 Atualizar histórico",
    loggedIn: "Conectado como: ",
    loginSuccess: "Login realizado com sucesso.",
    signupSuccess: "Conta criada e login realizado.",
    logoutSuccess: "Você saiu da conta.",
    loginError: "Falha no login. Verifique seu email e senha.",
    signupError: "Falha ao criar a conta.",
    logoutError: "Falha ao sair da conta.",
    sessionError: "Não foi possível verificar sua conta.",
    networkError: "Problema de conexão. Tente novamente.",
    duplicate: "Esse email já está cadastrado.",
    passwordShort: "A senha deve ter pelo menos 8 caracteres.",
    busy: "Aguarde...",
    historyLoading: "Carregando histórico...",
    historyEmpty: "Você ainda não tem histórico de perguntas.",
    historyLoaded: "Seu histórico foi carregado.",
    historyError: "Não foi possível carregar seu histórico.",
    historyNetworkError: "Problema de conexão. Tente novamente."
  },
  ar: {
    loggedOut: "لم تسجل الدخول إلى حسابك.",
    emailLabel: "البريد الإلكتروني",
    passwordLabel: "كلمة المرور",
    loginButton: "تسجيل الدخول",
    signupButton: "إنشاء حساب",
    logoutButton: "تسجيل الخروج",
    historyTitle: "سجلي",
    historyDescription: "الأسئلة التي طرحتها أثناء تسجيل الدخول إلى حسابك.",
    refreshHistory: "🔄 تحديث السجل",
    loggedIn: "تم تسجيل الدخول باسم: ",
    loginSuccess: "تم تسجيل الدخول بنجاح.",
    signupSuccess: "تم إنشاء الحساب وتسجيل الدخول بنجاح.",
    logoutSuccess: "تم تسجيل الخروج بنجاح.",
    loginError: "تعذر تسجيل الدخول. تحقق من البريد الإلكتروني وكلمة المرور.",
    signupError: "تعذر إنشاء الحساب.",
    logoutError: "تعذر تسجيل الخروج.",
    sessionError: "تعذر التحقق من الحساب.",
    networkError: "مشكلة في الاتصال. حاول مرة أخرى.",
    duplicate: "هذا البريد الإلكتروني مسجل بالفعل.",
    passwordShort: "يجب ألا تقل كلمة المرور عن 8 أحرف.",
    busy: "يرجى الانتظار...",
    historyLoading: "جارٍ تحميل السجل...",
    historyEmpty: "لا يوجد سجل للأسئلة حتى الآن.",
    historyLoaded: "تم تحميل سجلك.",
    historyError: "تعذر تحميل سجلك.",
    historyNetworkError: "مشكلة في الاتصال. حاول مرة أخرى."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("accountForm");
  const emailInput = document.getElementById("accountEmail");
  const passwordInput = document.getElementById("accountPassword");
  const loginButton = document.getElementById("loginButton");
  const signupButton = document.getElementById("signupButton");
  const logoutButton = document.getElementById("logoutButton");
  const status = document.getElementById("accountStatus");
  const message = document.getElementById("accountMessage");
  const languageSelect = document.getElementById("language");
  const historyPanel = document.getElementById("historyPanel");
  const historyList = document.getElementById("historyList");
  const historyMessage = document.getElementById("historyMessage");
  const refreshHistoryButton = document.getElementById("refreshHistoryButton");
  let currentUserEmail = "";

  if (
    !form || !emailInput || !passwordInput ||
    !loginButton || !signupButton || !logoutButton ||
    !status || !message
  ) {
    console.error("Ngambeki account: required HTML elements are missing.");
    return;
  }

  let busy = false;

  function getLanguage() {
    const selected = languageSelect ? languageSelect.value : "sw";
    return accountMessages[selected] ? selected : "sw";
  }

  function t(key) {
    return accountMessages[getLanguage()][key];
  }

  function showMessage(text) {
    message.textContent = text;
  }

  function setBusy(value) {
    busy = value;
    loginButton.disabled = value;
    signupButton.disabled = value;
    logoutButton.disabled = value;

    if (value) showMessage(t("busy"));
  }

  function showSignedOut() {
    currentUserEmail = "";
    status.textContent = t("loggedOut");
    if (historyPanel) historyPanel.hidden = true;
    if (historyList) historyList.replaceChildren();
    if (historyMessage) historyMessage.textContent = "";
    loginButton.hidden = false;
    signupButton.hidden = false;
    logoutButton.hidden = true;
  }

  function showSignedIn(email) {
    currentUserEmail = email;
    status.textContent = t("loggedIn") + email;
    if (historyPanel) historyPanel.hidden = false;
    loadHistory();
    loginButton.hidden = true;
    signupButton.hidden = true;
    logoutButton.hidden = false;
    passwordInput.value = "";
  }

  async function sendRequest(path, method, body) {
    const options = {
      method,
      credentials: "same-origin",
      headers: {
        "Accept": "application/json"
      }
    };

    if (body !== undefined) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    const response = await fetch(path, options);
    let data = {};

    try {
      data = await response.json();
    } catch (_) {
      data = {};
    }

    return { response, data };
  }

  async function loadHistory() {
    if (!historyPanel || !historyList || !historyMessage) return;
    if (!currentUserEmail) return;

    historyMessage.textContent = t("historyLoading");
    historyList.replaceChildren();

    try {
      const { response, data } = await sendRequest("/history", "GET");

      if (!response.ok) {
        historyMessage.textContent =
          data.message || t("historyError");
        return;
      }

      const entries = Array.isArray(data.history) ? data.history : [];

      if (entries.length === 0) {
        historyMessage.textContent = t("historyEmpty");
        return;
      }

      for (const entry of entries) {
        const item = document.createElement("li");
        const question = document.createElement("p");
        const date = document.createElement("small");

        question.textContent = entry.question || "";
        date.textContent = entry.created_at
          ? new Date(entry.created_at).toLocaleString()
          : "";

        item.append(question, date);
        historyList.appendChild(item);
      }

      historyMessage.textContent = t("historyLoaded");
    } catch (error) {
      historyMessage.textContent = t("historyNetworkError");
    }
  }

  async function checkSession() {
    try {
      const { response, data } = await sendRequest("/me", "GET");

      if (!response.ok) {
        showSignedOut();
        showMessage(t("sessionError"));
        return;
      }

      if (data.loggedIn && data.user && data.user.email) {
        showSignedIn(data.user.email);
      } else {
        showSignedOut();
      }
    } catch (error) {
      showSignedOut();
      showMessage(t("networkError"));
    }
  }

  async function submitAccount(action) {
    if (busy) return;

    if (!form.reportValidity()) return;

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (action === "signup" && password.length < 8) {
      showMessage(t("passwordShort"));
      return;
    }

    setBusy(true);

    try {
      const { response, data } = await sendRequest(
        action === "signup" ? "/signup" : "/login",
        "POST",
        { email, password }
      );

      if (!response.ok) {
        if (response.status === 409) {
          showMessage(t("duplicate"));
        } else if (response.status === 400 && action === "signup") {
          showMessage(data.message || t("signupError"));
        } else {
          showMessage(
            action === "signup" ? t("signupError") : t("loginError")
          );
        }
        return;
      }

      if (data.user && data.user.email) {
        showSignedIn(data.user.email);
      }

      passwordInput.value = "";
      showMessage(
        action === "signup" ? t("signupSuccess") : t("loginSuccess")
      );
    } catch (error) {
      showMessage(t("networkError"));
    } finally {
      setBusy(false);
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitAccount("login");
  });

  signupButton.addEventListener("click", () => {
    submitAccount("signup");
  });

  logoutButton.addEventListener("click", async () => {
    if (busy) return;

    setBusy(true);

    try {
      const { response } = await sendRequest("/logout", "POST");

      if (!response.ok) {
        showMessage(t("logoutError"));
        return;
      }

      showSignedOut();
      passwordInput.value = "";
      showMessage(t("logoutSuccess"));
    } catch (error) {
      showMessage(t("networkError"));
    } finally {
      setBusy(false);
    }
  });

  if (refreshHistoryButton) {
    refreshHistoryButton.addEventListener("click", loadHistory);
  }

    function applyAccountLanguage() {
    const labels = {
      accountEmailLabel: "emailLabel",
      passwordLabel: "passwordLabel",
      loginButton: "loginButton",
      signupButton: "signupButton",
      logoutButton: "logoutButton",
      historyTitle: "historyTitle",
      historyDescription: "historyDescription",
      refreshHistoryButton: "refreshHistory"
    };

    for (const [elementId, translationKey] of Object.entries(labels)) {
      const element = document.getElementById(elementId);
      if (element) {
        element.textContent = t(translationKey);
      }
    }

    status.textContent = currentUserEmail
      ? t("loggedIn") + currentUserEmail
      : t("loggedOut");
  }

  if (languageSelect) {
    languageSelect.addEventListener("change", applyAccountLanguage);
  }

  applyAccountLanguage();
  showSignedOut();
  checkSession();
});
