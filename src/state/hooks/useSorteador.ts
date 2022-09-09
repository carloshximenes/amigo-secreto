import { useSetRecoilState } from "recoil";
import { resultadoAmigoSecreto } from "../atom";
import { realizarSorteio } from "../helpers/realizarSorteio";
import { useListarParticipantes } from "./useListarParticipantes";

export const useSorteador = () => {
	const participantes = useListarParticipantes();
	const resultado = realizarSorteio(participantes);

	const setResultado = useSetRecoilState(resultadoAmigoSecreto);
	return () => setResultado(resultado);
};
