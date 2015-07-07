#pragma strict

public var nivel:int;
public var jogador: String; //Nao esta sendo usado!


function Awake() {
	DontDestroyOnLoad (this);
}

function Start () {

}

function Update () {

}

public function Destruir() {
	Destroy(gameObject);
}