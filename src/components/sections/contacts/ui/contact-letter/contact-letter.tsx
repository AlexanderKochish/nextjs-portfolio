import * as React from 'react';

interface ContactEmailProps {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export const ContactEmail: React.FC<ContactEmailProps> = ({ name, email, subject, message }) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px', border: '1px solid #eee' }}>
    <h2>Новое сообщение из портфолио!</h2>
    <p>
      <strong>От кого:</strong> {name} ({email})
    </p>
    <p>
      <strong>Тема:</strong> {subject}
    </p>
    <div style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9' }}>
      <p>{message}</p>
    </div>
  </div>
);
