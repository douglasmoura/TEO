#pragma strict

#pragma strict

//velocidade de retorno do cubo.
public static final var velocidade = 30;

//Ponto de origem do cubo
public static final var x = 6;
public static final var y = -2.5;

//Deslocamento ao clicar no objeto
private var offSet : Vector2;

//Contém o objeto que será deletado.
private var delete: GameObject;

//Verifica se associacão e válida.
private var valida: boolean;

//Verifica se objeto está sendo arrastado.
private var drag: boolean;

private var instanciador: MainCores;
//Coletar o DragAndDrop;
private var colidiuOutraPeca: boolean;

function Start() {
	valida = false;
	drag = false;
	delete = null;
	
	instanciador = FindObjectOfType(typeof(MainCores)) as MainCores;
}


function Update() {
    
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
	
	instanciador.jogou = true; //Capturar o tempo entre as jogadas.
	
	//se Associacao e valida, entao destroi os dois cubos associados
	if (valida) {
		instanciador.AddAcerto();
		Destroy(gameObject);
		Destroy(delete);
		instanciador.erros = 0;
		
	}else if(colidiuOutraPeca){ //Ira coletar os erros de peça errada.
		instanciador.erros++;
		instanciador.errosTotais++;
		colidiuOutraPeca = false;
		
	}else{
		instanciador.AddDragDrop(); //Ira coletar o drag and drop em uma area que nao seja pecas.
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

/**
 * Detecta quando o cubo encontra outro objeto.
 *
**/
function OnTriggerEnter2D(colisor: Collider2D) {

	colidiuOutraPeca = true; // Se colidir com qualquer outra peca ira ser validar.
			
	colisor.gameObject.transform.localScale.x += 0.1;
	colisor.gameObject.transform.localScale.y += 0.1;
	
	var colidiu = colisor.gameObject.tag == gameObject.tag;
	
	if (colidiu && drag) {
		delete = colisor.gameObject;
		valida = true;
	} else {
		valida = false;
	}
}

/**
 * Detecta quando o cubo sai da colicao de outro objeto.
 *
**/
function OnTriggerExit2D(colisor : Collider2D){

	colidiuOutraPeca = false;
	
	colisor.gameObject.transform.localScale = gameObject.transform.localScale;
	
	if (colisor.gameObject.tag == gameObject.tag && drag) {
    	valida = false;
    } else if (!drag) {
    	instanciador.erros ++;
    }
}

/**
 * Retorna o cubo para o ponto de origem.
 * O metodo Lerp recebe posicao atual e posicao de destino + fracao.
 * O objeto e movido para o destino.
**/
function Retornar() {	
	var x2 = transform.position.x;
	var y2 = transform.position.y;
	
	//Distancia dos dois pontos
	var distancia = Mathf.Sqrt(Mathf.Pow((x - x2), 2) + Mathf.Pow((y - y2), 2));
	
	var fracao = Time.deltaTime * velocidade/distancia;
	
	//Desloca o objeto de um ponto a outro de acordo com uma fracao
	transform.position = Vector2.Lerp(transform.position, Vector2(x, y), fracao);
}