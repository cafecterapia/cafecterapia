'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

type FormState = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validate = (values: FormState) => {
    if (!values.name.trim()) return 'Por favor insira seu nome.';
    if (!values.email.trim()) return 'Por favor insira seu email.';
    // basic email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return 'Endereço de email inválido.';
    if (!values.message.trim())
      return 'Escreva uma mensagem para que eu possa responder adequadamente.';
    return null;
  };

  const handleChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }));
      setError(null);
      setSuccess(null);
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validate(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Erro ao enviar a mensagem.');
      }

      setSuccess('Mensagem enviada! Responderei em breve.');
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      setError(err?.message || 'Erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <label className="sr-only" htmlFor="contact-name">
        Nome
      </label>
      <Input
        id="contact-name"
        name="name"
        aria-label="name"
        placeholder="Nome"
        value={form.name}
        onChange={handleChange('name')}
        required
      />

      <label className="sr-only" htmlFor="contact-email">
        Email
      </label>
      <Input
        id="contact-email"
        name="email"
        type="email"
        aria-label="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange('email')}
        required
      />

      <label className="sr-only" htmlFor="contact-message">
        Mensagem
      </label>
      <textarea
        id="contact-message"
        name="message"
        aria-label="message"
        placeholder="Escreva sua mensagem..."
        value={form.message}
        onChange={handleChange('message')}
        required
        rows={6}
        className="w-full rounded-2xl p-4 text-base bg-white/90 text-black placeholder:text-black/40 focus:outline-none"
      />

      <div className="flex flex-col gap-2">
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
        {success && (
          <p role="status" className="text-sm text-green-700">
            {success}
          </p>
        )}
        <Button type="submit" aria-label="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </Button>
      </div>
    </form>
  );
}
