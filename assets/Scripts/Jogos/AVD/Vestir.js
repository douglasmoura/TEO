#pragma strict

public var roupas: GameObject[];

function Start () {
	Embaralhar();
}

function Update () {

}

function Embaralhar() {
    for (var i : int = 0; i < roupas.Length; i++) {
        var primeiro : int = Random.Range(i, roupas.Length);
        var segundo = roupas[i].transform.position;
        
        roupas[i].transform.position = roupas[primeiro].transform.position;
        //roupas[i].GetComponent(SpriteRenderer).sprite = texturas[i];
        var script = roupas[i].GetComponent(ObjetoVestir);
        //Instantiate(pecas[i], pecas[i].transform.position, Quaternion.identity);
        script.x = roupas[primeiro].transform.position.x;
        script.y = roupas[primeiro].transform.position.y;
        roupas[primeiro].transform.position = segundo;
    }
}