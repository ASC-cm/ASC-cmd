const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ASC-cm</h3>
            <p className="text-gray-400">
              Building digital experiences that drive results.
            </p>
          </div>
          {/* Add more footer sections as needed */}
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} ASC-cm. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
