import { useNavigate } from "react-router-dom";
import { useListarParticipantes } from "../../state/hooks/useListarParticipantes";
import { useSorteador } from "../../state/hooks/useSorteador";
import classes from "./Rodape.module.css";

const Rodape = () => {
	const participantes = useListarParticipantes();
	const sortear = useSorteador();

	const navegarPara = useNavigate();

	const iniciarBrincadeira = () => {
		sortear();
		navegarPara("/sorteio");
	};
	return (
		<footer className={classes["rodape-configuracoes"]}>
			<button
				className={classes.botao}
				disabled={participantes?.length < 3}
				onClick={iniciarBrincadeira}
			>
				Iniciar Brincadeira
			</button>
			<img src="/imagens/sacolas.png" alt="Sacolas de compras" />
		</footer>
	);
};

export default Rodape;
