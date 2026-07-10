import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/I18nContext";

export default function AdminLogin() {
  const { login, user } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (user) navigate("/admin", { replace: true });
  }, [user, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(email.trim().toLowerCase(), password);
      const to = location.state?.from?.pathname || "/admin";
      navigate(to, { replace: true });
      toast.success(t("al.welcome"));
    } catch (err) {
      const msg = err?.response?.data?.detail || t("al.errFallback");
      setError(typeof msg === "string" ? msg : t("al.errFallback"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen" data-testid="admin-login-page">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <div className="eyebrow mb-6">{t("al.section")}</div>
        <h1 className="font-display text-5xl md:text-6xl tracking-tight leading-[0.95]">
          {t("al.h1")} <span className="italic-accent">{t("al.italic")}</span>
        </h1>
        <p className="mt-6 text-white/60 text-sm">
          {t("al.sub")}
        </p>

        <form onSubmit={onSubmit} className="mt-12 border border-white/10 p-8 space-y-6" data-testid="admin-login-form">
          <div>
            <label className="eyebrow text-xs mb-3 block">{t("al.email")}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                placeholder="admin@eco-building.tech"
                className="w-full bg-transparent border border-white/20 text-white pl-10 pr-3 py-3 text-sm focus:border-white/60 outline-none"
                data-testid="admin-email-input"
              />
            </div>
          </div>
          <div>
            <label className="eyebrow text-xs mb-3 block">{t("al.password")}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full bg-transparent border border-white/20 text-white pl-10 pr-3 py-3 text-sm focus:border-white/60 outline-none"
                data-testid="admin-password-input"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-xs border border-red-400/40 px-3 py-2" data-testid="admin-login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full flex items-center justify-center gap-2 bg-white text-[#0B1736] py-3 text-sm font-medium tracking-wider uppercase hover:bg-white/90 disabled:opacity-50"
            data-testid="admin-login-submit"
          >
            {busy ? t("al.signingIn") : t("al.signIn")}
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
