#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import requests
import sys

# Tentar baixar da API da Bíblia Digital (fonte confiável)
print("Baixando Bíblia Almeida Revista e Corrigida...")

# Lista dos 66 livros bíblicos na ordem canônica
livros_info = [
    # Antigo Testamento (39 livros)
    {"nome": "Gênesis", "abrev": "gn", "testamento": "Antigo", "ordem": 1},
    {"nome": "Êxodo", "abrev": "ex", "testamento": "Antigo", "ordem": 2},
    {"nome": "Levítico", "abrev": "lv", "testamento": "Antigo", "ordem": 3},
    {"nome": "Números", "abrev": "nm", "testamento": "Antigo", "ordem": 4},
    {"nome": "Deuteronômio", "abrev": "dt", "testamento": "Antigo", "ordem": 5},
    {"nome": "Josué", "abrev": "js", "testamento": "Antigo", "ordem": 6},
    {"nome": "Juízes", "abrev": "jz", "testamento": "Antigo", "ordem": 7},
    {"nome": "Rute", "abrev": "rt", "testamento": "Antigo", "ordem": 8},
    {"nome": "1 Samuel", "abrev": "1sm", "testamento": "Antigo", "ordem": 9},
    {"nome": "2 Samuel", "abrev": "2sm", "testamento": "Antigo", "ordem": 10},
    {"nome": "1 Reis", "abrev": "1rs", "testamento": "Antigo", "ordem": 11},
    {"nome": "2 Reis", "abrev": "2rs", "testamento": "Antigo", "ordem": 12},
    {"nome": "1 Crônicas", "abrev": "1cr", "testamento": "Antigo", "ordem": 13},
    {"nome": "2 Crônicas", "abrev": "2cr", "testamento": "Antigo", "ordem": 14},
    {"nome": "Esdras", "abrev": "ed", "testamento": "Antigo", "ordem": 15},
    {"nome": "Neemias", "abrev": "ne", "testamento": "Antigo", "ordem": 16},
    {"nome": "Ester", "abrev": "et", "testamento": "Antigo", "ordem": 17},
    {"nome": "Jó", "abrev": "job", "testamento": "Antigo", "ordem": 18},
    {"nome": "Salmos", "abrev": "sl", "testamento": "Antigo", "ordem": 19},
    {"nome": "Provérbios", "abrev": "pv", "testamento": "Antigo", "ordem": 20},
    {"nome": "Eclesiastes", "abrev": "ec", "testamento": "Antigo", "ordem": 21},
    {"nome": "Cânticos", "abrev": "ct", "testamento": "Antigo", "ordem": 22},
    {"nome": "Isaías", "abrev": "is", "testamento": "Antigo", "ordem": 23},
    {"nome": "Jeremias", "abrev": "jr", "testamento": "Antigo", "ordem": 24},
    {"nome": "Lamentações", "abrev": "lm", "testamento": "Antigo", "ordem": 25},
    {"nome": "Ezequiel", "abrev": "ez", "testamento": "Antigo", "ordem": 26},
    {"nome": "Daniel", "abrev": "dn", "testamento": "Antigo", "ordem": 27},
    {"nome": "Oséias", "abrev": "os", "testamento": "Antigo", "ordem": 28},
    {"nome": "Joel", "abrev": "jl", "testamento": "Antigo", "ordem": 29},
    {"nome": "Amós", "abrev": "am", "testamento": "Antigo", "ordem": 30},
    {"nome": "Obadias", "abrev": "ob", "testamento": "Antigo", "ordem": 31},
    {"nome": "Jonas", "abrev": "jn", "testamento": "Antigo", "ordem": 32},
    {"nome": "Miquéias", "abrev": "mq", "testamento": "Antigo", "ordem": 33},
    {"nome": "Naum", "abrev": "na", "testamento": "Antigo", "ordem": 34},
    {"nome": "Habacuque", "abrev": "hc", "testamento": "Antigo", "ordem": 35},
    {"nome": "Sofonias", "abrev": "sf", "testamento": "Antigo", "ordem": 36},
    {"nome": "Ageu", "abrev": "ag", "testamento": "Antigo", "ordem": 37},
    {"nome": "Zacarias", "abrev": "zc", "testamento": "Antigo", "ordem": 38},
    {"nome": "Malaquias", "abrev": "ml", "testamento": "Antigo", "ordem": 39},
    # Novo Testamento (27 livros)
    {"nome": "Mateus", "abrev": "mt", "testamento": "Novo", "ordem": 40},
    {"nome": "Marcos", "abrev": "mc", "testamento": "Novo", "ordem": 41},
    {"nome": "Lucas", "abrev": "lc", "testamento": "Novo", "ordem": 42},
    {"nome": "João", "abrev": "jo", "testamento": "Novo", "ordem": 43},
    {"nome": "Atos", "abrev": "at", "testamento": "Novo", "ordem": 44},
    {"nome": "Romanos", "abrev": "rm", "testamento": "Novo", "ordem": 45},
    {"nome": "1 Coríntios", "abrev": "1co", "testamento": "Novo", "ordem": 46},
    {"nome": "2 Coríntios", "abrev": "2co", "testamento": "Novo", "ordem": 47},
    {"nome": "Gálatas", "abrev": "gl", "testamento": "Novo", "ordem": 48},
    {"nome": "Efésios", "abrev": "ef", "testamento": "Novo", "ordem": 49},
    {"nome": "Filipenses", "abrev": "fp", "testamento": "Novo", "ordem": 50},
    {"nome": "Colossenses", "abrev": "cl", "testamento": "Novo", "ordem": 51},
    {"nome": "1 Tessalonicenses", "abrev": "1ts", "testamento": "Novo", "ordem": 52},
    {"nome": "2 Tessalonicenses", "abrev": "2ts", "testamento": "Novo", "ordem": 53},
    {"nome": "1 Timóteo", "abrev": "1tm", "testamento": "Novo", "ordem": 54},
    {"nome": "2 Timóteo", "abrev": "2tm", "testamento": "Novo", "ordem": 55},
    {"nome": "Tito", "abrev": "tt", "testamento": "Novo", "ordem": 56},
    {"nome": "Filemom", "abrev": "fm", "testamento": "Novo", "ordem": 57},
    {"nome": "Hebreus", "abrev": "hb", "testamento": "Novo", "ordem": 58},
    {"nome": "Tiago", "abrev": "tg", "testamento": "Novo", "ordem": 59},
    {"nome": "1 Pedro", "abrev": "1pe", "testamento": "Novo", "ordem": 60},
    {"nome": "2 Pedro", "abrev": "2pe", "testamento": "Novo", "ordem": 61},
    {"nome": "1 João", "abrev": "1jo", "testamento": "Novo", "ordem": 62},
    {"nome": "2 João", "abrev": "2jo", "testamento": "Novo", "ordem": 63},
    {"nome": "3 João", "abrev": "3jo", "testamento": "Novo", "ordem": 64},
    {"nome": "Judas", "abrev": "jd", "testamento": "Novo", "ordem": 65},
    {"nome": "Apocalipse", "abrev": "ap", "testamento": "Novo", "ordem": 66}
]

# Tentar baixar de uma fonte JSON pública no GitHub
url_base = "https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/arc.json"

try:
    print(f"Tentando baixar de {url_base}...")
    response = requests.get(url_base, timeout=30)
    response.raise_for_status()
    biblia_raw = response.json()
    print("✓ Download bem-sucedido!")
    
    # Processar o JSON baixado
    biblia_estruturada = {"livros": []}
    
    for idx, livro_info in enumerate(livros_info):
        abrev = livro_info["abrev"]
        
        # Procurar o livro no JSON baixado
        livro_data = None
        for livro_raw in biblia_raw:
            if livro_raw.get("abbrev", {}).get("pt", "").lower() == abrev.lower():
                livro_data = livro_raw
                break
        
        if not livro_data:
            print(f"⚠ Livro {livro_info['nome']} não encontrado, pulando...")
            continue
        
        # Estruturar os capítulos e versículos
        capitulos_estruturados = []
        for cap_data in livro_data.get("chapters", []):
            numero_cap = cap_data.get("chapter", 0)
            versiculos_estruturados = []
            
            for vers_data in cap_data.get("verses", []):
                versiculos_estruturados.append({
                    "numero": vers_data.get("verse", 0),
                    "texto": vers_data.get("text", "")
                })
            
            if versiculos_estruturados:
                capitulos_estruturados.append({
                    "numero": numero_cap,
                    "versiculos": versiculos_estruturados
                })
        
        # Adicionar livro à estrutura
        biblia_estruturada["livros"].append({
            "nome": livro_info["nome"],
            "testamento": livro_info["testamento"],
            "capitulos": capitulos_estruturados
        })
        
        print(f"✓ Processado: {livro_info['nome']} ({len(capitulos_estruturados)} capítulos)")
    
    # Salvar JSON principal
    with open("biblia_almeida_completa.json", "w", encoding="utf-8") as f:
        json.dump(biblia_estruturada, f, ensure_ascii=False, indent=2)
    print(f"\n✓ Bíblia completa salva em biblia_almeida_completa.json ({len(biblia_estruturada['livros'])} livros)")
    
    # Criar lista de livros com informações básicas
    livros_resumo = []
    for livro in biblia_estruturada["livros"]:
        total_versiculos = sum(len(cap["versiculos"]) for cap in livro["capitulos"])
        livros_resumo.append({
            "nome": livro["nome"],
            "testamento": livro["testamento"],
            "ordem": len(livros_resumo) + 1,
            "n_capitulos": len(livro["capitulos"]),
            "n_versiculos": total_versiculos
        })
    
    with open("livros_info.json", "w", encoding="utf-8") as f:
        json.dump({"livros": livros_resumo}, f, ensure_ascii=False, indent=2)
    print(f"✓ Lista de livros salva em livros_info.json\n")
    
    # Estatísticas finais
    total_caps = sum(l["n_capitulos"] for l in livros_resumo)
    total_vers = sum(l["n_versiculos"] for l in livros_resumo)
    print(f"Estatísticas finais:")
    print(f"  • {len(livros_resumo)} livros")
    print(f"  • {total_caps} capítulos")
    print(f"  • {total_vers} versículos")
    
except Exception as e:
    print(f"✗ Erro: {e}")
    sys.exit(1)

