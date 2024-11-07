import { useState } from 'react';

const ProfilePopover = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={togglePopover}
        className="flex items-center focus:outline-none"
      >
        <img
          src="https://via.placeholder.com/40" // Replace with your profile picture URL
          alt="Profile"
          className="rounded-full"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="p-4">
            <h2 className="font-bold">User Name</h2>
            <p className="text-sm text-gray-600">user@example.com</p>
          </div>
          <div className="border-t border-gray-200">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePopover;
