#pragma strict


public var array: GameObject[];
public var nivel: Nivel;
public var a: PecaMemoria;
public var b: PecaMemoria;
public var parabens: GameObject;
public var pontos = 0;

function Start () {
	nivel = FindObjectOfType(typeof(Nivel)) as Nivel;
	
	Embaralhar();
	Instanciar();
}

function Update () {
	
	//GUI.enabled = false;
    //GUI.color.a = .1;
    if (pontos == 2) {
    	Instantiate(parabens, Vector3(0, 0, -2), Quaternion.identity);	
    	pontos = -1;
    }
}

function Instanciar() {
	var quantidade = nivel.nivel * 2 + 2;
   
    for (var i : int = 0; i < quantidade; i++) {
        var primeiro : int = Random.Range(i, quantidade);
        var segundo = array[i].transform.position;
        
        array[i].transform.position = array[primeiro].transform.position;
        Instantiate(array[i], array[i].transform.position, Quaternion.identity);
        array[primeiro].transform.position = segundo;
    }
}

function Embaralhar() {
	var quantidade = nivel.nivel * 2 + 2;
	
	var pasta = nivel.jogo + "/" + nivel.nivel;
	
	var x = 2.5f - (quantidade);
	var y = 1.7f;
 
    for (var i : int = 0; i < quantidade; i++) {
    	array[i].transform.position = Vector2(x, y);
    	x += 3.5f;
    	if (i + 1 == quantidade / 2.0) {
    		y -= 3.6f;
    		x = 2.5f - (quantidade);
    	}
    }
}