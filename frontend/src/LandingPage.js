import React, { useEffect } from 'react';

function LandingPage() {
  useEffect(() => {
    window.location.href = '/landing.html';
  }, []);

  return null;
}

export default LandingPage;