import './Footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <img className="logo" src="/assets/logo 2.png" alt="logo"/>
          <p className="footer-about">
            GSFO Tech Private Limited proudly owns Bagara Biryani Café (BBC) — the ultimate destination to indulge in a mouthwatering selection of authentic Nattu-style Biryanis.
          </p>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li>&#9654; Home</li>
            <li>&#9654; About Us</li>
            <li>&#9654; Franchise</li>
            <li>&#9654; Menu</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Address</h4>
          <p>🎈 #103/2(P), & 152/2,<br/>
            5th floor Uniworld Building Neeladri Nagar Doddathogur(V)<br/>
            Electronic City, Bengaluru Karnataka 560100
          </p>
          <br/>
          <h4>Email</h4>
          <p>✉️ info@gsideas.com</p>
          <br/>
          <h4>Phone No</h4>
          <p>📞 +91 9148785024, +91 9538189128</p>
          <br/
          >
        </div>

        <div className="footer-column">
          <h4>Franchise support</h4>
          <p>📞 +91 9538189128</p>
        </div>
      </div>
    </div>
  );
}