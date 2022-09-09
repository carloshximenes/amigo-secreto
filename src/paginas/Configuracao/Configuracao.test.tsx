import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Configuracao from ".";

jest.mock("../../state/hooks/useListarParticipantes", () => {
	return {
		useListarParticipantes: jest.fn(),
	};
});

const mockDeNavegacao = jest.fn();

jest.mock("react-router-dom", () => {
	return {
		useNavigate: () => mockDeNavegacao,
	};
});

describe("a pagina de configuracao", () => {
	test("deve ser renderizada corretamente", () => {
		const { container } = render(
			<RecoilRoot>
				<Configuracao />
			</RecoilRoot>
		);

		expect(container).toMatchSnapshot();
	});
});
