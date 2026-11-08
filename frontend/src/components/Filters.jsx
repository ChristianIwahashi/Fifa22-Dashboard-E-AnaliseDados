import { useMemo } from "react";

const ORDEM_POSICOES_FIFA = [
  "GK",
  "CB",
  "LB",
  "RB",
  "LWB",
  "RWB",
  "CDM",
  "CM",
  "CAM",
  "LM",
  "RM",
  "LW",
  "RW",
  "CF",
  "ST",
];

export default function Filters({ dadosOriginais, filtros, onFiltroChange, onLimparFiltros }) {
  const opcoesLigas = useMemo(() => {
    const conjunto = new Set(dadosOriginais.map((j) => j.liga).filter(Boolean));
    return Array.from(conjunto).sort();
  }, [dadosOriginais]);

  const opcoesPosicoes = useMemo(() => {
    const conjunto = new Set(dadosOriginais.map((j) => j.posicao).filter(Boolean));
    const posicoesPresentes = Array.from(conjunto);

    return posicoesPresentes.sort((a, b) => {
      const indiceA = ORDEM_POSICOES_FIFA.indexOf(a);
      const indiceB = ORDEM_POSICOES_FIFA.indexOf(b);

      return indiceA - indiceB;
    });
  }, [dadosOriginais]);

  const opcoesNacionalidades = useMemo(() => {
    const conjunto = new Set(dadosOriginais.map((j) => j.nacionalidade).filter(Boolean));
    return Array.from(conjunto).sort();
  }, [dadosOriginais]);

  const filtrosAtivos = Boolean(filtros.liga || filtros.posicao || filtros.nacionalidade);

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-wide">
            Filtros Dinâmicos
          </h2>
        </div>

        {filtrosAtivos && (
          <button
            onClick={onLimparFiltros}
            className="text-xs px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 font-semibold transition-colors cursor-pointer"
          >
            Limpar Filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Liga
          </label>
          <select
            value={filtros.liga}
            onChange={(e) => onFiltroChange("liga", e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
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
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Posição
          </label>
          <select
            value={filtros.posicao}
            onChange={(e) => onFiltroChange("posicao", e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
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
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Nacionalidade
          </label>
          <select
            value={filtros.nacionalidade}
            onChange={(e) => onFiltroChange("nacionalidade", e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
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