"use client";
import { useState, useEffect, useRef } from "react";
import { Trash2, Pencil, Download } from "lucide-react";
import { api } from "../services/api";
import { pdf } from "@react-pdf/renderer";
import DownloadPDF from "./pdf/DownloadPDF";
import { useRouter } from "next/navigation";

export default function Popup({
  triggerText = "Abrir Popup",
  classTrigger,
  type = "delete", // delete | edit | download
  title,
  userName,
  paciente,
  onConfirm,
}) {
  const transformaDatas = (data) => {
    const data2 = new Date(data);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "America/Sao_Paulo",
    };
    return new Intl.DateTimeFormat("pt-BR", options).format(data2);
  };

  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [selected, setSelected] = useState(type === "download" ? [] : null);
  const [examesPaciente, setExamesPaciente] = useState([]);
  const [dadosPaciente, setDadosPaciente] = useState();
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const router = useRouter();
  const observer = useRef(null);

  const fetchExamesPaciente = async (reset = false) => {
    if (!paciente) return;
    try {
      const { data } = await api.get(
        `/pacientes/${paciente.cpf}?page=${reset ? 1 : page}&limit=10`
      );
      if (reset) {
        setExamesPaciente(data.exames.lista);
      } else {
        setExamesPaciente((prev) => [...prev, ...data.exames.lista]);
      }
      setDadosPaciente(data.paciente);
      setHasMore(data.exames.lista.length > 0);
    } catch (err) {
      console.error("Erro ao buscar exames:", err);
    }
  };

  useEffect(() => {
    if (open) {
      setPage(1);
      fetchExamesPaciente(true);
    }
  }, [open]);

  // Scroll infinito
  const lastExamRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  useEffect(() => {
    if (page > 1) fetchExamesPaciente();
  }, [page]);

  const handleSelect = (opt) => {
    if (type === "download") {
      setSelected((prev) =>
        prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
      );
    } else {
      setSelected(opt);
    }
  };

  const handleDownload = async (exame) => {
    try {
      setLoading(true);
      const { data } = await api.get('/auth/perfil');
      const blob = await pdf(
        <DownloadPDF dados={exame} medico={data}/>
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `analise-${exame.nomeAmostra}-${dadosPaciente.nome}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (type === "delete") {
      onConfirm?.(reason);
    } else if (type === "edit") {
      onConfirm?.(selected);
    } else if (type === "download") {
      selected.forEach((exame) =>
        handleDownload({ ...exame, paciente: dadosPaciente })
      );
      onConfirm?.(selected);
    }
    setOpen(false);
  };

  return (
    <div className="flex justify-center items-center">
      <button onClick={() => setOpen(true)} className={classTrigger}>
        {triggerText}
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] text-center">
            {/* Ícone */}
            <div className="flex justify-center mb-4">
              {type === "delete" && (
                <Trash2 size={40} className="text-red-600" />
              )}
              {type === "edit" && (
                <Pencil size={40} className="text-yellow-500" />
              )}
              {type === "download" && (
                <Download size={40} className="text-blue-600" />
              )}
            </div>

            {/* Texto */}
            <p className="text-lg font-medium mb-4">
              {title}{" "}
              {userName && (
                <span className="text-blue-600 font-semibold">{userName}</span>
              )}
            </p>

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
              <div className="flex flex-col gap-2 mb-4 max-h-[180px] overflow-y-auto">
                {examesPaciente.map((opt, index) => {
                  const isLast = index === examesPaciente.length - 1;
                  return (
                    <button
                      ref={isLast ? lastExamRef : null}
                      key={index}
                      onClick={() => handleSelect(opt)}
                      disabled={type === "edit" && !opt.canEdit}
                      className={`px-3 py-2 rounded-lg border text-sm transition ${
                        type === "download"
                          ? selected.includes(opt)
                            ? "bg-blue-100 border-blue-400 text-blue-800"
                            : "bg-gray-100 hover:bg-gray-200"
                          : selected === opt
                          ? "bg-yellow-100 border-yellow-400 text-yellow-800"
                          : "bg-gray-100 hover:bg-gray-200"
                      }disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-200`}
                    >
                      {transformaDatas(opt.dataAtualizacao)} - {opt.nomeAmostra}{" "}
                      - {opt.medico.nome}
                    </button>
                  );
                })}
                {loading && (
                  <p className="text-gray-500 text-sm">Carregando...</p>
                )}
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
                  (type === "download" && selected.length === 0) ||
                  loading
                }
                className={`flex-1 py-2 rounded-lg transition ${
                  type === "delete"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : type === "edit"
                    ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading
                  ? "Carregando..."
                  : type === "delete"
                  ? "Solicitar"
                  : type === "edit"
                  ? "Continuar"
                  : "Download"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
