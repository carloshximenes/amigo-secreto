import { useRecoilValue, useSetRecoilState } from "recoil";
import { erroState, listaParticipantesState } from "../atom";

export const useAdicionarParticipante = () => {
	const setListaParticipante = useSetRecoilState(listaParticipantesState);
	const listaParticipante = useRecoilValue(listaParticipantesState);
	const setErro = useSetRecoilState(erroState);
	return (nomeParticipante: string) => {
		const participanteJahCadastrado = listaParticipante.find(
			(p) => p === nomeParticipante
		);
		if (participanteJahCadastrado) {
			setErro("Nomes duplicados não são permitidos!");
			setTimeout(() => {
				setErro("");
			}, 5000);
			return;
		}

		return setListaParticipante((listaAntiga) => [
			...listaAntiga,
			nomeParticipante,
		]);
	};
};
