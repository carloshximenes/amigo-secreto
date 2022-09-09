import classes from "./Cabecalho.module.css";

const Cabecalho = () => {
	return (
		<header className={classes.cabecalho}>
			<div
				className={classes["imagem-logo"]}
				role="img"
				aria-label="Logo do Sorteador"
			></div>
			<img
				className={classes.participante}
				src="/imagens/participante.png"
				alt="Participante com um presente na mão"
			/>
		</header>
	);
};

export default Cabecalho;
