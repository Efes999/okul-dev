import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState(""); const [error, setError] = useState(""); const [sent, setSent] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = (!email.includes("@") || !email.split("@")[1]?.includes(".")) ? "Geçerli bir e-posta girin." : "";
    setError(found); setSent(found === "");
  }
  return <section className="icerik-bolumu auth-page"><div className="auth-card">
    <p className="bolum-ust-etiket">HESAP KURTARMA</p><h2>Şifremi Unuttum</h2><p>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>
    {sent && <p className="mesaj mesaj-basari" role="status">Bağlantı {email} adresine gönderildi (demo). Gerçekte e-posta gönderilmedi.</p>}
    <form noValidate className="auth-form" onSubmit={handleSubmit}>
      <div className="form-grup"><label htmlFor="forgot-email">E-posta</label><input id="forgot-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setSent(false); }} aria-invalid={!!error} />{error && <span className="hata-metni" role="alert">{error}</span>}</div>
      <button className="ana-buton auth-submit" type="submit">Bağlantı gönder</button>
    </form><div className="auth-links"><Link to="/login">← Girişe dön</Link></div>
  </div></section>;
}
