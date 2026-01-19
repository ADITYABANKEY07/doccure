import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

const ContactPage = () => {
  const contactDetails = [
    {
      icon: <Phone className="text-blue-600" size={24} />,
      title: "Call Us",
      info: "+1 555-0123-456",
      subInfo: "Mon-Sat 9am to 6pm"
    },
    {
      icon: <Mail className="text-blue-600" size={24} />,
      title: "Email Us",
      info: "support@doccure.com",
      subInfo: "Online support 24/7"
    },
    {
      icon: <MapPin className="text-blue-600" size={24} />,
      title: "Visit Us",
      info: "123 Healthcare Blvd",
      subInfo: "New York, NY 10001"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-600 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Have questions about booking an appointment or our services? Our team is here to help you 24/7.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-4">
            {contactDetails.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="p-3 bg-blue-50 rounded-xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{item.title}</h3>
                  <p className="text-blue-600 font-medium">{item.info}</p>
                  <p className="text-gray-400 text-xs">{item.subInfo}</p>
                </div>
              </div>
            ))}
            
            {/* Working Hours Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
               <div className="flex items-center gap-2 mb-4 text-gray-800 font-bold">
                 <Clock size={20} className="text-blue-600" />
                 <span>Working Hours</span>
               </div>
               <div className="space-y-2 text-sm text-gray-500">
                 <div className="flex justify-between"><span>Monday - Friday</span><span>08:00 - 20:00</span></div>
                 <div className="flex justify-between"><span>Saturday</span><span>09:00 - 18:00</span></div>
                 <div className="flex justify-between text-red-400"><span>Sunday</span><span>Emergency Only</span></div>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-8 lg:p-12 border border-gray-50">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <MessageSquare className="text-blue-600" /> Send us a Message
              </h2>
              <p className="text-gray-500 mt-2">We usually respond within 2 hours.</p>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Your Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-sm font-semibold text-gray-700">Subject</label>
                <input 
                  type="text" 
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-sm font-semibold text-gray-700">Message</label>
                <textarea 
                  rows="4"
                  placeholder="Describe your issue or question..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <button 
                  type="submit" 
                  className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                  <Send size={18} /> Send Message
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;