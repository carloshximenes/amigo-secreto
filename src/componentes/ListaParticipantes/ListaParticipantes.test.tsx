import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import ListaParticipantes from ".";
import { useListarParticipantes } from "../../state/hooks/useListarParticipantes";

jest.mock("../../state/hooks/useListarParticipantes", () => {
	return {
		useListarParticipantes: jest.fn(),
	};
});
describe("Uma lista de participantes vazia", () => {
	beforeEach(() => {
		(useListarParticipantes as jest.Mock).mockReturnValue([]);
	});
	test("deve ser renderizada sem elementos", () => {
		render(
			<RecoilRoot>
				<ListaParticipantes />
			</RecoilRoot>
		);

		const itens = screen.queryAllByRole("listitem");
		expect(itens).toHaveLength(0);
	});
});

describe("Uma lista com participantes", () => {
	const participantes = ["Ana", "Catarina"];

	beforeEach(() => {
		(useListarParticipantes as jest.Mock).mockReturnValue(participantes);
	});
	test("deve renderizar o nome deles", () => {
		render(
			<RecoilRoot>
				<ListaParticipantes />
			</RecoilRoot>
		);

		const itens = screen.queryAllByRole("listitem");
		expect(itens).toHaveLength(participantes.length);
	});
});
