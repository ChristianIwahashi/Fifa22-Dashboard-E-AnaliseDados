import { useEffect, useState, useMemo } from "react";
import { buscarTodosJogadores } from "./services/playerService";
import KpiCards from "./components/KpiCards";
import Filters from "./components/Filters";

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
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider rounded-md">
                FIFA 22 - Análise de Dados
              </span>
              <span className="text-xs text-slate-400">Nuvem: Supabase</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white mt-2">
              Painel Analítico de Jogadores
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Visualização analítica e métricas de mercado em tempo real
            </p>
          </div>
        </header>

        <main>
          {carregando && (
            <div className="flex flex-col items-center justify-center p-16 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mb-4"></div>
              <p className="text-base font-semibold text-slate-200">
                Consultando dados no Supabase via paginação assíncrona...
              </p>
              <p className="text-emerald-400 font-bold text-sm mt-2">
                {quantidadeCarregada} / 5000 registros sincronizados
              </p>
            </div>
          )}

          {erro && (
            <div className="p-4 bg-rose-950/40 border border-rose-500/50 text-rose-300 rounded-xl mb-6">
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

              <section className="bg-slate-900/60 border border-dashed border-slate-800 rounded-xl p-8 text-center text-slate-500">
                <p className="text-sm font-medium">
                  7 gráficos analíticos
                </p>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}