import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const InlineReservation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const [guests, setGuests] = useState('2 GUESTS');
  const [day, setDay] = useState('FRIDAY');
  const [time, setTime] = useState('08:30 PM');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Restore saved reservation parameters if present
  useEffect(() => {
    const saved = sessionStorage.getItem('restaurant_1_pending_reservation');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.guests) setGuests(parsed.guests);
        if (parsed.day) setDay(parsed.day);
        if (parsed.time) setTime(parsed.time);
      } catch (e) {
        console.error('Error parsing pending reservation:', e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const reservationPayload = { guests, day, time };

    if (!isAuthenticated) {
      sessionStorage.setItem('restaurant_1_pending_reservation', JSON.stringify(reservationPayload));
      const targetPath = location.pathname.includes('contact') ? '/contact#reservation' : '/#reservation';
      navigate(`/signin?redirect=${encodeURIComponent(targetPath)}&reason=Please+sign+in+to+complete+your+table+reservation`);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
      sessionStorage.removeItem('restaurant_1_pending_reservation');
    }, 1000);
  };

  return (
    <section className="reservation-editorial-section" id="reservation" data-section="find-table">
      <div id="find-table" style={{ position: 'relative', top: '-20px' }}></div>
      <div className="container">
        <span className="eyebrow-chapter">08 &bull; RESERVATIONS</span>
        <h2 className="font-heading display-3">COME TO THE TABLE</h2>

        <form id="inlineReservationForm" onSubmit={handleSubmit}>
          <div className="reservation-inline-picker">
            <select
              id="inlineGuests"
              className="inline-select-editorial"
              aria-label="Guests Count"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              <option value="1 GUEST">1 GUEST</option>
              <option value="2 GUESTS">2 GUESTS</option>
              <option value="4 GUESTS">4 GUESTS</option>
              <option value="6 GUESTS">6 GUESTS</option>
              <option value="8+ GUESTS">8+ GUESTS</option>
            </select>
            &bull;
            <select
              id="inlineDay"
              className="inline-select-editorial"
              aria-label="Reservation Day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="TODAY">TODAY</option>
              <option value="FRIDAY">FRIDAY</option>
              <option value="SATURDAY">SATURDAY</option>
              <option value="SUNDAY">SUNDAY</option>
            </select>
            &bull;
            <select
              id="inlineTime"
              className="inline-select-editorial"
              aria-label="Reservation Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="07:00 PM">07:00 PM</option>
              <option value="08:30 PM">08:30 PM</option>
              <option value="09:30 PM">09:30 PM</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn-ember-gold py-3 px-5 fs-5"
            id="btnInlineReserve"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>[ CHECKING... ]
              </>
            ) : isConfirmed ? (
              '[ REQUEST CONFIRMED ]'
            ) : (
              '[ FIND A TABLE ]'
            )}
          </button>
        </form>

        {isConfirmed && (
          <div id="reservationSuccessAlert" className="mt-4 text-gold fw-bold fs-5" style={{ display: 'block' }}>
            ✓ Table requested for {user?.name || 'Guest'}! Digital confirmation voucher sent to {user?.email || 'your email'}.
          </div>
        )}
      </div>
    </section>
  );
};

export default InlineReservation;
