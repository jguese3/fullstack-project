// LoginPrompt — shown when a user tries to access a page that requires auth.
// I.1: "Components are only interacted with in ways sensible to logged-in/logged-out user."

import { SignInButton } from '@clerk/clerk-react';

interface LoginPromptProps {
  feature: string; // e.g. "your watchlist" or "write reviews"
}

const LoginPrompt = ({ feature }: LoginPromptProps) => (
  <main className="page-main">
    <div className="login-prompt-page">
      <span className="login-prompt-icon">🔒</span>
      <h2 className="login-prompt-heading">Sign in to access {feature}</h2>
      <p className="login-prompt-text">
        Create a free account or sign in to get started. Browsing the catalogue is available to everyone.
      </p>
      <SignInButton mode="modal">
        <button className="form-submit login-prompt-btn">Sign In / Register</button>
      </SignInButton>
    </div>
  </main>
);

export default LoginPrompt;
