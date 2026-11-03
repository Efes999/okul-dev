import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
interface RegisterErrors { name?: string; email?: string; password?: string; password2?: string }
export default function RegisterPage() {
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({}); const [sent, setSent] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const found: RegisterErrors = {};
    if (name.trim().length < 3) found.name = "Ad Soyad en az 3 karakter olmalı.";
    if (!email.includes("@") || !email.split("@")[1]?.includes(".")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    if (password !== password2) found.password2 = "Şifreler aynı değil.";
    setErrors(found); setSent(Object.keys(found).length === 0);
  }
  return <section className="icerik-bolumu auth-page"><div className="auth-card">
    <p className="bolum-ust-etiket">HESAP OLUŞTUR</p><h2>Kayıt Ol</h2><p>Bu form demo amaçlıdır; kullanıcı hesabı oluşturulmaz.</p>
    {sent && <p role="status" className="mesaj mesaj-basari">Form geçerli. Gerçek kayıt işlemi sonraki sprintte yapılacaktır.</p>}
    <form className="auth-form" noValidate onSubmit={handleSubmit}>
      <div className="form-grup"><label htmlFor="register-name">Ad Soyad</label><input id="register-name" value={name} onChange={(e) => { setName(e.target.value); setSent(false); }} aria-invalid={!!errors.name} />{errors.name && <span className="hata-metni" role="alert">{errors.name}</span>}</div>
      <div className="form-grup"><label htmlFor="register-email">E-posta</label><input id="register-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setSent(false); }} aria-invalid={!!errors.email} />{errors.email && <span className="hata-metni" role="alert">{errors.email}</span>}</div>
      <div className="form-grup"><label htmlFor="register-password">Şifre</label><input id="register-password" type="password" value={password} onChange={(e) => { setPassword(e.target.value); setSent(false); }} aria-invalid={!!errors.password} />{errors.password && <span className="hata-metni" role="alert">{errors.password}</span>}</div>
      <div className="form-grup"><label htmlFor="register-password2">Şifre (tekrar)</label><input id="register-password2" type="password" value={password2} onChange={(e) => { setPassword2(e.target.value); setSent(false); }} aria-invalid={!!errors.password2} />{errors.password2 && <span className="hata-metni" role="alert">{errors.password2}</span>}</div>
      <button className="ana-buton auth-submit" type="submit">Kayıt ol</button>
    </form><div className="auth-links"><Link to="/login">Zaten hesabın var mı? Giriş yap</Link></div>
  </div></section>;
}
