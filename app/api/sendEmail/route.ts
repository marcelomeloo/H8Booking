import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Defining a type for the email arguments
type ReservationDetails = {
  userName: string;
  userEmail: string;
  room: string;
  date: string;
};

// Transponter object using SMTP protocol
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  const details: ReservationDetails = await request.json();

  const mailOptions = {
    from: process.env.EMAIL,
    to: details.userEmail,
    subject: 'Sua reserva no H8 foi confirmada!',
    text: `Olá, ${details.userName},

Ficamos felizes em te informar que a sua reserva no alojamento H8 foi feita e está confirmada!

Detalhes da reserva:
Sala: ${details.room}
Data: ${details.date}

Obrigado por escolher o H8Booking!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email de reserva enviado com sucesso.');
    return NextResponse.json({ message: 'Email enviado com sucesso.' });
  } catch (error) {
    console.error('Erro ao enviar o email de reserva:', error);
    return NextResponse.json({ error: 'Erro ao enviar o email de reserva.' }, { status: 500 });
  }
}
