"use client";

const ProtectedPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Page Protégée</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-700">
            Bienvenue sur la page protégée. Votre clé API a été validée avec succès.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProtectedPage; 