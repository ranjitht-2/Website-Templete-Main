import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { 
  ArrowUpRight, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Building, 
  User, 
  Sparkles, 
  ArrowLeft,
  KeyRound,
  FileCode2,
  Cpu
} from "lucide-react";

export const SignInPage = ({ currentUser, onLogin, onLogout }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isProjectRedirect = searchParams.get("redirect") === "project";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter both your corporate email and password.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    setTimeout(() => {
      // Create user from email domain
      const nameParts = email.split("@")[0].split(".");
      const formattedName = nameParts
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ");
      const companyDomain = email.includes("@") ? email.split("@")[1].split(".")[0] : "Enterprise";
      const formattedCompany = companyDomain.charAt(0).toUpperCase() + companyDomain.slice(1) + " Corp";

      const authenticatedUser = {
        id: "USR-" + Math.floor(1000 + Math.random() * 9000),
        name: formattedName || "Executive Member",
        email: email,
        company: formattedCompany,
        role: "Principal Architecture Lead",
        tier: "Enterprise Partner",
        avatarInitials: formattedName ? formattedName.split(" ").map(n => n[0]).join("").slice(0, 2) : "EM"
      };

      onLogin(authenticatedUser);
      setIsLoading(false);
      setLoginSuccess(true);

      setTimeout(() => {
        if (isProjectRedirect) {
          navigate("/?openProject=true", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }, 900);
    }, 600);
  };

  return (
    <div style={{ paddingTop: "calc(var(--nav-height) + 1.5rem)", minHeight: "100vh" }} className="bg-sand">
      <div className="editorial-wrap" style={{ paddingBottom: "5rem" }}>
        
        {/* Navigation Breadcrumb & Back button */}
        <div style={{ marginBottom: "2.5rem" }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              color: "var(--text-espresso-muted)",
              fontSize: "0.9rem",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              transition: "color 0.2s ease"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-espresso)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-espresso-muted)")}
          >
            <ArrowLeft size={16} />
            <span>Return to Kinesis Global</span>
          </Link>
        </div>

        {/* Project Scoping Callout Banner */}
        {isProjectRedirect && (
          <div
            style={{
              backgroundColor: "var(--bg-espresso)",
              color: "var(--text-cream)",
              borderRadius: "20px",
              padding: "1.25rem 1.75rem",
              marginBottom: "2.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              border: "1px solid rgba(210, 245, 53, 0.3)",
              boxShadow: "0 10px 30px rgba(30, 22, 17, 0.15)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(210, 245, 53, 0.15)",
                  color: "var(--accent-chartreuse)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
              >
                <Cpu size={22} />
              </div>
              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--accent-chartreuse)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}>
                  [START A PROJECT · VERIFICATION GATE]
                </div>
                <div style={{ fontSize: "1rem", fontWeight: "600", color: "#fff", marginTop: "2px" }}>
                  Sign in to authenticate your enterprise project brief and direct architecture scoping.
                </div>
              </div>
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-cream-dim)" }}>
              One-click access available below ↓
            </div>
          </div>
        )}

        {/* Dual-Column Split Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(2rem, 5vw, 4.5rem)",
            alignItems: "start"
          }}
        >
          {/* Left Column: Context & Editorial Assurance */}
          <div>
            <div className="editorial-tag" style={{ color: "var(--bg-terracotta)", marginBottom: "1rem" }}>
              INSTITUTIONAL ACCESS PORTAL
            </div>

            <h1 className="hero-serif-title" style={{ fontSize: "clamp(2.4rem, 4vw, 3.4rem)", lineHeight: 1.15, marginBottom: "1.5rem" }}>
              Sign in to your <br />
              <span style={{ fontStyle: "italic", color: "var(--bg-terracotta)" }}>systems partner</span> portal.
            </h1>

            <p style={{ fontSize: "1.1rem", color: "var(--text-espresso-muted)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "520px" }}>
              {isProjectRedirect
                ? "Connecting with KINESIS GLOBAL unlocks dedicated Principal Architects, custom telemetry pipelines, and rapid project deployment scopes."
                : "Manage ongoing digital architecture initiatives, review confidential technical blueprints, and synchronize with practice leadership."}
            </p>

            {/* Already logged in view */}
            {currentUser && (
              <div
                style={{
                  backgroundColor: "var(--bg-sand-light)",
                  border: "2px solid var(--bg-espresso)",
                  borderRadius: "20px",
                  padding: "1.75rem",
                  marginBottom: "2.5rem",
                  boxShadow: "6px 6px 0 var(--bg-terracotta)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: "var(--bg-espresso)",
                      color: "var(--accent-chartreuse)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontFamily: "var(--font-mono)",
                      fontSize: "1.1rem"
                    }}
                  >
                    {currentUser.avatarInitials || "DS"}
                  </div>
                  <div>
                    <div style={{ fontSize: "1.05rem", fontWeight: "700", color: "var(--text-espresso)" }}>
                      {currentUser.name}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-espresso-muted)" }}>
                      {currentUser.role} · {currentUser.company}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
                  <button
                    className="pill-btn pill-btn-dark"
                    style={{ fontSize: "0.85rem", padding: "0.6rem 1.25rem" }}
                    onClick={() => navigate("/?openProject=true")}
                  >
                    <span>Launch Project Brief</span>
                    <ArrowUpRight size={15} />
                  </button>
                  <button
                    className="pill-btn pill-btn-outline"
                    style={{ fontSize: "0.85rem", padding: "0.6rem 1.25rem" }}
                    onClick={onLogout}
                  >
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}

            {/* Enterprise Security Highlights */}
            <div style={{ borderTop: "1px solid var(--border-espresso-thin)", paddingTop: "2rem" }}>
              <div style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)", color: "var(--text-espresso-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                Enterprise Security Standards
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                  <ShieldCheck size={20} style={{ color: "var(--bg-terracotta)", flexShrink: 0, marginTop: "2px" }} />
                  <div style={{ fontSize: "0.95rem", color: "var(--text-espresso)" }}>
                    <strong>Mutual NDA Guaranteed:</strong> All project specifications, proprietary data models, and team dialogues are legally protected.
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                  <Lock size={20} style={{ color: "var(--bg-terracotta)", flexShrink: 0, marginTop: "2px" }} />
                  <div style={{ fontSize: "0.95rem", color: "var(--text-espresso)" }}>
                    <strong>End-to-End Cryptographic Isolation:</strong> Zero cross-tenant data retention and automated VPC scoping.
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                  <Building size={20} style={{ color: "var(--bg-terracotta)", flexShrink: 0, marginTop: "2px" }} />
                  <div style={{ fontSize: "0.95rem", color: "var(--text-espresso)" }}>
                    <strong>Direct Executive Channel:</strong> Immediate 24h escalation to Lead Architecture Committee.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Sign In Card */}
          <div
            style={{
              backgroundColor: "var(--bg-sand-light)",
              border: "2px solid var(--bg-espresso)",
              borderRadius: "28px",
              padding: "clamp(2rem, 4vw, 3.25rem)",
              boxShadow: "14px 14px 0 var(--bg-espresso)",
              position: "relative"
            }}
          >
            {/* Success Overlay Animation */}
            {loginSuccess && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(250, 247, 242, 0.96)",
                  backdropFilter: "blur(6px)",
                  borderRadius: "26px",
                  zIndex: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2rem",
                  textAlign: "center"
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundColor: "var(--bg-espresso)",
                    color: "var(--accent-chartreuse)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                    boxShadow: "0 8px 24px rgba(30, 22, 17, 0.2)"
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", color: "var(--text-espresso)", marginBottom: "0.5rem" }}>
                  Authentication Verified
                </h3>
                <p style={{ color: "var(--text-espresso-muted)", fontSize: "0.95rem", maxWidth: "340px" }}>
                  Welcome to Kinesis Global. Loading your {isProjectRedirect ? "project scoping session" : "enterprise environment"}...
                </p>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div
                style={{
                  backgroundColor: "rgba(226, 120, 99, 0.12)",
                  color: "var(--bg-clay)",
                  padding: "0.85rem 1.2rem",
                  borderRadius: "12px",
                  fontSize: "0.9rem",
                  marginBottom: "1.5rem",
                  border: "1px solid var(--accent-coral)"
                }}
              >
                {errorMessage}
              </div>
            )}

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Corporate Email */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    fontFamily: "var(--font-mono)",
                    fontWeight: "700",
                    color: "var(--text-espresso)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "0.5rem"
                  }}
                >
                  Corporate Email
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@enterprise-domain.com"
                    style={{
                      width: "100%",
                      padding: "0.9rem 1rem 0.9rem 2.8rem",
                      borderRadius: "14px",
                      border: "2px solid var(--bg-espresso)",
                      backgroundColor: "#fff",
                      fontSize: "0.95rem",
                      fontFamily: "var(--font-sans)",
                      color: "var(--text-espresso)",
                      outline: "none",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease"
                    }}
                    onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 4px var(--accent-chartreuse-glow)")}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                  <Mail
                    size={18}
                    style={{
                      position: "absolute",
                      left: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--text-espresso-dim)"
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <label
                    style={{
                      fontSize: "0.8rem",
                      fontFamily: "var(--font-mono)",
                      fontWeight: "700",
                      color: "var(--text-espresso)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em"
                    }}
                  >
                    Password
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Password reset instructions have been dispatched to your corporate security administrator.");
                    }}
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--bg-terracotta)",
                      textDecoration: "none",
                      fontWeight: "600"
                    }}
                  >
                    Forgot credentials?
                  </a>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter account security key"
                    style={{
                      width: "100%",
                      padding: "0.9rem 2.8rem 0.9rem 2.8rem",
                      borderRadius: "14px",
                      border: "2px solid var(--bg-espresso)",
                      backgroundColor: "#fff",
                      fontSize: "0.95rem",
                      fontFamily: "var(--font-sans)",
                      color: "var(--text-espresso)",
                      outline: "none",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease"
                    }}
                    onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 4px var(--accent-chartreuse-glow)")}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                  <KeyRound
                    size={18}
                    style={{
                      position: "absolute",
                      left: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--text-espresso-dim)"
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "var(--text-espresso-muted)",
                      cursor: "pointer",
                      padding: "4px"
                    }}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    width: "18px",
                    height: "18px",
                    accentColor: "var(--bg-espresso)",
                    cursor: "pointer"
                  }}
                />
                <label htmlFor="remember-me" style={{ fontSize: "0.85rem", color: "var(--text-espresso-muted)", cursor: "pointer" }}>
                  Remember this workstation session for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="pill-btn pill-btn-dark"
                style={{ width: "100%", justifyContent: "center", padding: "1rem 1.5rem", fontSize: "0.95rem" }}
                disabled={isLoading}
              >
                <span>{isLoading ? "Verifying Credentials..." : "Authenticate & Enter"}</span>
                <ArrowUpRight size={18} />
              </button>
            </form>

            {/* Footer Assurance */}
            <div style={{ marginTop: "2rem", textAlign: "center", fontSize: "0.8rem", color: "var(--text-espresso-dim)" }}>
              Protected by Enterprise Zero-Trust & SOC 2 Protocol.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
