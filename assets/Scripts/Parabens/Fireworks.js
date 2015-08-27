#pragma strict

public var fogos1: GameObject;
public var fogos2: GameObject;
public var x: float[];
public var y: float[];

function Start () {
	Criar();
}

function Update () {
	
}

function Criar() {
	for (var i = 0; i < 5; i++) {
		Instantiate(fogos1, Vector3(Random.Range(-6.0, 6.0), Random.Range(2.0, 4.0), 2), Quaternion.identity);
		yield WaitForSeconds(1.0);
		Instantiate(fogos2, Vector3(Random.Range(-6.0, 6.0), Random.Range(2.0, 4.0), 2), Quaternion.identity);
		yield WaitForSeconds(0.8);
	}
}