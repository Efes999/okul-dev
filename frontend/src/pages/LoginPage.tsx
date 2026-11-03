import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
interface LoginErrors { email?: string; password?: string }
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [sent, setSent] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found: LoginErrors = {};
    if (!email.includes("@") || !email.split("@")[1]?.includes(".")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    setErrors(found); setSent(Object.keys(found).length === 0);
  }
  return <section className="icerik-bolumu auth-page"><div className="auth-card">
    <p className="bolum-ust-etiket">HESABIM</p><h2>Giriş Yap</h2><p>Bilgilerinizi girin. Bu sayfa yalnızca demo doğrulaması yapar.</p>
    {sent && <p className="mesaj mesaj-basari" role="status">Gerçek giriş Sprint 10'da. Bilgileriniz hiçbir yere gönderilmedi.</p>}
    <form noValidate className="auth-form" onSubmit={handleSubmit}>
      <div className="form-grup"><label htmlFor="login-email">E-posta</label><input id="login-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setSent(false); }} aria-invalid={!!errors.email} />
        {errors.email && <span className="hata-metni" role="alert">{errors.email}</span>}</div>
      <div className="form-grup"><label htmlFor="login-password">Şifre</label><input id="login-password" type="password" value={password} onChange={(e) => { setPassword(e.target.value); setSent(false); }} aria-invalid={!!errors.password} />
        {errors.password && <span className="hata-metni" role="alert">{errors.password}</span>}</div>
      <button className="ana-buton auth-submit" type="submit">Giriş yap</button>
    </form>
    <div className="auth-links"><Link to="/forgot-password">Şifremi unuttum</Link><Link to="/register">Hesabın yok mu? Kayıt ol</Link></div>
  </div></section>;
}
