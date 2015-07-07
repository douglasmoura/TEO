#pragma strict

public class Jogo {
	private var nome : String;
	private var descricao : String;
	private var nivel: int;
	
	public function Jogo (nome : String, descricao : String, nivel : int) {
		this.nome = nome;
		this.descricao = descricao;
		this.nivel = nivel;
	}
	
	public function GetNome() {
		return nome;
	}
	
	public function GetDescricao() {
		return descricao;
	}
	
	public function getNivel() {
		return nivel;
	}
}