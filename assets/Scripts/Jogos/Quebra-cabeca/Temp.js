#pragma strict

public var pecas: GameObject[];


function Start () {
	
	for (var i in range(0, pecas.Length)) {
	//	Instantiate(pecas[i], pecas[i].transform.position, Quaternion.identity);
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