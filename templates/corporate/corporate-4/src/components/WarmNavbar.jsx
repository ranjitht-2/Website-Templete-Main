import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Menu, X, User, LogOut, CheckCircle2, ShieldCheck } from "lucide-react";

export const WarmNavbar = ({ onOpenProjectModal, currentUser, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileDrawerOpen]);

  const handleLinkClick = () => {
    setMobileDrawerOpen(false);
  };

  return (
    <>
      <header className={`warm-editorial-header ${scrolled ? "scrolled" : ""}`}>
        <div className="editorial-nav-container">
          {/* Left: Brand Identity in Heavy Editorial Serif */}
          <Link to="/" className="warm-header-brand" aria-label="KINESIS GLOBAL Home">
            <span className="brand-primary">KINESIS</span>
            <span className="brand-descriptor">GLOBAL</span>
            <span className="brand-dot">.</span>
          </Link>

          {/* Center: Navigation Links */}
          <ul className="editorial-nav-links">
            <li className="editorial-nav-item">
              <NavLink to="/about">ABOUT</NavLink>
            </li>
            <li className="editorial-nav-item">
              <NavLink to="/services">CAPABILITIES</NavLink>
            </li>
            <li className="editorial-nav-item">
              <NavLink to="/solutions">SOLUTIONS</NavLink>
            </li>
            <li className="editorial-nav-item">
              <NavLink to="/industries">INDUSTRIES</NavLink>
            </li>
            <li className="editorial-nav-item">
              <NavLink to="/work">WORK</NavLink>
            </li>
            <li className="editorial-nav-item">
              <NavLink to="/insights">INSIGHTS</NavLink>
            </li>
            <li className="editorial-nav-item">
              <NavLink to="/contact">CONTACT</NavLink>
            </li>
          </ul>

          {/* Right: Auth Badge / Sign In + Start a Project CTA & Mobile Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            
            {/* Authenticated User Status or Sign In Link */}
            {currentUser ? (
              <div 
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "rgba(30, 22, 17, 0.06)",
                  padding: "4px 10px 4px 6px",
                  borderRadius: "99px",
                  border: "1px solid var(--border-espresso-thin)"
                }}
                title={`Signed in as ${currentUser.name} (${currentUser.company})`}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "var(--bg-espresso)",
                    color: "var(--accent-chartreuse)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    fontFamily: "var(--font-mono)"
                  }}
                >
                  {currentUser.avatarInitials || "DS"}
                </div>
                <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "var(--text-espresso)" }}>
                  {currentUser.name.split(" ")[0]}
                </span>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-espresso-muted)",
                    display: "flex",
                    alignItems: "center",
                    padding: "2px",
                    marginLeft: "2px"
                  }}
                  aria-label="Sign Out"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <NavLink
                to="/signin"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.78rem",
                  fontWeight: "700",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-espresso)",
                  textDecoration: "none",
                  padding: "0.55rem 0.95rem",
                  borderRadius: "99px",
                  letterSpacing: "0.08em",
                  border: "1px solid var(--border-espresso-thin)",
                  backgroundColor: "rgba(255,255,255,0.4)"
                }}
              >
                <User size={13} />
                <span>SIGN IN</span>
              </NavLink>
            )}

            {/* Start a Project Primary Action */}
            <button className="pill-btn pill-btn-dark header-cta-pill" onClick={onOpenProjectModal}>
              <span>START A PROJECT</span>
              <ArrowUpRight size={16} />
            </button>

            {/* Mobile Menu Circle Button */}
            <button
              className="mobile-menu-circle-btn"
              onClick={() => setMobileDrawerOpen(true)}
              aria-label="Open mobile navigation"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Drawer Backdrop */}
      {mobileDrawerOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setMobileDrawerOpen(false)}
        />
      )}

      {/* Mobile & Tablet Drawer */}
      <div className={`mobile-editorial-drawer ${mobileDrawerOpen ? "open" : ""}`}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1.25rem" }}>
          <Link
            to="/"
            onClick={handleLinkClick}
            style={{ textDecoration: "none", fontFamily: "var(--font-serif)", fontSize: "1.75rem", color: "#fff" }}
          >
            KINESIS<span style={{ fontSize: "0.85rem", fontFamily: "var(--font-mono)", color: "var(--accent-chartreuse)", marginLeft: "6px" }}>GLOBAL</span><span style={{ color: "var(--accent-chartreuse)" }}>.</span>
          </Link>
          <button
            onClick={() => setMobileDrawerOpen(false)}
            style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", cursor: "pointer", width: "42px", height: "42px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile User Profile if Authenticated */}
        {currentUser ? (
          <div
            style={{
              marginTop: "1.25rem",
              padding: "1rem",
              borderRadius: "16px",
              backgroundColor: "rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent-chartreuse)",
                  color: "var(--bg-espresso)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontFamily: "var(--font-mono)"
                }}
              >
                {currentUser.avatarInitials || "DS"}
              </div>
              <div>
                <div style={{ color: "#fff", fontSize: "0.9rem", fontWeight: "600" }}>{currentUser.name}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>{currentUser.company}</div>
              </div>
            </div>
            <button
              onClick={() => {
                onLogout();
                setMobileDrawerOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                color: "var(--accent-coral)",
                fontSize: "0.75rem",
                fontWeight: "700",
                cursor: "pointer",
                fontFamily: "var(--font-mono)"
              }}
            >
              SIGN OUT
            </button>
          </div>
        ) : (
          <div style={{ marginTop: "1rem" }}>
            <NavLink
              to="/signin"
              onClick={handleLinkClick}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--accent-chartreuse)",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: "700",
                fontFamily: "var(--font-mono)",
                padding: "0.6rem 0"
              }}
            >
              <User size={15} />
              <span>SIGN IN / PARTNER ACCESS →</span>
            </NavLink>
          </div>
        )}

        <ul className="mobile-drawer-links" style={{ marginTop: "1rem" }}>
          <li>
            <NavLink to="/" onClick={handleLinkClick}>
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={handleLinkClick}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" onClick={handleLinkClick}>
              Capabilities
            </NavLink>
          </li>
          <li>
            <NavLink to="/solutions" onClick={handleLinkClick}>
              Solutions & Blueprints
            </NavLink>
          </li>
          <li>
            <NavLink to="/industries" onClick={handleLinkClick}>
              Industry Sectors
            </NavLink>
          </li>
          <li>
            <NavLink to="/work" onClick={handleLinkClick}>
              Selected Work
            </NavLink>
          </li>
          <li>
            <NavLink to="/insights" onClick={handleLinkClick}>
              Insights & Essays
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={handleLinkClick}>
              Contact & RFPs
            </NavLink>
          </li>
        </ul>

        <div style={{ paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <button
            className="pill-btn pill-btn-chartreuse"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => {
              document.body.style.overflow = "auto";
              setMobileDrawerOpen(false);
              onOpenProjectModal();
            }}
          >
            <span>START A PROJECT</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
};
