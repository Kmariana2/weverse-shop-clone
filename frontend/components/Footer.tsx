'use client';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">About Weverse</a></li>
              <li><a href="#" className="hover:text-black">Brand Story</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">Help Center</a></li>
              <li><a href="#" className="hover:text-black">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Social</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">Twitter</a></li>
              <li><a href="#" className="hover:text-black">Instagram</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">HYBE</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">HYBE Headquarters</a></li>
              <li><a href="#" className="hover:text-black">HYBE Global</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 text-center text-sm text-gray-600">
          <p>© 2026 Weverse Shop. All rights reserved. BTS Official Merchandise.</p>
        </div>
      </div>
    </footer>
  );
}
