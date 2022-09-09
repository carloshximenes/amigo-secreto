import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Rodape from ".";
import { useListarParticipantes } from "../../state/hooks/useListarParticipantes";

jest.mock("../../state/hooks/useListarParticipantes", () => {
	return {
		useListarParticipantes: jest.fn(),
	};
});

const mockDeNavegacao = jest.fn();
const mockSorteio = jest.fn();

jest.mock("../../state/hooks/useSorteador", () => {
	return {
		useSorteador: () => mockSorteio,
	};
});

jest.mock("react-router-dom", () => {
	return {
		useNavigate: () => mockDeNavegacao,
	};
});

describe("quando nao existem participantes suficientes", () => {
	beforeEach(() => {
		(useListarParticipantes as jest.Mock).mockReturnValue([]);
	});

	test("a brincadeira não pode ser iniciada", () => {
		render(
			<RecoilRoot>
				<Rodape />
			</RecoilRoot>
		);

		const botao = screen.getByRole("button");
		expect(botao).toBeDisabled();
	});
});

describe("quando existem participantes suficientes", () => {
	const participantes = ["Ana", "Catarina", "Pedro", "Marcos"];
	beforeEach(() => {
		(useListarParticipantes as jest.Mock).mockReturnValue(participantes);
	});

	test("a brincadeira pode ser iniciada", () => {
		render(
			<RecoilRoot>
				<Rodape />
			</RecoilRoot>
		);

		const botao = screen.getByRole("button");
		expect(botao).not.toBeDisabled();
	});

	test("a brincadeira foi iniciada", () => {
		render(
			<RecoilRoot>
				<Rodape />
			</RecoilRoot>
		);

		const botao = screen.getByRole("button");
		fireEvent.click(botao);

		expect(mockDeNavegacao).toHaveBeenCalledTimes(1);
		expect(mockDeNavegacao).toHaveBeenCalledWith("/sorteio");
		expect(mockSorteio).toHaveBeenCalledTimes(1);
	});
});
