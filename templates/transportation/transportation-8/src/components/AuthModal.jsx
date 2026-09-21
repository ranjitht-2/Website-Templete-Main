import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import VoltwayAuth from './auth-designs/VoltwayAuth';
import RoadlineAuth from './auth-designs/RoadlineAuth';
import FleetriseAuth from './auth-designs/FleetriseAuth';
import SkyrouteAuth from './auth-designs/SkyrouteAuth';
import CitymoveAuth from './auth-designs/CitymoveAuth';
import TransitflowAuth from './auth-designs/TransitflowAuth';
import CargomaxAuth from './auth-designs/CargomaxAuth';
import RideoraAuth from './auth-designs/RideoraAuth';
import RailnovaAuth from './auth-designs/RailnovaAuth';
import OceanlinkAuth from './auth-designs/OceanlinkAuth';

export default function AuthModal({ isOpen, onClose, mode, setMode, user, onLogin }) {
  if (!isOpen) return null;

  const path = (typeof window !== 'undefined' ? window.location.pathname + window.location.hash : '').toLowerCase();

  let DesignComponent = VoltwayAuth;
  if (path.includes('roadline') || path.includes('transportation-2')) DesignComponent = RoadlineAuth;
  else if (path.includes('fleetrise') || path.includes('transportation-3')) DesignComponent = FleetriseAuth;
  else if (path.includes('skyroute') || path.includes('transportation-4')) DesignComponent = SkyrouteAuth;
  else if (path.includes('citymove') || path.includes('transportation-5')) DesignComponent = CitymoveAuth;
  else if (path.includes('transitflow') || path.includes('transportation-6')) DesignComponent = TransitflowAuth;
  else if (path.includes('cargomax') || path.includes('transportation-7')) DesignComponent = CargomaxAuth;
  else if (path.includes('rideora') || path.includes('transportation-8')) DesignComponent = RideoraAuth;
  else if (path.includes('railnova') || path.includes('transportation-9')) DesignComponent = RailnovaAuth;
  else if (path.includes('oceanlink') || path.includes('transportation-10')) DesignComponent = OceanlinkAuth;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md auth-modal-overlay">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: 15 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.94, y: 15 }} 
          transition={{ duration: 0.25 }} 
          className="relative z-10 w-full max-w-lg auth-modal-container"
        >
          <DesignComponent mode={mode} setMode={setMode} onClose={onClose} onLogin={onLogin} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
