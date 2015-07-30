#pragma strict

public var pecas: GameObject[];
public var teste: GUITexture;

function Start () {
	//var go: GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
	//var textures: Texture2D[] = Resources.LoadAll("\assets\Imagens\Quebra-cabeça\Tartaruga\Nivel 1\1_1.png") as Texture2D[];
	//var texture: Texture2D = textures[Random.Range(0, textures.Length)];
	//go.GetComponent.<Renderer>().material.mainTexture = texture;
	//var www = new WWW("file:///assets/Imagens/Quebra-cabeça/Tartaruga/Nivel 1/1_1.png");

	
	for (var i in range(0, pecas.Length)) {
		Instantiate(pecas[i], pecas[i].transform.position, Quaternion.identity);
		var myFruit = Resources.Load("Tartaruga/1/" + (i + 1), typeof(Sprite)) as Sprite;
		//pecas[i].renderer.material.mainTexture = www.texture;
		pecas[i].GetComponent(SpriteRenderer).sprite = myFruit;
		
		
		/**
		var obj = Instantiate(pecas[i], pecas[i].transform.position, Quaternion.identity);
		obj.renderer.material.color = Color.black;
		var obj2 = Instantiate(pecas[i], pecas[i].transform.position, Quaternion.identity);
		obj2.transform.localScale.x -= 0.02;
		obj2.transform.localScale.y -= 0.02;
		**/
	}

}

function Update () {
	
}