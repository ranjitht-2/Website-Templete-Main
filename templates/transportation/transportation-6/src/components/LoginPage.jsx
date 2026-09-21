import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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

export default function LoginPage({ initialMode = 'signin' }) {
  const [mode, setMode] = useState(initialMode);
  const location = useLocation();
  const path = (location.pathname + location.hash + (typeof window !== 'undefined' ? window.location.pathname : '')).toLowerCase();

  let DesignComponent = VoltwayAuth;
  let templateName = 'VOLTWAY';
  if (path.includes('roadline') || path.includes('transportation-2')) { DesignComponent = RoadlineAuth; templateName = 'ROADLINE'; }
  else if (path.includes('fleetrise') || path.includes('transportation-3')) { DesignComponent = FleetriseAuth; templateName = 'FLEETRISE'; }
  else if (path.includes('skyroute') || path.includes('transportation-4')) { DesignComponent = SkyrouteAuth; templateName = 'SKYROUTE'; }
  else if (path.includes('citymove') || path.includes('transportation-5')) { DesignComponent = CitymoveAuth; templateName = 'CITYMOVE'; }
  else if (path.includes('transitflow') || path.includes('transportation-6')) { DesignComponent = TransitflowAuth; templateName = 'TRANSITFLOW'; }
  else if (path.includes('cargomax') || path.includes('transportation-7')) { DesignComponent = CargomaxAuth; templateName = 'CARGOMAX'; }
  else if (path.includes('rideora') || path.includes('transportation-8')) { DesignComponent = RideoraAuth; templateName = 'RIDEORA'; }
  else if (path.includes('railnova') || path.includes('transportation-9')) { DesignComponent = RailnovaAuth; templateName = 'RAILNOVA'; }
  else if (path.includes('oceanlink') || path.includes('transportation-10')) { DesignComponent = OceanlinkAuth; templateName = 'OCEANLINK'; }

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-6 left-6 z-20">
        <Link to="/" className="auth-ignore inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-full backdrop-blur-md transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to {templateName}
        </Link>
      </div>
      <div className="w-full max-w-lg z-10 my-10 auth-modal-container">
        <DesignComponent mode={mode} setMode={setMode} />
      </div>
    </div>
  );
}
