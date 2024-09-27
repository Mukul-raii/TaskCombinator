import React from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

const Footbar = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 ">
      <div className="container mx-auto flex flex-row justify-between text-lg">
        <p>
          Built with 💻 by <a href="#" className="text-purple-400">Nobita</a>
        </p>
        <div className="flex justify-center space-x-4 mt-2 flex-row gap-8">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-400">
            <FaGithub className="h-6 w-6" />
          </a>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-400">
            <FaTwitter className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footbar;
