#pragma strict

/*
* Principal script do jogo "Onde Esta?".
* Variaveis de coleta de dados 25-29. Todas recebem valores durante o jogo.
* Todas as funçoes estao implementadas.
* Codigo ja refatorado.
* @author Douglas Moura e Diogenes Laertius.
* @date 16.09.2014
*/

//Camera do jogo
public var cam:Camera;
//String indicando a parte sorteada
public var ondeEstaStr:GUIText;
//Resultado do jogo
//public var resultado:GUIText;
//Array com as partes do rosto
public var musica:AudioClip;
//Array contendo as partes do corpo sorteadas.
private var partesCorpo = ["Orelha", "Olho", "Nariz", "Boca"];
//Parte sorteada
private var parte:String;
//Contador para sortear apenas 4 partes. Iniciado na funçao start();
private var contador:int;

public var textura:Sprite[];

//Variavel auxiliar para sair da funcao update.
public var completou = false;

private var nivelScript: Nivel;

//Responsavel por Coletar os dados.
public var coletorGame: Coletor;

//Janela popup.
private var popupScript: Popup;

//Janela popup.
private var paraScript: Parabens;

//Script em C# responsavel por gerar o arquivo csv e colocar os dados dentro do mesmo.
private var csScript : CsColetor;

//Ainda nao funciona.
private var faderScript : Fader;

function Awake() {

	csScript = this.GetComponent("CsColetor");
	
	nivelScript = FindObjectOfType(typeof(Nivel)) as Nivel;
	if (nivelScript.nivel == 2) {
		var qualRostoEscolher = Random.Range(1,6);
		GetComponent(SpriteRenderer).sprite = textura[qualRostoEscolher];
	}
	//nivelScript.Destruir();
}

function Start () {
	
	paraScript = FindObjectOfType(typeof(Parabens)) as Parabens;

	popupScript = FindObjectOfType(typeof(Popup)) as Popup;
	
	contador = partesCorpo.Length;
	ProcurandoLocal();
}

function Update () {

	if(!completou){
 		verificaClick();
 	}
}

//------------------------------------------
function ProcurandoLocal(){

	parte = partesCorpo[Random.Range(0, partesCorpo.Length)];
	
	//Verificador.
	do{
		parte = partesCorpo[Random.Range(0, partesCorpo.Length)];
	}while(parte == "0" && contador > 0);
	
	//Marcando parte usada para nao ser repetida. Talvez um indexOf resolva, como melhoria.
	for(var i = 0; i < partesCorpo.Length; i++){
		if(parte == partesCorpo[i]){
			partesCorpo[i] = "0";
		}
	}
	//Caracter de teste, enquanto nao ha o audio.
	ondeEstaStr.text = "Onde esta: " + parte + " ?";
}

//------------------------------------------
function verificaClick(){
	if(contador > 0){
		var mouse = cam.main.ScreenPointToRay(Input.mousePosition);
	    if (Input.GetMouseButtonDown(0)) {
	        var hit : RaycastHit2D = Physics2D.Raycast(cam.ScreenToWorldPoint(Input.mousePosition), Vector2.zero);
	        if(hit.collider != null) {
	        	if (hit.collider.tag == parte) {
	        		coletorGame.SetAcerto();
					AcertoMUSICA();
	        		contador--;
	        		if(contador!= 0){ //Caso contador se torne 0 ele nao ira repetir essa funcao porem ira sortear novamente outro local.
	        			ProcurandoLocal();
	        		}	
	            	} else {
	        		coletorGame.SetErro();
	        		yield WaitForSeconds(1);		
	        	}
	        } else {
				coletorGame.SetErro();
	        	yield WaitForSeconds(1);
	        }
	   	coletorGame.SetTempoTotal(Time.timeSinceLevelLoad);
	    coletorGame.VerificaMaiorDelay();
	    }
	//Se todos os locais tivereme acabado, ou seja contador = 0.    
	}else{
		PlayerCompletaGame();
		completou = true;
	}
}

//------------------------------------------
//Reproduzir efeitos musicais.
function AcertoMUSICA() {
	audio.clip = musica;
	audio.Play();
	yield WaitForSeconds(1); // Problema que o jogador pode clicar duas vezes no mesmo local.
	audio.Stop();//Para a musica parar e nao vir outra posicao e ainda estiver na comemoracao.
}

//------------------------------------------
//Funcao que escreve os dados e apresenta ao final da partida.
function PlayerCompletaGame(){
	
	//Caracter de teste, enquanto nao ha o audio.
	ondeEstaStr.text = "";
	paraScript.Habilita();
	yield WaitForSeconds(5);
	paraScript.Desabilita();
	popupScript.Habilita();
	
	csScript.SaveToFile(coletorGame.RetornaString());
	//csScript.ReadFromFile();
	coletorGame.ConfereDados();
	//Entrada para o banco de dados.
	
	var dadosPopUp = coletorGame.RetornaDados();//Gera um array contendo os dados da partida.
	//Apos definir no PopUp passase dadosPopUp como parametro na funcao abaixo.
	popupScript.setDadosPopUp(dadosPopUp);
	

}
