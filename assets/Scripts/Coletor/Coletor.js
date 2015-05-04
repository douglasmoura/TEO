#pragma strict

import Coletor;

/*	Script intermediario entre o script do jogo e a base de dados.
*	A receber: Acertos, Erros, Tentativas, DragDrop, Tempo Total, Delay, Step.
*	Vide Dados no excel para maior informacoes sobre os dados coletados.
*
*
*/

//public class Coletor extends MonoBehaviour{
public class Coletor{
		private var acertos: int;
		private var erros: int;
		private var tentativas: int;
		
		private var dragDrop: int;
		
		private var tempoTotal: int;
		private var tempoAnterior : int; //Sera usado apenas para medir o maior delay.
		private var delay: int;
		
		private var step: int; //Em alguns jogos nao sera usada.
		
		public function Coletor(){
			acertos = 0;
			erros = 0;
			tentativas = 0;
			dragDrop = 0;
			tempoTotal = 0;
			tempoAnterior = 0;
			delay = 0;
			step = 0;
		}	
		
		public function ConfereDados(){
			Debug.Log(acertos + " - " + erros + " - " + GetTentativasTotais() + " - " + dragDrop + " - " + tempoTotal + " - " + delay + " - " + step);
		}
		
		public function SetAcerto () {
			this.acertos++;
			
		}
		
		public function SetErro () {
			this.erros++;
		}
		
		public function SetErro (qnt : int) { //Usado nos games como Quebra-Cabeca, Associaca e Quanto E.
			if(qnt != 0){
				this.erros = qnt;
			}
		}
		
		public function GetTentativasTotais () {
			this.tentativas = acertos + erros;
			return tentativas;
		}
		
		public function SetDragDrop () {
			this.dragDrop++;
		}
		
		public function SetTempoTotal (tempo : int) {
			this.tempoTotal = tempo;
		}
		
		public function SetDelay (tempo: int) {
			this.delay = tempo;
		}
		
		public function SetStep () {
			this.step++;
		}
		
		public function RetornaDados () {
			var array = new Array(acertos,erros,GetTentativasTotais(),dragDrop,tempoTotal,delay,step);
			return array;
		}
		
		//Tempo.
		public function RetornaString () {
			return (acertos + "," + erros+","+GetTentativasTotais()+","+dragDrop+","+tempoTotal+","+delay+","+step);
		}
		
		public function VerificaMaiorDelay () {
			var temp = tempoTotal - tempoAnterior;
			if(temp > delay){
				this.delay = temp;
			}
			tempoAnterior = tempoTotal;
		}
}