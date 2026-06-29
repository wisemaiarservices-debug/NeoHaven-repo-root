import './globals.css';

export const metadata = {
  title: 'NOVA Command Center',
  description: 'Decision intelligence for sustainable infrastructure operations.'
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{props.children}</body>
    </html>
  );
}
