import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer xl:px-24 py-10 px-10 text-base-content">
        <aside>
          <img
            src="/logo.png"
            className="oobject-scale-down  h-20 w-40 items-center"
          />
          <p>
            Fastfood Kitchen.
            <br />
            Providing reliable Service since 2010
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Useful Link</h6>
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Events</a>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">FAQ</a>
        </nav>
        <nav>
          <h6 className="footer-title">Main Menu</h6>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Offer</a>
          <a className="link link-hover">Menus</a>
          <a className="link link-hover">Reservation</a>
        </nav>
        <nav>
          <h6 className="footer-title">Contact Us</h6>
          <a className="link link-hover">barcardirestaurant@gmail.com</a>
          <a className="link link-hover">+2349019445309</a>
          <a className="link link-hover">Social Handle</a>
        </nav>
      </footer>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
  <aside>
    <p>Copyright © 2024 - All right reserved by AJ Innovation Afrika</p>
  </aside>
</footer>
    </div>
  );
};

export default Footer;
