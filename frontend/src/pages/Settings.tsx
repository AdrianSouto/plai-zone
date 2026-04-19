import { useState } from "react";

interface SettingsProps {
  currentSize: number;
  onSave: (size: number) => void;
  onCancel: () => void;
}

export default function Settings({ currentSize, onSave, onCancel }: SettingsProps) {
  const [size, setSize] = useState(currentSize);

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Ajustes</h2>

        <label className="block text-sm text-purple-200 mb-2">Tamaño del tablero</label>
        <select
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full p-2 rounded bg-slate-800 text-white border border-white/10 mb-4"
        >
          {[6,7,8,9,10,11,12].map(n => (
            <option key={n} value={n}>{n} x {n}</option>
          ))}
        </select>

        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 bg-white/10 text-white rounded">Cancelar</button>
          <button onClick={() => onSave(size)} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded">Guardar</button>
        </div>
      </div>
    </div>
  );
}
