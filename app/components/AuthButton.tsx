import { useSession, signIn, signOut } from "next-auth/react";

export function AuthButton() {
  const { data: session, status } = useSession();

  const handleLogin = async () => {
    await signIn("google");
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="w-full flex justify-center mt-6">
      <button
        onClick={session ? handleLogout : handleLogin}
        className="rounded-full pl-8 pr-16 py-4 bg-white border border-gray-300 text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition text-base flex items-center gap-4"
      >
        <img src="/google.svg" alt="Google" className="w-6 h-6" />
        <span className="px-4">{session ? 'Se déconnecter' : 'Se connecter avec Google'}</span>
      </button>
    </div>
  );
} 