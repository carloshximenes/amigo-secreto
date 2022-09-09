import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Sorteio from ".";
import { useListarParticipantes } from "../../state/hooks/useListarParticipantes";
import { useResultadoSorteio } from "../../state/hooks/useResultadoSorteio";

jest.mock("../../state/hooks/useListarParticipantes", () => {
	return {
		useListarParticipantes: jest.fn(),
	};
});

jest.mock("../../state/hooks/useResultadoSorteio", () => {
	return {
		useResultadoSorteio: jest.fn(),
	};
});

describe("na pagina de sorteio", () => {
	const participantes = ["Ana", "Catarina", "Paula"];
	const resultado = new Map([
		["Ana", "Catarina"],
		["Paula", "Ana"],
		["Catarina", "Paula"],
	]);

	beforeEach(() => {
		(useListarParticipantes as jest.Mock).mockReturnValue(participantes);
		(useResultadoSorteio as jest.Mock).mockReturnValue(resultado);
	});
	test("todos os participantes podem exibir o seu amigo secreto", () => {
		render(
			<RecoilRoot>
				<Sorteio />
			</RecoilRoot>
		);

		const opcoes = screen.queryAllByRole("option");
		expect(opcoes).toHaveLength(participantes.length + 1);
	});

	test("o amigo secreto é exibido quando solicitado", () => {
		render(
			<RecoilRoot>
				<Sorteio />
			</RecoilRoot>
		);

		const select = screen.getByPlaceholderText("Selecione o seu nome");
		fireEvent.change(select, {
			target: {
				value: participantes[0],
			},
		});

		const botao = screen.getByRole("button");
		fireEvent.click(botao);

		const amigoSecreto = screen.getByRole("alert");
		expect(amigoSecreto).toBeInTheDocument();
	});
});
