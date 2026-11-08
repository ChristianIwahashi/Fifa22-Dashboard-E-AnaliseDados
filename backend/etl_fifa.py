import os
import pandas as pd
from supabase import create_client, Client

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

CSV_PATH = "dataset/players_22.csv"
LIMITE_REGISTROS = 5000
TAMANHO_LOTE = 500

def executar_etl():
    if not os.path.exists(CSV_PATH):
        print(f"Erro: Arquivo não encontrado em {CSV_PATH}")
        return

    print("Iniciando leitura e tratamento do dataset...")
    df = pd.read_csv(CSV_PATH)

    colunas_obrigatorias = [
        "sofifa_id", "short_name", "player_positions", 
        "club_name", "league_name", "nationality_name", 
        "dob", "age", "overall", "value_eur"
    ]
    df = df.dropna(subset=colunas_obrigatorias)

    df["player_positions"] = df["player_positions"].astype(str).str.split(",").str[0].str.strip()
    df["dob"] = pd.to_datetime(df["dob"]).dt.strftime("%Y-%m-%d")

    df = df.sort_values(by="overall", ascending=False).head(LIMITE_REGISTROS)

    df_final = df[colunas_obrigatorias].rename(columns={
        "sofifa_id": "id",
        "short_name": "nome",
        "player_positions": "posicao",
        "club_name": "clube",
        "league_name": "liga",
        "nationality_name": "nacionalidade",
        "dob": "data_nascimento",
        "age": "idade",
        "overall": "overall",
        "value_eur": "valor_eur"
    })

    df_final["id"] = df_final["id"].astype(int)
    df_final["idade"] = df_final["idade"].astype(int)
    df_final["overall"] = df_final["overall"].astype(int)
    df_final["valor_eur"] = df_final["valor_eur"].astype(float)

    registros = df_final.to_dict(orient="records")
    total_registros = len(registros)
    print(f"Total de registros tratados prontos para carga: {total_registros}")

    supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

    print("Iniciando carga em lotes no Supabase...")
    for i in range(0, total_registros, TAMANHO_LOTE):
        lote = registros[i:i + TAMANHO_LOTE]
        resposta = supabase.table("jogadores").upsert(lote).execute()
        print(f"Lote {i // TAMANHO_LOTE + 1} inserido: {len(lote)} registros.")

    print("Processo de ETL e carga concluído com sucesso!")

if __name__ == "__main__":
    executar_etl()