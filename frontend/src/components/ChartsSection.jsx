import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Line, Pie, Radar, PolarArea } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
);

export default function ChartsSection({ jogadores = [] }) {
  const dados = Array.isArray(jogadores) ? jogadores : [];

  const topClubes = useMemo(() => {
    const mapa = {};
    dados.forEach((j) => {
      mapa[j.clube] = (mapa[j.clube] || 0) + Number(j.valor_eur);
    });
    return Object.entries(mapa)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [dados]);

  const posicoes = useMemo(() => {
    const mapa = {};
    dados.forEach((j) => {
      mapa[j.posicao] = (mapa[j.posicao] || 0) + 1;
    });
    return Object.entries(mapa)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7);
  }, [dados]);

  const valorPorIdade = useMemo(() => {
    const contagem = {};
    const soma = {};
    dados.forEach((j) => {
      const idade = j.idade;
      contagem[idade] = (contagem[idade] || 0) + 1;
      soma[idade] = (soma[idade] || 0) + Number(j.valor_eur);
    });
    const idades = Object.keys(contagem).map(Number).sort((a, b) => a - b);
    return {
      labels: idades.map((i) => `${i} anos`),
      valores: idades.map((i) => Math.round((soma[i] / contagem[i]) / 1000000)),
    };
  }, [dados]);

  const faixasOverall = useMemo(() => {
    const faixas = {
      "70-74": 0,
      "75-79": 0,
      "80-84": 0,
      "85-89": 0,
      "90+": 0,
    };
    dados.forEach((j) => {
      const o = Number(j.overall);
      if (o >= 90) faixas["90+"]++;
      else if (o >= 85) faixas["85-89"]++;
      else if (o >= 80) faixas["80-84"]++;
      else if (o >= 75) faixas["75-79"]++;
      else if (o >= 70) faixas["70-74"]++;
    });
    return faixas;
  }, [dados]);

  const topNacionalidades = useMemo(() => {
    const mapa = {};
    dados.forEach((j) => {
      mapa[j.nacionalidade] = (mapa[j.nacionalidade] || 0) + 1;
    });
    return Object.entries(mapa)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [dados]);

  const radarSetores = useMemo(() => {
    const setores = {
      Goleiros: { soma: 0, total: 0 },
      Defensores: { soma: 0, total: 0 },
      "Meio-Campo": { soma: 0, total: 0 },
      Atacantes: { soma: 0, total: 0 },
    };

    dados.forEach((j) => {
      const pos = j.posicao;
      const ov = Number(j.overall);
      if (pos === "GK") {
        setores.Goleiros.soma += ov;
        setores.Goleiros.total++;
      } else if (["CB", "LB", "RB", "LWB", "RWB"].includes(pos)) {
        setores.Defensores.soma += ov;
        setores.Defensores.total++;
      } else if (["CM", "CDM", "CAM", "LM", "RM"].includes(pos)) {
        setores["Meio-Campo"].soma += ov;
        setores["Meio-Campo"].total++;
      } else {
        setores.Atacantes.soma += ov;
        setores.Atacantes.total++;
      }
    });

    const labels = Object.keys(setores);
    const medias = labels.map((s) =>
      setores[s].total > 0 ? (setores[s].soma / setores[s].total).toFixed(1) : 0
    );

    return { labels, medias };
  }, [dados]);

  const topLigas = useMemo(() => {
    const contagem = {};
    const soma = {};
    dados.forEach((j) => {
      contagem[j.liga] = (contagem[j.liga] || 0) + 1;
      soma[j.liga] = (soma[j.liga] || 0) + Number(j.valor_eur);
    });

    return Object.keys(contagem)
      .filter((liga) => contagem[liga] >= 15)
      .map((liga) => ({
        liga,
        media: Math.round((soma[liga] / contagem[liga]) / 1000000),
      }))
      .sort((a, b) => b.media - a.media)
      .slice(0, 6);
  }, [dados]);

  const opcoesTemaClaro = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#475569", font: { weight: "500" } },
      },
    },
    scales: {
      x: {
        ticks: { color: "#64748b" },
        grid: { color: "rgba(226, 232, 240, 0.8)" },
      },
      y: {
        ticks: { color: "#64748b" },
        grid: { color: "rgba(226, 232, 240, 0.8)" },
      },
    },
  };

  if (dados.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 shadow-sm">
        Nenhum jogador encontrado para os filtros selecionados.
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      {/*Gráfico 1: Barras Horizontais*/}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm lg:col-span-2">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          1. Top 10 Clubes com Maior Patrimônio de Elenco
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Soma do valor de mercado dos jogadores em Milhões de Euros (€ M)
        </p>
        <div className="h-80">
          <Bar
            data={{
              labels: topClubes.map((c) => c[0]),
              datasets: [
                {
                  label: "Patrimônio (€ Milhões)",
                  data: topClubes.map((c) => (c[1] / 1000000).toFixed(1)),
                  backgroundColor: "#2563eb",
                  borderRadius: 6,
                },
              ],
            }}
            options={{
              ...opcoesTemaClaro,
              indexAxis: "y",
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return ` Patrimônio: € ${context.raw} M`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/*Gráfico 2: Rosca*/}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          2. Distribuição por Posição
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Volume de atletas nas principais posições
        </p>
        <div className="h-72 flex items-center justify-center">
          <Doughnut
            data={{
              labels: posicoes.map((p) => p[0]),
              datasets: [
                {
                  data: posicoes.map((p) => p[1]),
                  backgroundColor: [
                    "#059669",
                    "#2563eb",
                    "#7c3aed",
                    "#d97706",
                    "#db2777",
                    "#0891b2",
                    "#64748b",
                  ],
                  borderWidth: 2,
                  borderColor: "#ffffff",
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "right", labels: { color: "#475569" } },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const quantidade = context.raw;
                      return `${quantidade} jogadores`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/*Gráfico 3: Linha com Área*/}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          3. Curva de Valorização por Idade
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Média de valor de mercado por faixa etária (€ M)
        </p>
        <div className="h-72">
          <Line
            data={{
              labels: valorPorIdade.labels,
              datasets: [
                {
                  label: "Média (€ M)",
                  data: valorPorIdade.valores,
                  borderColor: "#059669",
                  backgroundColor: "rgba(5, 150, 105, 0.1)",
                  fill: true,
                  tension: 0.35,
                  pointRadius: 3,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "top", labels: { color: "#475569" } },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return ` Valor Médio: € ${context.raw} M`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/*Gráfico 4: Barras Verticais*/}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          4. Distribuição por Faixa de Overall
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Quantidade de atletas por segmento de overall
        </p>
        <div className="h-72">
          <Bar
            data={{
              labels: Object.keys(faixasOverall),
              datasets: [
                {
                  label: "Jogadores",
                  data: Object.values(faixasOverall),
                  backgroundColor: "#7c3aed",
                  borderRadius: 6,
                },
              ],
            }}
            options={{
              ...opcoesTemaClaro,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const quantidade = context.raw;
                      return `${quantidade} jogadores`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/*Gráfico 5: Pizza*/}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          5. Top 5 Nacionalidades com Maior Presença
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Países com mais atletas de alto nível
        </p>
        <div className="h-72 flex items-center justify-center">
          <Pie
            data={{
              labels: topNacionalidades.map((n) => n[0]),
              datasets: [
                {
                  data: topNacionalidades.map((n) => n[1]),
                  backgroundColor: ["#d97706", "#2563eb", "#059669", "#dc2626", "#7c3aed"],
                  borderWidth: 2,
                  borderColor: "#ffffff",
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "right", labels: { color: "#475569" } },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const quantidade = context.raw;
                      return `${quantidade} jogadores`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/*Gráfico 6: Radar*/}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          6. Comparativo de Overall por Setor
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Qualidade média de 0 a 99 em cada setor do campo
        </p>
        <div className="h-72 flex items-center justify-center">
          <Radar
            data={{
              labels: radarSetores.labels,
              datasets: [
                {
                  label: "Overall Médio",
                  data: radarSetores.medias,
                  backgroundColor: "rgba(217, 119, 6, 0.2)",
                  borderColor: "#d97706",
                  borderWidth: 2,
                  pointBackgroundColor: "#d97706",
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                r: {
                  angleLines: { color: "rgba(203, 213, 225, 0.6)" },
                  grid: { color: "rgba(226, 232, 240, 0.8)" },
                  pointLabels: { color: "#334155", font: { size: 12, weight: "bold" } },
                  ticks: { display: false },
                },
              },
            }}
          />
        </div>
      </div>

      {/*Gráfico 7: Polar Area*/}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          7. Top Ligas por Valor Médio de Transferência
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Média por atleta nas ligas mais valorizadas (€ M)
        </p>
        <div className="h-72 flex items-center justify-center">
          <PolarArea
            data={{
              labels: topLigas.map((l) => l.liga),
              datasets: [
                {
                  data: topLigas.map((l) => l.media),
                  backgroundColor: [
                    "rgba(37, 99, 235, 0.75)",
                    "rgba(5, 150, 105, 0.75)",
                    "rgba(217, 119, 6, 0.75)",
                    "rgba(219, 39, 119, 0.75)",
                    "rgba(124, 58, 237, 0.75)",
                    "rgba(8, 145, 178, 0.75)",
                  ],
                  borderWidth: 1,
                  borderColor: "#ffffff",
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                r: {
                  grid: { color: "rgba(226, 232, 240, 0.8)" },
                  ticks: { display: false },
                },
              },
              plugins: { 
                legend: { position: "right", labels: { color: "#475569" } },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return ` Valor Médio: € ${context.raw} M`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </section>
  );
}