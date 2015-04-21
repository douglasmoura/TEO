#pragma strict

public static final var deslocamento = 3.5f;

public var tamanho: int;
public var cores: GameObject[];

private var nivelScript: Nivel;

function Awake() {
	nivelScript = FindObjectOfType(typeof(Nivel)) as Nivel;
	if (nivelScript.nivel == 1) {
		tamanho = 4;
	} else {
		tamanho = 6;
	}
	//nivelScript.Destruir();
}

function Start () {
	transform.position.x = -5.0;
	transform.position.y = 1.2;
	embaralhar();
	criarCubos();
}

function Update () {

}

function criarCubos() {
	var x = transform.position.x;
	var y = transform.position.y;
	var metadeTamanho = (tamanho/2) - 1;
	
	for (var i = 0; i < tamanho; i++) {
		Instantiate(cores[i], Vector2(x, y), cores[i].transform.rotation);
		x += deslocamento;
		if (i == metadeTamanho) {
				y -= deslocamento;
				x = transform.position.x;
		}
	}
}

function jaSaiu(index: int, array: int[]) {
	for (var i = 0; i < array.Length; i++) {
		if (index == array[i]) {
			return true;
		}
	}
	return false;
}

function embaralhar() {  
 
    for (var i : int = 0; i < tamanho; i++) {
        var primeiro : int = Random.Range(i, tamanho);
        var segundo = cores[i];
        cores[i] = cores[primeiro];
        cores[primeiro] = segundo;
    }
}