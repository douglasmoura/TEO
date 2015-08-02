#pragma strict

public var pecas: GameObject[];
public var nivel: Nivel;
public var texturas: Object[];

function Start () {
	nivel = FindObjectOfType(typeof(Nivel)) as Nivel;
	var pasta = nivel.jogo + "/" + nivel.nivel;
	Debug.Log("Pasta " + pasta);
	texturas = Resources.LoadAll(pasta, typeof(Sprite));
	Debug.Log("Array " + texturas);
			
	for (var i in range(0, pecas.Length)) {
		Instantiate(pecas[i], pecas[i].transform.position, Quaternion.identity);
		//var myFruit = Resources.Load(pasta + (i + 1), typeof(Sprite)) as Sprite;
		pecas[i].GetComponent(SpriteRenderer).sprite = texturas[i];
		
		
	}
	
	//yield WaitForSeconds(1);
	//Application.LoadLevel("QuebraCabeca");

}

function Update () {
	
}