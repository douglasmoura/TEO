#pragma strict

public var imagem: Sprite;

public var origem: Transform;

public static final var velocidade = 30;

//Deslocamento ao clicar no objeto
private var offSet : Vector2;

//Verifica se associacão e válida.
private var valida: boolean;

//Verifica se objeto está sendo arrastado.
private var drag: boolean;

public var tavaDentro: boolean;

private var x: float;
private var y: float;

//Coletar o DragAndDrop;
private var dragDrop: boolean;

private var principal: MainQE;

function Awake () {
	principal = FindObjectOfType(typeof(MainQE)) as MainQE;
}

function Start () {
	valida = false;
	drag = false;
	tavaDentro = false;
	
	x = origem.position.x;
	y = origem.position.y;
	
	var spriteRender: SpriteRenderer;
	spriteRender = this.GetComponent(SpriteRenderer);
	spriteRender.sprite = imagem;
	
	//Ao ser instanciado ele apenas ira deslizar um valor definido para dar o efeito da "fila".
	//Deslizar(-8,-1.6f);
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
		principal.resultArea++;
		principal.seNovo = true; //Vide script MainQE
		tavaDentro = true;
		gameObject.tag = "Maca";
	}else if(dragDrop){ //Ira coletar os erros de peça errada.
		principal.AddErro();
		dragDrop = false;
		
	}else{
		principal.AddDragDrop(); //Ira coletar o drag and drop em uma area que nao seja pecas.
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

	dragDrop = true; // Se colidir com qualquer outra peca ira ser validar.

	var colidiu = colisor.gameObject.tag == "Lousa";
	
	var digito1 = colisor.gameObject.tag == "Digito 1";

	if (colidiu && drag) {
		valida = true;
	} else if(digito1 && drag){
		Debug.Log("Entrou");
	}else {
		valida = false;
	}
}

function OnTriggerExit2D(colisor : Collider2D){

	dragDrop = false;
	
	if (colisor.gameObject.tag == "Lousa" && tavaDentro) {
    	valida = false;
    	tavaDentro = false;
    	gameObject.tag = "Um";
    	principal.resultArea--;
    } else if (!tavaDentro) {
    	valida = false;
    }
}


//Problema.
function OnCollisionEnter2D(colisor: Collision2D) {
	//
	if (colisor.gameObject.tag != "Maca" && (!tavaDentro && !drag)) {
		//Destroy(colisor.gameObject);
		if (principal.qtUnidades == 0) {
			principal.qtUnidades += 2;
		} else {
			principal.qtUnidades += 1;
		}
		print("Destruiu! " + principal.qtUnidades);
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

function Deslizar (xAlvo : float, yAlvo : float) {

	var x2 = transform.position.x;
	var y2 = transform.position.y;
	var vetor = new Vector2(x2,y2);
	
	var velocidade = 1000000;
	var duracao = velocidade * Time.deltaTime;
	
	//Desloca o objeto de um ponto a outro de acordo com uma fracao
	transform.position = Vector2.MoveTowards(vetor, new Vector2(xAlvo, yAlvo), duracao);


}