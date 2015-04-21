#pragma strict

public var origem: Transform;

public static final var velocidade = 30;

//Deslocamento ao clicar no objeto
private var offSet : Vector2;

//Verifica se associacão e válida.
private var valida: boolean;

//Verifica se objeto está sendo arrastado.
private var drag: boolean;

private var x: float;
private var y: float;

private var objeto: GameObject;

private var pecasDrag: MainQC;

private var colidiuOutraPeca: boolean;

function Start () {
	valida = false;
	drag = false;
	
	x = origem.position.x;
	y = origem.position.y;
	
	pecasDrag = FindObjectOfType(typeof(MainQC)) as MainQC;
}

function Update () {
	
	/**
	 * Se objeto não foi associado corretamente, ele irá retornar
	 * ao ponto de origem.
	**/
	if (!valida && !drag) {
		Retornar();
	}
}

/**
 * Trata evento de quando clicar em cima do objeto.
**/
function OnMouseDown() {
	//Posicão do mouse
	var mouse = Vector2(Input.mousePosition.x, Input.mousePosition.y);
	
	//Posicao do mouse referente à camera
	var posicaoMouse = Camera.main.ScreenToWorldPoint(mouse);
	
	//Deslocamento
    offSet = transform.position - posicaoMouse;
} 

/**
 * Trata evento de quando soltar o botao do mouse.
**/
function OnMouseUp() {
	pecasDrag.jogou = true; //Capturar o tempo entre as jogadas.
	drag = false;
	
	//se Associacao e valida, entao destroi os dois cubos associados
	if (valida) {
		pecasDrag.AddAcerto();
		var novoSprite = gameObject.GetComponent(SpriteRenderer).sprite;
		objeto.GetComponent(SpriteRenderer).sprite = novoSprite;
		Destroy(gameObject);
	}else if(colidiuOutraPeca){ //Ira coletar os erros de peça errada.
		pecasDrag.erros++;
		colidiuOutraPeca = false;
	}else{
		pecasDrag.AddDragDrop(); //Ira coletar o drag and drop em uma area que nao seja pecas.
	}
}

/**
 * Trata do evento de arrastar o objeto.
 *
**/ 
function OnMouseDrag(){
	drag = true;
    var curScreenSpace = Vector3(Input.mousePosition.x, Input.mousePosition.y, 1);  
    transform.position = Camera.main.ScreenToWorldPoint(curScreenSpace) + offSet;
}

function OnTriggerEnter2D(colisor: Collider2D) {

	colidiuOutraPeca = true; // Se colidir com qualquer outra peca ira ser validar.
			
	var colidiu = colisor.gameObject.tag == gameObject.tag;
	
	if (colidiu && drag) {
		objeto = colisor.gameObject;
		valida = true;
	} else {
		valida = false;
	}
}

function OnTriggerExit2D(colisor : Collider2D){

	colidiuOutraPeca = false;
	
	if (colisor.gameObject.tag == gameObject.tag && drag) {
    	valida = false;
    }
}

function Retornar() {
	var x2 = transform.position.x;
	var y2 = transform.position.y;
	
	//Distancia dos dois pontos
	var distancia = Mathf.Sqrt(Mathf.Pow((x - x2), 2) + Mathf.Pow((y - y2), 2));
	
	var fracao = Time.deltaTime * velocidade/distancia;
	
	//Desloca o objeto de um ponto a outro de acordo com uma fracao
	transform.position = Vector2.Lerp(transform.position, Vector2(x, y), fracao);
}