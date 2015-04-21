#pragma strict

public var labelSkin: GUISkin;
public var botaoNivel1: GUISkin;
public var botaoNivel2: GUISkin;

public var nivel: Nivel;

function Start () {
	nivel = FindObjectOfType(typeof(Nivel)) as Nivel;
	nivel.nivel = 1;
}

function Update () {

}

function Exibir() {
	GUI.skin = labelSkin;
	GUI.Label (Rect (345, 390, 250, 50), "Nível:");
	
	/**
	if (nivel1) {
		GUI.skin = botaoNivel1;
	} else {
		GUI.skin = botaoNivel2;
	}
	**/
	GUI.skin = botaoNivel2;
	
	MarcarNivel(4);
	var quatro = GUI.Button (Rect (520,435,55,53), "");
	MarcarNivel(3);	
	var tres = GUI.Button (Rect (460,435,55,53), "");
	MarcarNivel(2);
	var dois = GUI.Button (Rect (400,435,55,53), "");
	MarcarNivel(1);
	var um = GUI.Button (Rect (340,435,55,53), "");	
	
	if (um) {
		if (nivel.nivel != 1) {
			nivel.nivel = 1;
		}
	}
	
	if (dois) {
		if (nivel.nivel != 2) {
			nivel.nivel = 2;
		}
	}
	
	if (tres) {
		if (nivel.nivel != 3) {
			nivel.nivel = 3;
		}
	}
	
	if (quatro) {
		if (nivel.nivel != 4) {
			nivel.nivel = 4;
		}
	}	
}

function MarcarNivel(nivelEntrada : int) {
	if (nivel.nivel >= nivelEntrada) {
		GUI.skin = botaoNivel2;
	} else {
		GUI.skin = botaoNivel1;
	}
}