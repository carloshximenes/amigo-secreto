import { useListarParticipantes } from "../../state/hooks/useListarParticipantes";

const ListaParticipantes = () => {
	const participantes: string[] = useListarParticipantes();
	return (
		<ul>
			{participantes?.map((p) => (
				<li key={p}>{p}</li>
			))}
		</ul>
	);
};

export default ListaParticipantes;
