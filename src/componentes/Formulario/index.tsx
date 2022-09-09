import { useRef, useState } from "react";
import { useAdicionarParticipante } from "../../state/hooks/useAdicionarParticipante";
import { useMensagemErro } from "../../state/hooks/useMensagemErro";
import classes from "./Formulario.module.css";

const Formulario = () => {
	const inputNomeParticipanteRef = useRef<HTMLInputElement>(null);
	const [botaoHabilitado, setBotaoHabilitado] = useState<boolean>(false);

	const adicionarParticipanteNaLista = useAdicionarParticipante();
	const mensagemErro = useMensagemErro();

	const adicionarParticipante = (
		evento: React.FormEvent<HTMLFormElement>
	) => {
		evento.preventDefault();

		let nomeParticipante = inputNomeParticipanteRef.current?.value;
		if (nomeParticipante && nomeParticipante.trim().length > 0) {
			inputNomeParticipanteRef.current!.focus();
			inputNomeParticipanteRef.current!.value = "";
			adicionarParticipanteNaLista(nomeParticipante);
		}
	};

	const alterarEstadoBotaoAdicionar = (
		evento: React.ChangeEvent<HTMLInputElement>
	) => {
		let deveSerHabilitado = evento.target.value.trim().length > 0;
		setBotaoHabilitado(deveSerHabilitado);
	};

	return (
		<form onSubmit={adicionarParticipante}>
			<div className={classes["grupo-input-btn"]}>
				<input
					placeholder="Insira o nome dos participantes"
					ref={inputNomeParticipanteRef}
					onChange={alterarEstadoBotaoAdicionar}
				/>
				<button disabled={!botaoHabilitado}>Adicionar</button>
			</div>
			{mensagemErro && (
				<p
					role="alert"
					className={[classes.alerta, classes.erro].join(" ")}
				>
					{mensagemErro}
				</p>
			)}
		</form>
	);
};

export default Formulario;
