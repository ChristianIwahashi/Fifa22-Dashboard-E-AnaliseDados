import { useEffect, useState } from "react";
import { buscarTodosJogadores } from "./services/playerService";

export default function App() {
  const [jogadores, setJogadores] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [quantidadeCarregada, setQuantidadeCarregada] = useState(0);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        const dados = await buscarTodosJogadores((totalAtual) => {
          setQuantidadeCarregada(totalAtual);
        });
        setJogadores(dados);
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-slate-900 text-slate-100">
      <header className="mb-8 border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          FIFA 22 — Dashboard de Análise de Dados
        </h1>
        <p className="text-slate-400 mt-1">
          Integração em Nuvem com Supabase
        </p>
      </header>

      <main>
        {carregando && (
          <div className="flex flex-col items-center justify-center p-12 bg-slate-800/50 rounded-xl border border-slate-700">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mb-4"></div>
            <p className="text-lg font-medium text-slate-200">
              Carregando...
            </p>
            <p className="text-emerald-400 font-bold mt-2">
              {quantidadeCarregada} / 5000 registros recebidos
            </p>
          </div>
        )}

        {erro && (
          <div className="p-4 bg-red-950/50 border border-red-500/50 text-red-300 rounded-lg">
            {erro}
          </div>
        )}

        {!carregando && !erro && (
          <div className="p-6 bg-slate-800 rounded-xl border border-slate-700 shadow-lg">
            <h2 className="text-xl font-bold text-emerald-400 mb-2">
              Conexão com a Nuvem Estabelecida com Sucesso!
            </h2>
            <p className="text-slate-300">
              Total de registros prontos para análise:{" "}
              <span className="font-bold text-white">{jogadores.length}</span>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}