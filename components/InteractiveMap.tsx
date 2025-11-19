import React from 'react';

const InteractiveMap: React.FC = () => {
  const officeLocation = "123 Construction Ave, Dhaka, Bangladesh";
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(officeLocation)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg h-80 border-2 border-gray-700">
      <iframe
        title="Office Location Map"
        src={mapSrc}
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen={false}
        aria-hidden="false"
        tabIndex={0}
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default InteractiveMap;
