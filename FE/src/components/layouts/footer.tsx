import viteLogo from '/vite.svg'
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';

const Footer = () => {
  return (
    <div className=" py-8">
      <div className="container mx-auto flex justify-between items-center">
        <div>
        <div className='flex gap-4 mb-3'>
        <img src={viteLogo} alt="Logo" className="h-8" />
        <h2 className="text-xl font-bold mb-2">Voyce.Me</h2>
        </div>
          <div className="flex space-x-4">
            <Facebook className="text-gray-600" />
            <Twitter className="text-gray-600" />
            <Instagram className="text-gray-600" />
            <YouTube className="text-gray-600" />
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-2">Download the app</h3>
          <div className="flex space-x-2">
            <img src="/path/to/appstore.png" alt="App Store" className="h-8" />
            <img src="/path/to/googleplay.png" alt="Google Play" className="h-8" />
          </div>
          <p className="mt-2">Contact us: voyceme@voyce.me</p>
        </div>
        <div>
          <h3 className="font-bold mb-2">Sign up</h3>
          <p>Get notified about new changes to VoyceMe!</p>
          <div className="flex mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 border border-gray-300 rounded-l"
            />
            <button className="bg-red-600 text-white px-4 rounded-r">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 flex justify-between text-gray-600">
        <div>Terms and Conditions | Privacy Policy | FAQ</div>
        <div>© 2024 VoyceMe. All rights reserved.</div>
      </div>
    </div>
  );
};

export default Footer;