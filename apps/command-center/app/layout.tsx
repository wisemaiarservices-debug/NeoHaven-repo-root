import './globals.css';

export const metadata = {
  title: 'NOVA Command Center',
  description: 'SolarHub demo command center for NOVA OS.'
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{props.children}</body>
    </html>
  );
}
