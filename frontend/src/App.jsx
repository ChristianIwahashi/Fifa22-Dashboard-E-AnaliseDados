import { useEffect, useState, useMemo } from "react";
import { buscarTodosJogadores } from "./services/playerService";
import KpiCards from "./components/KpiCards";
import Filters from "./components/Filters";
import ChartsSection from "./components/ChartsSection";

export default function App() {
  const [jogadores, setJogadores] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [quantidadeCarregada, setQuantidadeCarregada] = useState(0);
  const [erro, setErro] = useState(null);

  const [filtros, setFiltros] = useState({
    liga: "",
    posicao: "",
    nacionalidade: "",
  });

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

  function handleFiltroChange(campo, valor) {
    setFiltros((anterior) => ({ ...anterior, [campo]: valor }));
  }

  function handleLimparFiltros() {
    setFiltros({
      liga: "",
      posicao: "",
      nacionalidade: "",
    });
  }

  const jogadoresFiltrados = useMemo(() => {
    return jogadores.filter((jogador) => {
      if (filtros.liga && jogador.liga !== filtros.liga) return false;
      if (filtros.posicao && jogador.posicao !== filtros.posicao) return false;
      if (filtros.nacionalidade && jogador.nacionalidade !== filtros.nacionalidade) return false;
      return true;
    });
  }, [jogadores, filtros]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider rounded-md">
                FIFA 22 - Análise de Dados
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 mt-2">
              Painel Analítico de Jogadores
            </h1>
            <p className="text-slate-600 text-sm mt-0.5">
              Visualização analítica e métricas de mercado em tempo real
            </p>
          </div>
        </header>

        <main>
          {carregando && (
            <div className="flex flex-col items-center justify-center p-16 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
              <p className="text-base font-semibold text-slate-700">
                Consultando dados no Supabase...
              </p>
              <p className="text-emerald-600 font-bold text-sm mt-2">
                {quantidadeCarregada} / 5000 registros sincronizados
              </p>
            </div>
          )}

          {erro && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl mb-6">
              {erro}
            </div>
          )}

          {!carregando && !erro && (
            <>
              <Filters
                dadosOriginais={jogadores}
                filtros={filtros}
                onFiltroChange={handleFiltroChange}
                onLimparFiltros={handleLimparFiltros}
              />

              <KpiCards
                jogadores={jogadoresFiltrados}
                totalBase={jogadores.length}
              />

              <ChartsSection jogadores={jogadoresFiltrados} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}