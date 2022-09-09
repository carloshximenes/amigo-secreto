import shuffle from "just-shuffle";

export const realizarSorteio = (participantes: string[] = []) => {
	const listaEmbaralhada = shuffle(participantes);
	const totalDeParticipantes = participantes.length;

	const resultado = new Map<string, string>();

	for (let index = 0; index < totalDeParticipantes; index++) {
		const indiceAmigo = index === totalDeParticipantes - 1 ? 0 : index + 1;
		resultado.set(listaEmbaralhada[index], listaEmbaralhada[indiceAmigo]);
	}

	return resultado;
};
