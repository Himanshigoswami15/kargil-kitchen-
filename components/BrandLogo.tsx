import React from 'react';

// Instructions:
// To use your specific logo file:
// 1. Place your image file (e.g., logo.png) in your project's public folder.
// 2. Update the 'src' attribute below to point to your file (e.g., src="/logo.png").
// Note: If your logo is a PDF, please convert it to an image format (PNG or JPG) first for best web compatibility.

const BrandLogo: React.FC<{ className?: string }> = ({ className = "w-64 h-64" }) => {
  return (
    <img 
      // Replace this placeholder URL with your actual logo path
      src="https://ik.imagekit.io/j1fgksdwx/ChatGPT%20Image%20Feb%2016,%202026,%2006_12_08%20PM.png"
      alt="Kargil Kitchen Logo" 
      className={`object-contain ${className}`}
    />
  );
};

export default BrandLogo;