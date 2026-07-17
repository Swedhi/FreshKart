import {
  Mail,
  Phone,
  MapPin,
  Truck,
  ShieldCheck,
  Clock3,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Section */}

        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-bold text-white">
              FreshKart
            </h2>

            <p className="mt-4 text-gray-300 leading-7">
              Fresh groceries delivered to your doorstep in just
              <span className="font-semibold text-white">
                {" "}30 minutes.
              </span>

              Shop vegetables, fruits, dairy products, groceries and
              daily essentials with fast and reliable delivery.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-300">

              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>

              <li>
                <a href="/products" className="hover:text-white transition">
                  Products
                </a>
              </li>

              <li>
                <a href="/cart" className="hover:text-white transition">
                  Cart
                </a>
              </li>

              <li>
                <a href="/wishlist" className="hover:text-white transition">
                  Wishlist
                </a>
              </li>

              <li>
                <a href="/orders" className="hover:text-white transition">
                  My Orders
                </a>
              </li>

            </ul>

          </div>

          {/* Services */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Why FreshKart?
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <Truck size={20} />
                <span>Fast Delivery</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock3 size={20} />
                <span>30 Minute Delivery</span>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck size={20} />
                <span>100% Fresh Products</span>
              </div>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Contact Us
            </h3>

            <div className="space-y-4 text-gray-300">

              <div className="flex items-center gap-3">
                <Mail size={18} />
                support@freshkart.com
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                +91 9876543210
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} />
                <span>
                  Lucknow,
                  Uttar Pradesh,
                  India
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="border-t border-green-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-300 text-sm">
            © 2026 FreshKart. All Rights Reserved.
          </p>

          <p className="text-gray-300 text-sm mt-3 md:mt-0">
            Built with ❤️ 
          </p>

        </div>

      </div>

    </footer>
  );
}