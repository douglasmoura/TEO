#pragma strict

public var virada = true;
public var bloquear = false;
public var frente: Sprite;
public var costas: Sprite;
private var memoria: Memoria;

function Start () {
	memoria = FindObjectOfType(typeof(Memoria)) as Memoria;
	CarregarSprite();
}

function CarregarSprite() {
	var sprite = memoria.nivel.jogo + "/" + gameObject.tag;
	frente = Resources.Load(sprite, typeof(Sprite));
	Debug.Log("Executou! " + sprite);
}

/**
 * Trata evento de quando clicar em cima do objeto.
**/
function OnMouseDown() {
	
	if (memoria.a == null && memoria.b != null) {
		if (Virar()) {
			memoria.a = this;
			Avaliar(memoria.a, memoria.b);
		}
	} else if (memoria.b == null  && memoria.a != null) {
		if (Virar()) {
			memoria.b = this;
			Avaliar(memoria.a, memoria.b);
		}
	} else if (memoria.b == null  && memoria.a == null){
		if (Virar()) {
			memoria.a = this;
		}
	}
	
	memoria.coletorGame.VerificaMaiorDelay();
	
}

function Avaliar(a: PecaMemoria, b: PecaMemoria) {
	yield WaitForSeconds(1);

	if (memoria.a.tag == memoria.b.tag) {
		a.bloquear = true;
		b.bloquear = true;
		memoria.pontos += 1;
		
	} else {
		a.bloquear = false;
		b.bloquear = false;
		
		a.Virar();
		b.Virar();
		
		memoria.coletorGame.SetErro(); //Vale a pena encapsular?
	}
	memoria.a = null;
	memoria.b = null;
}

public function Virar() {
	if (virada && !bloquear) {
		gameObject.GetComponent(SpriteRenderer).sprite = frente;
		virada = !virada;
		bloquear = true;
		return true;
	} else if (!bloquear){
		gameObject.GetComponent(SpriteRenderer).sprite = costas;
		virada = !virada;
		return false;
	}
}