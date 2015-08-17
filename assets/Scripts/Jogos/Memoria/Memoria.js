#pragma strict


public var array: GameObject[];
public var nivel: Nivel;
public var texturas: Object[];

function Start () {
	nivel = FindObjectOfType(typeof(Nivel)) as Nivel;
	Embaralhar();
}

function Update () {

}


function Embaralhar() {
	var quantidade = nivel.nivel * 2 + 2;
	
	var pasta = nivel.jogo + "/" + nivel.nivel;
	Debug.Log("Pasta " + pasta);
	texturas = Resources.LoadAll(pasta, typeof(Sprite));
	Debug.Log("Array " + texturas);
	var x = -0.4f * (quantidade * 2);
	var y = 1.7f;
 
    for (var i : int = 0; i < array.Length; i++) {
    	array[i].transform.position = Vector2(x, y);
    	x += 3.5f;
    	if (i + 1 == quantidade / 2.0) {
    		y -= 3.6f;
    		x = (-5.5f * 2) / (quantidade/2);
    	}
    	
        //var primeiro : int = Random.Range(i, array.Length);
        //var segundo = array[i].transform.position;
        
        //array[i].transform.position = array[primeiro].transform.position;
        //array[i].GetComponent(SpriteRenderer).sprite = texturas[i];
        Instantiate(array[i], array[i].transform.position, Quaternion.identity);
        //array[primeiro].transform.position = segundo;
        
        if (i + 1 == quantidade) {
        	break;
        }
    }
}