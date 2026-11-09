export default function KpiCards({ jogadores = [], totalBase = 0 }) {
  const lista = Array.isArray(jogadores) ? jogadores : [];
  const totalFiltrado = lista.length;

  const valorTotal = lista.reduce((acumulador, jogador) => {
    return acumulador + Number(jogador?.valor_eur || 0);
  }, 0);

  const valorMedio = totalFiltrado > 0 ? valorTotal / totalFiltrado : 0;

  const somaOverall = lista.reduce((acumulador, jogador) => {
    return acumulador + Number(jogador?.overall || 0);
  }, 0);

  const mediaOverall = totalFiltrado > 0 ? (somaOverall / totalFiltrado).toFixed(1) : "0.0";

  const melhorJogador = lista.reduce((melhor, atual) => {
    if (!atual) return melhor;
    return !melhor || Number(atual.overall) > Number(melhor.overall) ? atual : melhor;
  }, null);

  const percentualBase = totalBase > 0 ? ((totalFiltrado / totalBase) * 100).toFixed(1) : "0.0";

  function formatarMoeda(valor) {
    const num = Number(valor) || 0;
    if (num >= 1000000) {
      return `€ ${(num / 1000000).toFixed(2)}M`;
    }
    if (num >= 1000) {
      return `€ ${(num / 1000).toFixed(0)}K`;
    }
    return `€ ${num.toFixed(0)}`;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">
          Volume de Atletas
        </span>
        <div className="flex items-baseline justify-between mt-2">
          <p className="text-3xl font-black text-slate-900">
            {(totalFiltrado || 0).toLocaleString("pt-BR")}
          </p>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
            {percentualBase}% do total
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Jogadores considerados na análise atual
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">
          Valor de Mercado Médio
        </span>
        <div className="flex items-baseline justify-between mt-2">
          <p className="text-3xl font-black text-blue-600">
            {formatarMoeda(valorMedio)}
          </p>
          <span className="text-xs text-slate-600 font-medium">
            Total: {formatarMoeda(valorTotal)}
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Cotação média de transferência
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">
          Nível Técnico (Overall)
        </span>
        <div className="flex items-baseline justify-between mt-2">
          <p className="text-3xl font-black text-amber-600">
            {mediaOverall}
          </p>
          {melhorJogador && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-semibold border border-amber-200 truncate max-w-37.5">
              Top: {melhorJogador.nome} ({melhorJogador.overall})
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Escala de avaliação técnica geral de 0 a 99
        </p>
      </div>
    </section>
  );
}