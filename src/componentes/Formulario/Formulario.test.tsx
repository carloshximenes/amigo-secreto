import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { RecoilRoot } from "recoil";
import Formulario from ".";

describe("O comportamento do Formulario.tsx", () => {
	test("Quando o input está vazio, novos participantes não pode ser adicionados", () => {
		render(
			<RecoilRoot>
				<Formulario />
			</RecoilRoot>
		);
		const input = screen.getByPlaceholderText(
			"Insira o nome dos participantes"
		);
		const botao = screen.getByRole("button");

		expect(input).toBeInTheDocument();
		expect(botao).toBeDisabled();
	});

	test("Adicionar um participante caso exista um nome preenchido", () => {
		render(
			<RecoilRoot>
				<Formulario />
			</RecoilRoot>
		);
		const input = screen.getByPlaceholderText(
			"Insira o nome dos participantes"
		);
		const botao = screen.getByRole("button");

		fireEvent.change(input, {
			target: {
				value: "Participante de Teste",
			},
		});

		fireEvent.click(botao);

		expect(input).toHaveFocus();
		expect(input).toHaveValue("");
	});

	test("Nomes duplicados não podem ser adicionados na lista", () => {
		render(
			<RecoilRoot>
				<Formulario />
			</RecoilRoot>
		);
		const input = screen.getByPlaceholderText(
			"Insira o nome dos participantes"
		);
		const botao = screen.getByRole("button");

		fireEvent.change(input, {
			target: {
				value: "Participante de Teste",
			},
		});

		fireEvent.click(botao);

		fireEvent.change(input, {
			target: {
				value: "Participante de Teste",
			},
		});

		fireEvent.click(botao);

		const mensagemDeErro = screen.getByRole("alert");
		expect(mensagemDeErro.textContent).toBe(
			"Nomes duplicados não são permitidos!"
		);
	});

	test("Mensagem de erro deve sumir após os timers", () => {
		jest.useFakeTimers();
		render(
			<RecoilRoot>
				<Formulario />
			</RecoilRoot>
		);
		const input = screen.getByPlaceholderText(
			"Insira o nome dos participantes"
		);
		const botao = screen.getByRole("button");

		fireEvent.change(input, {
			target: {
				value: "Participante de Teste",
			},
		});

		fireEvent.click(botao);

		fireEvent.change(input, {
			target: {
				value: "Participante de Teste",
			},
		});

		fireEvent.click(botao);

		let mensagemDeErro = screen.queryByRole("alert");
		expect(mensagemDeErro).toBeInTheDocument();

		act(() => {
			jest.runAllTimers();
		});

		mensagemDeErro = screen.queryByRole("alert");
		expect(mensagemDeErro).toBeNull();
	});
});
