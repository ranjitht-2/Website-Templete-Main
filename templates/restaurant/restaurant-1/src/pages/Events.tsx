import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Events: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [chefTableSuccess, setChefTableSuccess] = useState<string | null>(null);
  const [buyoutSuccess, setBuyoutSuccess] = useState<string | null>(null);
  const [chefLoading, setChefLoading] = useState(false);
  const [buyoutLoading, setBuyoutLoading] = useState(false);

  // Check if returning from signin with pending event action
  useEffect(() => {
    const pendingAction = sessionStorage.getItem('restaurant_1_pending_event_action');
    if (pendingAction && isAuthenticated && user) {
      if (pendingAction === 'chef_table') {
        setChefTableSuccess(`Chef’s Live Hearth Table requested for ${user.name}! Our sommelier team will confirm your Friday seating at ${user.email}.`);
      } else if (pendingAction === 'private_buyout') {
        setBuyoutSuccess(`Private Mezzanine Buyout inquiry received for ${user.name}. A customized dining proposal has been dispatched to ${user.email}.`);
      }
      sessionStorage.removeItem('restaurant_1_pending_event_action');
    }
  }, [isAuthenticated, user]);

  const handleChefTableRequest = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('restaurant_1_pending_event_action', 'chef_table');
      navigate('/signin?redirect=/events&reason=Please+sign+in+to+request+the+Chef’s+Live+Hearth+Table');
      return;
    }

    setChefLoading(true);
    setTimeout(() => {
      setChefLoading(false);
      setChefTableSuccess(`Chef’s Live Hearth Table requested for ${user?.name}! Our sommelier team will confirm your Friday seating at ${user?.email}.`);
    }, 800);
  };

  const handleBuyoutInquiry = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('restaurant_1_pending_event_action', 'private_buyout');
      navigate('/signin?redirect=/events&reason=Please+sign+in+to+submit+a+private+dining+buyout+inquiry');
      return;
    }

    setBuyoutLoading(true);
    setTimeout(() => {
      setBuyoutLoading(false);
      setBuyoutSuccess(`Private Mezzanine Buyout inquiry received for ${user?.name}. A customized dining proposal has been dispatched to ${user?.email}.`);
    }, 800);
  };

  return (
    <>
      {/* Banner */}
      <section className="py-5 bg-primary-dark text-center" style={{ paddingTop: '8rem' }}>
        <div className="container py-5">
          <span className="eyebrow eyebrow-light">EXPERIENCES & PRIVATE DINING</span>
          <h1 className="display-3 font-heading text-cream mb-3">Celebrations Around the Hearth</h1>
          <p className="section-subtitle text-muted-light mx-auto" style={{ maxWidth: '650px' }}>
            Tailored culinary gatherings, intimate Chef’s table reservations, and exclusive mezzanine buyouts.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="section-py bg-cream-light">
        <div className="container">
          {/* Chef Table Section */}
          <div className="row g-5 align-items-center mb-5">
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=900&auto=format&fit=crop"
                alt="Chef Table"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
            <div className="col-lg-6">
              <span className="eyebrow">EXCLUSIVE SEATING</span>
              <h2 className="section-heading mb-3">Chef’s Live Hearth Table</h2>
              <p className="text-muted-custom fs-5 mb-3">Every Friday Evening &bull; 8 Guests Maximum</p>
              <p className="text-muted-custom mb-4">
                Sit directly before our live fire kitchen and enjoy an 8-course omakase-style hearth menu personally crafted and introduced by Chef Arjun Rao and our head sommelier.
              </p>

              {chefTableSuccess ? (
                <div className="p-3 bg-white border border-gold rounded-2 text-gold fw-semibold">
                  <i className="bi bi-check-circle-fill me-2"></i> {chefTableSuccess}
                </div>
              ) : (
                <button 
                  type="button" 
                  onClick={handleChefTableRequest} 
                  className="btn-ember-primary"
                  disabled={chefLoading}
                >
                  {chefLoading ? 'Processing Request...' : 'Request Chef’s Table'}
                </button>
              )}
            </div>
          </div>

          <hr className="border-secondary opacity-25 my-5" />

          {/* Private Buyout Section */}
          <div className="row g-5 align-items-center mb-5 flex-lg-row-reverse">
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=900&auto=format&fit=crop"
                alt="Private Mezzanine Dining"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
            <div className="col-lg-6">
              <span className="eyebrow">PRIVATE BUYOUTS</span>
              <h2 className="section-heading mb-3">The Mezzanine Private Room</h2>
              <p className="text-muted-custom fs-5 mb-3">Up to 24 Guests Seated &bull; Dedicated Service</p>
              <p className="text-muted-custom mb-4">
                An atmospheric private salon overlooking the main dining room with its own bespoke hearth bar, dedicated sommelier, and custom printed four-course menus.
              </p>

              {buyoutSuccess ? (
                <div className="p-3 bg-white border border-gold rounded-2 text-gold fw-semibold">
                  <i className="bi bi-check-circle-fill me-2"></i> {buyoutSuccess}
                </div>
              ) : (
                <button 
                  type="button" 
                  onClick={handleBuyoutInquiry} 
                  className="btn-ember-outline"
                  disabled={buyoutLoading}
                >
                  {buyoutLoading ? 'Submitting Inquiry...' : 'Inquire for Private Buyout'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
