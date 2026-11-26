(() => {
  "use strict";

  const DEMO_EMAIL = "demo@circles-ai.ai";
  const DEMO_PASSWORD = "Demo1234";
  const EMAIL_KEY = "circles-login-ux:email";

  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("correo");
  const passwordInput = document.getElementById("contrasena");
  const rememberInput = document.getElementById("recordarme");
  const togglePass = document.getElementById("toggle-pass");
  const capsAviso = document.getElementById("caps-aviso");
  const submitBtn = document.getElementById("submit-btn");
  const formAlert = document.getElementById("form-alert");
  const loginView = document.getElementById("login-view");
  const successView = document.getElementById("success-view");
  const successEmail = document.getElementById("success-email");
  const logoutBtn = document.getElementById("logout-btn");
  const forgotBtn = document.getElementById("forgot-btn");
  const forgotDialog = document.getElementById("forgot-dialog");

  const emailError = document.getElementById("correo-error");
  const passwordError = document.getElementById("contrasena-error");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function loadRememberedEmail() {
    try {
      const saved = localStorage.getItem(EMAIL_KEY);
      if (saved) {
        emailInput.value = saved;
        rememberInput.checked = true;
      }
    } catch {
      /* almacenamiento no disponible */
    }
  }

  function persistEmail(email) {
    try {
      if (rememberInput.checked) {
        localStorage.setItem(EMAIL_KEY, email);
      } else {
        localStorage.removeItem(EMAIL_KEY);
      }
    } catch {
      /* ignore */
    }
  }

  function setFieldError(input, errorEl, message) {
    const field = input.closest(".field");
    if (message) {
      errorEl.hidden = false;
      errorEl.textContent = message;
      field.classList.add("is-invalid");
      field.classList.remove("is-valid");
      input.setAttribute("aria-invalid", "true");
    } else {
      errorEl.hidden = true;
      errorEl.textContent = "";
      field.classList.remove("is-invalid");
      input.removeAttribute("aria-invalid");
      if (input.value.trim()) {
        field.classList.add("is-valid");
      } else {
        field.classList.remove("is-valid");
      }
    }
  }

  function validateEmail(showEmpty) {
    const value = emailInput.value.trim();
    if (!value) {
      if (showEmpty) {
        setFieldError(emailInput, emailError, "Ingresa tu correo electrónico.");
      } else {
        setFieldError(emailInput, emailError, "");
      }
      return false;
    }
    if (!emailPattern.test(value)) {
      setFieldError(emailInput, emailError, "Ingresa un correo válido, por ejemplo nombre@empresa.com.");
      return false;
    }
    setFieldError(emailInput, emailError, "");
    return true;
  }

  function validatePassword(showEmpty) {
    const value = passwordInput.value;
    if (!value) {
      if (showEmpty) {
        setFieldError(passwordInput, passwordError, "Ingresa tu contraseña.");
      } else {
        setFieldError(passwordInput, passwordError, "");
      }
      return false;
    }
    if (value.length < 8) {
      setFieldError(passwordInput, passwordError, "La contraseña debe tener al menos 8 caracteres.");
      return false;
    }
    setFieldError(passwordInput, passwordError, "");
    return true;
  }

  function showAlert(message, ok = false) {
    formAlert.hidden = false;
    formAlert.textContent = message;
    formAlert.classList.toggle("alert--ok", ok);
  }

  function hideAlert() {
    formAlert.hidden = true;
    formAlert.textContent = "";
    formAlert.classList.remove("alert--ok");
  }

  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitBtn.setAttribute("aria-busy", String(isLoading));
    submitBtn.querySelector(".submit__label").hidden = isLoading;
    submitBtn.querySelector(".submit__loading").hidden = !isLoading;
    emailInput.disabled = isLoading;
    passwordInput.disabled = isLoading;
    rememberInput.disabled = isLoading;
  }

  function updateCapsLock(event) {
    const fromModifier =
      event && typeof event.getModifierState === "function"
        ? event.getModifierState("CapsLock")
        : false;
    const visible = document.activeElement === passwordInput && fromModifier;
    capsAviso.hidden = !visible;
  }

  function togglePasswordVisibility() {
    const hidden = passwordInput.type === "password";
    passwordInput.type = hidden ? "text" : "password";
    togglePass.setAttribute("aria-label", hidden ? "Ocultar contraseña" : "Mostrar contraseña");
    togglePass.setAttribute("aria-pressed", String(hidden));
    togglePass.querySelector(".icon-eye").hidden = hidden;
    togglePass.querySelector(".icon-eye-off").hidden = !hidden;
    passwordInput.focus();
  }

  function showSuccess(email) {
    loginView.hidden = true;
    successView.hidden = false;
    successEmail.textContent = email;
    logoutBtn.focus();
  }

  function showLogin() {
    successView.hidden = true;
    loginView.hidden = false;
    passwordInput.value = "";
    setFieldError(passwordInput, passwordError, "");
    hideAlert();
    emailInput.focus();
  }

  function simulateLogin(email, password) {
    // Demostración local: no hay red ni recolección de credenciales.
    return new Promise((resolve) => {
      window.setTimeout(() => {
        const ok =
          email.toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD;
        resolve(ok);
      }, 900);
    });
  }

  emailInput.addEventListener("blur", () => validateEmail(Boolean(emailInput.value)));
  emailInput.addEventListener("input", () => {
    hideAlert();
    if (emailError.textContent || emailInput.value) validateEmail(false);
  });

  passwordInput.addEventListener("blur", () => validatePassword(Boolean(passwordInput.value)));
  passwordInput.addEventListener("input", () => {
    hideAlert();
    if (passwordError.textContent || passwordInput.value) validatePassword(false);
  });

  passwordInput.addEventListener("keydown", updateCapsLock);
  passwordInput.addEventListener("keyup", updateCapsLock);
  passwordInput.addEventListener("focus", updateCapsLock);
  passwordInput.addEventListener("blur", () => {
    capsAviso.hidden = true;
  });

  togglePass.addEventListener("click", togglePasswordVisibility);

  forgotBtn.addEventListener("click", () => {
    if (typeof forgotDialog.showModal === "function") {
      forgotDialog.showModal();
    } else {
      window.alert(
        "En esta demostración no hay recuperación de contraseña. Usa demo@circles-ai.ai / Demo1234."
      );
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideAlert();

    const emailOk = validateEmail(true);
    const passwordOk = validatePassword(true);
    if (!emailOk || !passwordOk) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    setLoading(true);
    const ok = await simulateLogin(email, password);
    setLoading(false);

    if (ok) {
      persistEmail(email);
      showSuccess(email);
    } else {
      showAlert(
        "Correo o contraseña incorrectos. Prueba con la cuenta de demostración demo@circles-ai.ai / Demo1234."
      );
      passwordInput.value = "";
      setFieldError(passwordInput, passwordError, "");
      passwordInput.focus();
    }
  });

  logoutBtn.addEventListener("click", showLogin);

  loadRememberedEmail();
})();
