import React, { useEffect, useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha";

const styles = `
  .content { line-height: 1.8; }
  .content h1 { font-size: 2.25rem; font-weight: 700; color: #1f2937; margin: 2rem 0 1.5rem 0; }
  .content h2 { font-size: 1.5rem; font-weight: 600; color: #374151; margin: 0.8rem 0 0.3rem 0; }
  .content h3 { font-size: 1.25rem; font-weight: 600; color: #4b5563; margin: 1.25rem 0 0.75rem 0; }
  .content p { color: #4b5563; margin: 0.3rem 0 1rem 0; line-height: 1.8; }
  .content a { color: #2563eb; text-decoration: none; }
  .content a:hover { text-decoration: underline; }
  .content ul, .content ol { margin: 1rem 0 1rem 2rem; }
  .content li { margin: 0.5rem 0; color: #4b5563; }
  .content strong { font-weight: 600; color: #1f2937; }
  .content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
  .content table th, .content table td { border: 1px solid #e5e7eb; padding: 0.75rem; text-align: left; }
  .content table th { background-color: #f3f4f6; font-weight: 600; }

  .contacts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin: 30px 0;
  }

  .contact-card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .contact-card h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 15px;
  }

  .contact-card p {
    color: #4b5563;
    font-size: 1rem;
    line-height: 1.6;
  }

  .contact-card a {
    color: #2563eb;
    text-decoration: none;
  }

  .contact-card a:hover {
    text-decoration: underline;
  }

  .social-links {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 15px;
  }

  .social-links a {
    display: inline-block;
    padding: 8px 14px;
    background: #f3f4f6;
    border-radius: 6px;
    color: #2563eb;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .social-links a:hover {
    background: #2563eb;
    color: white;
  }

  /* .contact-form-container {
    max-width: 700px;
    margin: 40px auto 0 auto;
    padding: 30px;
    background: #f9fafb;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  .contact-form-container h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 20px;
    text-align: center;
  }
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .contact-form .form-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  .contact-form input[type="text"],
  .contact-form input[type="email"],
  .contact-form input[type="tel"],
  .contact-form textarea {
    flex: 1;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    resize: none;
  }
  .contact-form textarea { min-height: 120px; }
  .contact-form button {
    padding: 14px;
    background-color: #2563eb;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
  }
  .contact-form button:hover { background-color: #1e40af; }
  .contact-form button:disabled { background-color: #9ca3af; cursor: not-allowed; }
  .message { margin-top: 8px; padding: 10px; border-radius: 6px; text-align: center; font-weight: 500; }
  .message.success { color: #059669; background-color: #ecfdf5; }
  .message.error { color: #dc2626; background-color: #fef2f2; }

  .recaptcha-wrapper {
    display: flex;
    justify-content: center;
  } */

  @media (max-width: 600px) {
    /* .contact-form .form-row { flex-direction: column; } */
    .contacts-grid { grid-template-columns: 1fr; }
  }
`;

export default function ContactPage() {
  const [block, setBlock] = useState(null);
  // const [formData, setFormData] = useState({ name: "", email: "", phone: "", sms: "" });
  // const [message, setMessage] = useState("");
  // const [captchaToken, setCaptchaToken] = useState(null);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/content/contakts/")
      .then(res => res.json())
      .then(data => setBlock(data))
      .catch(err => console.error(err));
  }, []);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setMessage("");
    
  //   if (!captchaToken) {
  //     setMessage("❌ Подтвердите, что вы не робот.");
  //     return;
  //   }
  //   if (!formData.email.trim() && !formData.phone.trim()) {
  //     setMessage("❌ Укажите хотя бы Email или Телефон.");
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     const res = await fetch("/api/SendBack/", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ ...formData, captcha: captchaToken }),
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       setMessage("✅ Сообщение отправлено!");
  //       setFormData({ name: "", email: "", phone: "", sms: "" });
  //       setCaptchaToken(null);
  //     } else {
  //       setMessage(`❌ Ошибка: ${data.error}`);
  //     }
  //   } catch (err) {
  //     setMessage(`❌ Ошибка: ${err.message}`);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  if (!block) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <style>{styles}</style>
      <div className="max-w-6xl mx-auto bg-white rounded-lg p-8 shadow-sm space-y-8">
        <div className="content" dangerouslySetInnerHTML={{ __html: block.content }} />

        {/* <div className="contact-form-container">
          <h2>Свяжитесь с нами</h2>
          <div className="contact-form">
            <div className="form-row">
              <input type="text" name="name" placeholder="Имя" value={formData.name} onChange={handleChange} />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              <input type="tel" name="phone" placeholder="Телефон" value={formData.phone} onChange={handleChange} />
            </div>

            <textarea name="sms" placeholder="Сообщение" value={formData.sms} onChange={handleChange} />

            <div className="recaptcha-wrapper">
              <ReCAPTCHA
                sitekey="6LeXht0rAAAAAKBxY-SSKfnVqv-nH5m5OESd6HuF"
                onChange={(token) => setCaptchaToken(token)}
              />
            </div>

            <button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Отправка..." : "Отправить"}
            </button>

            {message && <p style={{ marginTop: "8px", color: "#374151" }}>{message}</p>}
          </div>
        </div> */}
      </div>
    </div>
  );
}