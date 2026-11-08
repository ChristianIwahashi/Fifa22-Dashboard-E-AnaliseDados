import { supabase } from "./supabase";

export async function buscarTodosJogadores(onProgresso) {
  let todosJogadores = [];
  let inicio = 0;
  const tamanhoBloco = 1000;

  while (true) {
    const { data, error } = await supabase
      .from("jogadores")
      .select("*")
      .range(inicio, inicio + tamanhoBloco - 1);

    if (error) {
      throw new Error("Erro ao buscar dados do Supabase: " + error.message);
    }

    todosJogadores = [...todosJogadores, ...data];

    if (onProgresso) {
      onProgresso(todosJogadores.length);
    }
    if (data.length < tamanhoBloco) {
      break;
    }

    inicio += tamanhoBloco;
  }
  return todosJogadores;
}