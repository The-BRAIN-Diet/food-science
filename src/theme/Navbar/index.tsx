import React, { useEffect } from 'react';
import Navbar from '@theme-original/Navbar';
import type NavbarType from '@theme/Navbar';
import type { WrapperProps } from '@docusaurus/types';
import MobileNav from '@site/src/components/MobileNav';

type Props = WrapperProps<typeof NavbarType>;

export default function NavbarWrapper(props: Props): JSX.Element {
  useEffect(() => {
    let navbar: HTMLElement | null = null;
    
    const findNavbar = (): HTMLElement | null => {
      return document.querySelector('.navbar') as HTMLElement;
    };

    const handleScroll = () => {
      if (!navbar) {
        navbar = findNavbar();
      }
      if (navbar) {
        const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        if (scrollY > 50) {
          navbar.classList.add('navbar-scrolled');
        } else {
          navbar.classList.remove('navbar-scrolled');
        }
      }
    };

    // Try to find navbar immediately
    navbar = findNavbar();
    
    // Use MutationObserver to watch for navbar being added to DOM
    const observer = new MutationObserver(() => {
      if (!navbar) {
        navbar = findNavbar();
        if (navbar) {
          handleScroll();
        }
      }
    });

    // Observe the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();
    
    // Also check after delays to catch late-rendering
    const timeout1 = setTimeout(handleScroll, 100);
    const timeout2 = setTimeout(handleScroll, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  return (
    <>
      <Navbar {...props} />
      <MobileNav />
    </>
  );
}
