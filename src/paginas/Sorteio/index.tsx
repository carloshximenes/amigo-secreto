import { useState } from "react";
import Card from "../../componentes/Card";
import { useListarParticipantes } from "../../state/hooks/useListarParticipantes";
import { useResultadoSorteio } from "../../state/hooks/useResultadoSorteio";
import classes from "./Sorteio.module.css";

const Sorteio = () => {
	const [participanteDaVez, setParticipanteDaVez] = useState<string>("");
	const [amigoSecreto, setAmigoSecreto] = useState<string>("");

	const participantes = useListarParticipantes();

	const resultado = useResultadoSorteio();

	const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault();
		setAmigoSecreto(resultado.get(participanteDaVez) || "");
	};

	return (
		<Card>
			<section className={classes.sorteio}>
				<form onSubmit={sortear}>
					<select
						name="Participante da vez"
						id="participante-da-vez"
						placeholder="Selecione o seu nome"
						required
						value={participanteDaVez}
						onChange={(evento) =>
							setParticipanteDaVez(evento.target.value)
						}
					>
						<option disabled={participanteDaVez.trim().length > 0}>
							Selecione seu nome
						</option>
						{participantes?.map((p) => (
							<option key={p}>{p}</option>
						))}
					</select>
					<button className={classes["botao-sortear"]}>
						Sortear
					</button>
				</form>
				{amigoSecreto && (
					<p role="alert" className={classes.resultado}>
						{amigoSecreto}
					</p>
				)}
				<footer className={classes.sorteio}>
					<img
						src="/imagens/aviao.png"
						className={classes.aviao}
						alt="Um desenho de um avião de papel"
					/>
				</footer>
			</section>
		</Card>
	);
};

export default Sorteio;
