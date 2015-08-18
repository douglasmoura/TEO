#pragma strict

private var virada = true;
public var frente: Sprite;
public var costas: Sprite;
private var nivel: Nivel;

function Start () {
	nivel = FindObjectOfType(typeof(Nivel)) as Nivel;
	CarregarSprite();
}

function Update () {

}

function CarregarSprite() {
	var sprite = nivel.jogo + "/" + gameObject.tag;
	frente = Resources.Load(sprite, typeof(Sprite));
	Debug.Log("Executou! " + sprite);
}

/**
 * Trata evento de quando clicar em cima do objeto.
**/
function OnMouseDown() {
	if (virada) {
		gameObject.GetComponent(SpriteRenderer).sprite = frente;
		//virada = false;
	} else {
		gameObject.GetComponent(SpriteRenderer).sprite = costas;
		//virada = true;
	}
	virada = !virada;
	Debug.Log("Clicou!");
} 