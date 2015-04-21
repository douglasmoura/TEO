using System.IO;
using System;
using UnityEngine;
using System.Collections;

public class CsColetor : MonoBehaviour {

	private string caminhoArquivo;

	void Awake() {
		caminhoArquivo = Application.persistentDataPath + "dados.csv"; // Pegando o caminho certo.
	}

	//private string caminhoArquivo = System.IO.Path.GetFullPath ("dados.csv"); // Pegando o caminho certo.
	//public string caminhoArquivo = Application.persistentDataPath + "dados.csv"; // Pegando o caminho certo.

	public void SaveToFile(string dados){
		if(File.Exists (caminhoArquivo)) {
			using (StreamWriter sw = new StreamWriter(caminhoArquivo,true)){
				sw.WriteLine (dados);
				sw.Close ();	
			} 
		}

		else{
			using(FileStream fs = File.Create(caminhoArquivo)){
				using (StreamWriter sw = new StreamWriter(fs)){
					sw.WriteLine ("sep=,");
					sw.WriteLine ("Acertos" + "," + "Erros"+","+"TentativasTotais" +","+ "DragDrop"+","+"TempoTotal"+","+"Delay"+","+"Step");
					sw.WriteLine (dados);
					sw.Close ();
				}
			}
		}
	}

	//Para ler os dados dos jogos no box da coleta(Menu) 
	//Melhorar!
	public string ReadFromFile(){

		string coleta = "";
	
		if(File.Exists(caminhoArquivo)){
			try{
				using (StreamReader sr = new StreamReader(caminhoArquivo)){
					string linha;
					while((linha = sr.ReadLine())!= null){
						if(linha.Equals("sep=,") || linha.Equals("Acertos" + "," + "Erros"+","+"TentativasTotais" +","+ "DragDrop"+","+"TempoTotal"+","+"Delay"+","+"Step")){
							continue;
						}
						else{
							string linha_atual = "";
							for(int i = 0 ; i < linha.Length; i++){
								if(linha[i].Equals(',')){
									linha_atual += "\t";
								}else{
									linha_atual += linha[i];
								}
							}
							coleta += linha_atual + "\n";
						}
					}
				}

			}catch(Exception e){
				Debug.Log(e.Message);
			}
		}
		return coleta;
	}
}