function Footer() {
    return (
      <footer className="bg-dark text-white mt-5 py-4">
        <div className="container text-center">
          <p className="mb-2">&copy; {new Date().getFullYear()} Gamezy. All rights reserved.</p>
          <div>
            <a href="#" className="text-white me-3 text-decoration-none">Privacy Policy</a>
            <a href="#" className="text-white me-3 text-decoration-none">Terms of Service</a>
            <a href="#" className="text-white text-decoration-none">Contact</a>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  