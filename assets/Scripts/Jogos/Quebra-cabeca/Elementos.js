#pragma strict

public var pecas: GameObject[];
private var nivel: Nivel;
private var load: Load;
public var texturas: Object[];

function Start () {
	nivel = FindObjectOfType(typeof(Nivel)) as Nivel;
	load = FindObjectOfType(typeof(Load)) as Load;
	
	Carregar();
	Reload();
	
}

function Update () {
	
}

function Carregar () {
	var pasta = nivel.jogo + "/" + nivel.nivel;
	Debug.Log("Pasta " + pasta);
	texturas = Resources.LoadAll(pasta, typeof(Sprite));
	Debug.Log("Array " + texturas);
			
	for (var i in range(0, pecas.Length)) {
		Instantiate(pecas[i], pecas[i].transform.position, Quaternion.identity);
		pecas[i].GetComponent(SpriteRenderer).sprite = texturas[i];	
	}
}

function Reload () {
	if (!load.imagens[0]) {
		load.imagens[0] = true;
		Application.LoadLevel("QuebraCabeca");
	} else {
		load.Destruir();
	}
 } 