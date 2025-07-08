"use client";
import SectionTitle from "./common/SectionTitle";
import Button from "./common/Button";

const Contact = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <SectionTitle
              title="Get In Touch"
              subtitle="Contact Us"
              description="Have a project in mind or want to discuss your requirements? We'd love to hear from you."
            />

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-primary text-xl mt-1">📧</div>
                <div>
                  <h4 className="font-bold text-dark">Email</h4>
                  <p className="text-gray-600">contact@techsolutions.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-primary text-xl mt-1">📱</div>
                <div>
                  <h4 className="font-bold text-dark">Phone</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-primary text-xl mt-1">📍</div>
                <div>
                  <h4 className="font-bold text-dark">Location</h4>
                  <p className="text-gray-600">
                    123 Tech Street, San Francisco, CA
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <form className="bg-white p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your Email"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="subject" className="block text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Subject"
                />
              </div>

              <div className="mt-6">
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your Message"
                ></textarea>
              </div>

              <div className="mt-8">
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
