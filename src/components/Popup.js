"use client";
import { useState } from "react";
import { Trash2, Pencil, Download } from "lucide-react";

export default function Popup({
  triggerText = "Abrir Popup",
  classTrigger,
  type = "delete", // delete | edit | download
  title,
  userName,
  options = [], // usado no edit/download
  onConfirm,
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [selected, setSelected] = useState(type === "download" ? [] : null);

  // Configurações por tipo
  const config = {
    delete: {
      icon: <Trash2 size={40} className="text-red-600" />,
      confirmText: "Solicitar",
      confirmColor: "bg-red-600 hover:bg-red-700",
    },
    edit: {
      icon: <Pencil size={40} className="text-yellow-500" />,
      confirmText: "Continuar",
      confirmColor: "bg-yellow-400 hover:bg-yellow-500 text-black",
    },
    download: {
      icon: <Download size={40} className="text-blue-600" />,
      confirmText: "Download",
      confirmColor: "bg-blue-600 hover:bg-blue-700 text-white",
    },
  };

  // Seleção
  const handleSelect = (opt) => {
    if (type === "download") {
      setSelected((prev) =>
        prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
      );
    } else {
      setSelected(opt);
    }
  };

  const handleConfirm = () => {
    if (type === "delete") {
      onConfirm?.(reason);
    } else {
      onConfirm?.(selected);
    }
    setOpen(false);
  };

  return (
    <div className="flex justify-center items-center">
      {/* Botão que abre */}
      <button onClick={() => setOpen(true)} className={classTrigger}>
        {triggerText}
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] text-center">
            {/* Ícone */}
            <div className="flex justify-center mb-4">{config[type].icon}</div>

            {/* Texto */}
            <p className="text-lg font-medium mb-4">
              {title}{" "}
              {userName && (
                <span className="text-blue-600 font-semibold">{userName}</span>
              )}
            </p>

            {/* Conteúdo condicional */}
            {type === "delete" && (
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Escreva o motivo da exclusão"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
                rows="3"
              ></textarea>
            )}

            {(type === "edit" || type === "download") && (
              <div className="flex flex-col gap-2 mb-4">
                {options.map((opt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(opt)}
                    className={`px-3 py-2 rounded-lg border text-sm transition ${
                      type === "download"
                        ? selected.includes(opt)
                          ? "bg-blue-100 border-blue-400 text-blue-800"
                          : "bg-gray-100 hover:bg-gray-200"
                        : selected === opt
                        ? "bg-yellow-100 border-yellow-400 text-yellow-800"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Botões */}
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 bg-gray-200 text-gray-600 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                disabled={
                  (type === "delete" && !reason.trim()) ||
                  (type === "edit" && !selected) ||
                  (type === "download" && selected.length === 0)
                }
                className={`flex-1 py-2 rounded-lg transition ${
                  config[type].confirmColor
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {config[type].confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
