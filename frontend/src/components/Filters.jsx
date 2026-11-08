import { useMemo } from "react";

export default function Filters({dadosOriginais, filtros, onFiltroChange, onLimparFiltros}) {
    const opcoesLigas = useMemo(() => {
        const conjunto = new Set(dadosOriginais.map((j) => j.liga).filter(Boolean));
        return Array.from(conjunto).sort();
    }, [dadosOriginais]);

    const opcoesPosicoes = useMemo(() => {
        const conjunto = new Set(dadosOriginais.map((j) => j.posicao).filter(Boolean));
        return Array.from(conjunto).sort();
    }, [dadosOriginais]);

    const opcoesNacionalidades = useMemo(() => {
        const conjunto = new Set(dadosOriginais.map((j) => j.nacionalidade).filter(Boolean));
        return Array.from(conjunto).sort();
    }, [dadosOriginais]);

    const filtrosAtivos = Boolean(filtros.liga || filtros.posicao || filtros.nacionalidade);

    return (
        <section className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-5 mb-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-slate-700/60 gap-3">
        <div>
          <h2 className="text-lg font-bold text-white tracking-wide">
            Filtros Dinâmicos
          </h2>
          <p className="text-xs text-slate-400">
            Filtre os dados para recalcular os 3 KPIs e os gráficos em tempo real
          </p>
        </div>

        {filtrosAtivos && (
          <button
            onClick={onLimparFiltros}
            className="text-xs px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 font-medium transition-colors cursor-pointer"
          >
            Limpar Filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Liga
          </label>
          <select
            value={filtros.liga}
            onChange={(e) => onFiltroChange("liga", e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="">Todas as Ligas ({opcoesLigas.length})</option>
            {opcoesLigas.map((liga) => (
              <option key={liga} value={liga}>
                {liga}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Posição
          </label>
          <select
            value={filtros.posicao}
            onChange={(e) => onFiltroChange("posicao", e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="">Todas as Posições ({opcoesPosicoes.length})</option>
            {opcoesPosicoes.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Nacionalidade
          </label>
          <select
            value={filtros.nacionalidade}
            onChange={(e) => onFiltroChange("nacionalidade", e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="">Todas as Nacionalidades ({opcoesNacionalidades.length})</option>
            {opcoesNacionalidades.map((nac) => (
              <option key={nac} value={nac}>
                {nac}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
    );
}