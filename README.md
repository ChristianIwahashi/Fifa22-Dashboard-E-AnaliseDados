# ⚽ FIFA 22 — Dashboard Interativo & Análise de Dados

<h1 align="center">
  <img src="./frontend/src/assets/fifa22.jpg" alt="FIFA 22 Logo" title="FIFA 22 Logo" width="150">
</h1>

> Projeto de **Análise de Dados do Jogo FIFA 22**, integrando um pipeline de extração e tratamento em Python, banco de dados relacional em nuvem no Supabase e um dashboard interativo de alta performance em React com Tailwind CSS.

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Produção-success?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)

## 📌 Sumário
- [Sobre o Projeto](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias)
- [Como Executar o Projeto](#execucao)

<div id="sobre"></div>

## 📖 Sobre o Projeto

O projeto foi desenvolvido para a disciplina de **Tópicos Especiais em Informática** no curso de Análise e Desenvolvimento de Sistemas (FATEC Lins) e tem como objetivo simular o ciclo completo de vida de um dataset. 

A aplicação processa uma base de dados real extraída do **Kaggle (FIFA 22)**, tratando ruídos e valores nulos via script Python, estruturando um banco relacional na nuvem e entregando uma interface visual interativa no navegador.

<div id="funcionalidades"></div>

## ⚡ Funcionalidades

### 📊 1. Indicadores Dinâmicos (KPIs em Tempo Real)
- **Volume de Atletas:** Contagem dinâmica do recorte filtrado com percentual relativo à base global.
- **Valor de Mercado Médio:** Cotação financeira média de transferência e patrimônio acumulado em Euros.
- **Nível Técnico (Overall Médio):** Avaliação de desempenho técnico geral com destaque automático para o melhor atleta do grupo.

### 🎛️ 2. Filtros Dinâmicos
- **Filtro Multi-Critério:** Seleção simultânea por **Liga**, **Posição Tática** e **Nacionalidade**.
- **Reatividade Instantânea:** Todos os 3 KPIs e os 7 gráficos se recalculam instantaneamente em tempo real através de memoização em memória (`useMemo`).

### 📈 3. 7 Gráficos Analíticos Diversificados
1. **Top 10 Clubes com Maior Patrimônio** (Barras Horizontais)
2. **Distribuição Tática por Posição em Campo** (Rosca)
3. **Curva de Valorização por Idade** (Linha com Área)
4. **Distribuição por Faixa de Overall** (Barras Verticais)
5. **Top 5 Nacionalidades com Maior Presença** (Pizza)
6. **Comparativo de Overall Médio por Setor** (Radar Multidimensional)
7. **Top Ligas por Valor Médio de Transferência** (Área Polar)

<div id="tecnologias"></div>

## 🛠️ Tecnologias Utilizadas

### Pipeline de Dados
* **Python (v3.13)**
* **Pandas**

### Frontend & Visualização
* **React** + **Vite** + **JavaScript (JSX)**
* **Tailwind CSS (v4)**
* **Chart.js** & **React-Chartjs-2**

### DevOps & Deploy
* **Vercel**
* **Supabase (PostgreSQL)**

<div id="execucao"></div>

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* Node.js (v18+) instalado
* Python (v3.10+) instalado

### 1. Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/fifa22-cloud-dashboard.git
cd fifa22-cloud-dashboard
```

### 2. Configurar o Backend
```Bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```
O projeto utiliza uma base de dados derivada do dataset **FIFA 22 Players Dataset** disponível no Kaggle. 
1. **Baixe o arquivo de dados:** Acesse o [Kaggle - FIFA 22 Players Dataset](https://www.kaggle.com/datasets/luisfucros/fifa-players?select=players_22.csv) e baixe o arquivo.
2. **Posicione o arquivo:** Certifique-se de colocar o arquivo dentro da pasta de destino do backend:
   
   backend/dataset/players_22.csv

```Bash
python etl_fifa.py
```

### 3. Configurar o Frontend
```Bash
cd ../frontend
npm install
npm run dev
```

## Desenvolvido por

- **Christian Iwahashi**
- **Yukito Fukagawa**
