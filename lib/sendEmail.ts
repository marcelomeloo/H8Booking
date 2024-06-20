// import nodemailer from "nodemailer";

// // Defining a type for the email arguments
// type ReservationDetails = {
//     userName: string;
//     userEmail: string;
//     room: string;
//     date: string;
// }


// // Transponter object using SMTP protocol
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSWORD,
//     },
// });

// export async function sendReservationEmail(details: ReservationDetails): Promise<void> {
//     // Set up email data
//     const mailOptions = {
//         from: process.env.EMAIL,
//         to: details.userEmail,
//         subject: "Sua reserva no H8 foi confirmada!",
//         text: `Olá, ${details.userName},

// Ficamos felizes em te informar que a sua reserva no alojamento H8 foi feita e está confirmada!

// Detalhes da reserva:
// Sala: ${details.room}
// Data: ${details.date}

// Obrigado por escolher o H8Booking!`
//     };

//     // Send the email
//     try {
//         await transporter.sendMail(mailOptions);
//         console.log('Email de reserva enviado com sucesso.');
//     } catch (error) {
//         console.error('Erro ao enviar o email de reserva:', error);
//         throw error;
//     }
// }

type ReservationDetails = {
    userName: string;
    userEmail: string;
    room: string;
    date: string;
  };
  
  export async function sendReservationEmail(details: ReservationDetails): Promise<void> {
    const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
    });
  
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao enviar o email de reserva.');
    }
  }