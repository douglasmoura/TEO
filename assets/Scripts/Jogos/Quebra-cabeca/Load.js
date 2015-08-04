#pragma strict

public var imagens: boolean[];

function Awake() {
	DontDestroyOnLoad (this);
}

public function Destruir() {
	Destroy(gameObject);
}