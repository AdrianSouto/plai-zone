import React from "react";

interface WinnerScreenProps {
  isVisible: boolean;
  winnerName?: string;
  onClose: () => void;
}

const WinnerScreen: React.FC<WinnerScreenProps> = ({ isVisible, winnerName, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-indigo-500 bg-opacity-25 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p className="text-lg mb-6">Player {winnerName} is the winner!</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WinnerScreen;