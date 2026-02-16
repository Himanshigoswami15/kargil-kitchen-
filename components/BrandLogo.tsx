import React from 'react';

const BrandLogo: React.FC<{ className?: string }> = ({ className = "w-64 h-64" }) => {
  return (
    <img 
      src="https://ik.imagekit.io/j1fgksdwx/ChatGPT%20Image%20Feb%2016,%202026,%2006_12_08%20PM.png?updatedAt=1771245805784" 
      alt="Kargil Kitchen Logo" 
      className={`object-contain ${className}`}
    />
  );
};

export default BrandLogo;