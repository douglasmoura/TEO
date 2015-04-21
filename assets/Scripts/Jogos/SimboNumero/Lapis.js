#pragma strict

public var origem: Transform;

public static final var velocidade = 30;

public static final var unidade = 1;
public static final var cinco = 5;
public static final var dezena = 10;

//Deslocamento ao clicar no objeto
private var offSet : Vector2;

//Verifica se associacão e válida.
public var valida: boolean;

//Verifica se objeto está sendo arrastado.
private var drag: boolean;

public var tavaDentro: boolean;

private var x: float;
private var y: float;

private var simboNumero: SimboNumero;

function Awake () {
	simboNumero = FindObjectOfType(typeof(SimboNumero)) as SimboNumero;
}

function Start () {
	valida = false;
	drag = false;
	
	x = origem.position.x;
	y = origem.position.y;
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
	drag = false;
	
	//se Associacao e valida, entao destroi os dois cubos associados
	if (valida && !tavaDentro) {
		if (gameObject.tag == "Lapis") {
    		simboNumero.valor += unidade;
    	} else if (gameObject.tag == "PortaLapis") {
    		simboNumero.valor += cinco;
    	} else if (gameObject.tag == "CaixaLapis") {
    		simboNumero.valor += dezena;
    	}
		tavaDentro = true;
		print("Somandooooo");
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

	var colidiu = colisor.gameObject.tag == "Lousa";

	if (colidiu && drag) {
		print("Entrou!!!");
		valida = true;
	} else {
		valida = false;
	}
}

function OnTriggerExit2D(colisor : Collider2D){
	
	if (colisor.gameObject.tag == "Lousa" && tavaDentro) {
    	valida = false;
    	if (gameObject.tag == "Lapis") {
    		simboNumero.valor -= unidade;
    	} else if (gameObject.tag == "PortaLapis") {
    		simboNumero.valor -= cinco;
    	} else if (gameObject.tag == "CaixaLapis") {
    		simboNumero.valor -= dezena;
    	}
    	tavaDentro = false;
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