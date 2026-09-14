import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "LifeDrop | Blood Bank Management",
  description: "Full-stack blood bank management system"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <footer className="footer">
          <div className="container footer-inner">
            <div><strong>LifeDrop</strong><span> • Blood Bank Management System</span></div>
            <div>Every drop can save a life.</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
