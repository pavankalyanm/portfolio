import React from 'react';

const Header = () => {
  return (
    <nav className='space-x-10' style={{marginTop:'75px',marginRight:'80px'}}>
      <ul className='flex flex-row space-x-4 md:space-x-10 md:text-xl justify-center md:justify-end font-thin'>
        <li>
          <a href='#projects' className='border border-gray-300 px-4 py-2 rounded-lg text-sm'>
            Projects
          </a>
        </li>
        <li>
          <a href='#contact' className='border border-gray-300 px-4 py-2 rounded-lg text-sm'>
            Contact
          </a>
        </li>
        <li>
          <a href='./mainresume.pdf' target='_blank' rel='noreferrer' className='border border-gray-300 px-4 py-2 rounded-lg text-sm'>
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
