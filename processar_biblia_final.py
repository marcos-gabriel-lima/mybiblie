#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import requests
import sys

print("Baixando Bíblia Almeida Revista e Corrigida (ARC) do GitHub...")

# Lista dos 66 livros bíblicos na ordem canônica
livros_info = [
    # Antigo Testamento (39 livros)
    {"nome": "Gênesis", "abbrev_pt": "gn", "testamento": "Antigo"},
    {"nome": "Êxodo", "abbrev_pt": "ex", "testamento": "Antigo"},
    {"nome": "Levítico", "abbrev_pt": "lv", "testamento": "Antigo"},
    {"nome": "Números", "abbrev_pt": "nm", "testamento": "Antigo"},
    {"nome": "Deuteronômio", "abbrev_pt": "dt", "testamento": "Antigo"},
    {"nome": "Josué", "abbrev_pt": "js", "testamento": "Antigo"},
    {"nome": "Juízes", "abbrev_pt": "jz", "testamento": "Antigo"},
    {"nome": "Rute", "abbrev_pt": "rt", "testamento": "Antigo"},
    {"nome": "1 Samuel", "abbrev_pt": "1sm", "testamento": "Antigo"},
    {"nome": "2 Samuel", "abbrev_pt": "2sm", "testamento": "Antigo"},
    {"nome": "1 Reis", "abbrev_pt": "1rs", "testamento": "Antigo"},
    {"nome": "2 Reis", "abbrev_pt": "2rs", "testamento": "Antigo"},
    {"nome": "1 Crônicas", "abbrev_pt": "1cr", "testamento": "Antigo"},
    {"nome": "2 Crônicas", "abbrev_pt": "2cr", "testamento": "Antigo"},
    {"nome": "Esdras", "abbrev_pt": "ed", "testamento": "Antigo"},
    {"nome": "Neemias", "abbrev_pt": "ne", "testamento": "Antigo"},
    {"nome": "Ester", "abbrev_pt": "et", "testamento": "Antigo"},
    {"nome": "Jó", "abbrev_pt": "job", "testamento": "Antigo"},
    {"nome": "Salmos", "abbrev_pt": "sl", "testamento": "Antigo"},
    {"nome": "Provérbios", "abbrev_pt": "pv", "testamento": "Antigo"},
    {"nome": "Eclesiastes", "abbrev_pt": "ec", "testamento": "Antigo"},
    {"nome": "Cânticos", "abbrev_pt": "ct", "testamento": "Antigo"},
    {"nome": "Isaías", "abbrev_pt": "is", "testamento": "Antigo"},
    {"nome": "Jeremias", "abbrev_pt": "jr", "testamento": "Antigo"},
    {"nome": "Lamentações", "abbrev_pt": "lm", "testamento": "Antigo"},
    {"nome": "Ezequiel", "abbrev_pt": "ez", "testamento": "Antigo"},
    {"nome": "Daniel", "abbrev_pt": "dn", "testamento": "Antigo"},
    {"nome": "Oséias", "abbrev_pt": "os", "testamento": "Antigo"},
    {"nome": "Joel", "abbrev_pt": "jl", "testamento": "Antigo"},
    {"nome": "Amós", "abbrev_pt": "am", "testamento": "Antigo"},
    {"nome": "Obadias", "abbrev_pt": "ob", "testamento": "Antigo"},
    {"nome": "Jonas", "abbrev_pt": "jn", "testamento": "Antigo"},
    {"nome": "Miquéias", "abbrev_pt": "mq", "testamento": "Antigo"},
    {"nome": "Naum", "abbrev_pt": "na", "testamento": "Antigo"},
    {"nome": "Habacuque", "abbrev_pt": "hc", "testamento": "Antigo"},
    {"nome": "Sofonias", "abbrev_pt": "sf", "testamento": "Antigo"},
    {"nome": "Ageu", "abbrev_pt": "ag", "testamento": "Antigo"},
    {"nome": "Zacarias", "abbrev_pt": "zc", "testamento": "Antigo"},
    {"nome": "Malaquias", "abbrev_pt": "ml", "testamento": "Antigo"},
    # Novo Testamento (27 livros)
    {"nome": "Mateus", "abbrev_pt": "mt", "testamento": "Novo"},
    {"nome": "Marcos", "abbrev_pt": "mc", "testamento": "Novo"},
    {"nome": "Lucas", "abbrev_pt": "lc", "testamento": "Novo"},
    {"nome": "João", "abbrev_pt": "jo", "testamento": "Novo"},
    {"nome": "Atos", "abbrev_pt": "at", "testamento": "Novo"},
    {"nome": "Romanos", "abbrev_pt": "rm", "testamento": "Novo"},
    {"nome": "1 Coríntios", "abbrev_pt": "1co", "testamento": "Novo"},
    {"nome": "2 Coríntios", "abbrev_pt": "2co", "testamento": "Novo"},
    {"nome": "Gálatas", "abbrev_pt": "gl", "testamento": "Novo"},
    {"nome": "Efésios", "abbrev_pt": "ef", "testamento": "Novo"},
    {"nome": "Filipenses", "abbrev_pt": "fp", "testamento": "Novo"},
    {"nome": "Colossenses", "abbrev_pt": "cl", "testamento": "Novo"},
    {"nome": "1 Tessalonicenses", "abbrev_pt": "1ts", "testamento": "Novo"},
    {"nome": "2 Tessalonicenses", "abbrev_pt": "2ts", "testamento": "Novo"},
    {"nome": "1 Timóteo", "abbrev_pt": "1tm", "testamento": "Novo"},
    {"nome": "2 Timóteo", "abbrev_pt": "2tm", "testamento": "Novo"},
    {"nome": "Tito", "abbrev_pt": "tt", "testamento": "Novo"},
    {"nome": "Filemom", "abbrev_pt": "fm", "testamento": "Novo"},
    {"nome": "Hebreus", "abbrev_pt": "hb", "testamento": "Novo"},
    {"nome": "Tiago", "abbrev_pt": "tg", "testamento": "Novo"},
    {"nome": "1 Pedro", "abbrev_pt": "1pe", "testamento": "Novo"},
    {"nome": "2 Pedro", "abbrev_pt": "2pe", "testamento": "Novo"},
    {"nome": "1 João", "abbrev_pt": "1jo", "testamento": "Novo"},
    {"nome": "2 João", "abbrev_pt": "2jo", "testamento": "Novo"},
    {"nome": "3 João", "abbrev_pt": "3jo", "testamento": "Novo"},
    {"nome": "Judas", "abbrev_pt": "jd", "testamento": "Novo"},
    {"nome": "Apocalipse", "abbrev_pt": "ap", "testamento": "Novo"}
]

# Tentar baixar do repositório thiagobodruk (muito confiável)
url_github = "https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/acf.json"

try:
    print(f"Tentando baixar de {url_github}...")
    response = requests.get(url_github, timeout=60)
    response.raise_for_status()
    biblia_raw = response.json()
    print(f"✓ Download bem-sucedido! ({len(biblia_raw)} livros encontrados)\n")
    
    # Processar o JSON baixado
    biblia_estruturada = {"livros": []}
    
    for livro_info in livros_info:
        # Procurar o livro no JSON baixado
        livro_data = None
        for livro_raw in biblia_raw:
            abbrev_raw = livro_raw.get("abbrev", {}).get("pt", "").lower()
            if abbrev_raw == livro_info["abbrev_pt"].lower():
                livro_data = livro_raw
                break
        
        if not livro_data:
            print(f"⚠ Livro {livro_info['nome']} ({livro_info['abbrev_pt']}) não encontrado, pulando...")
            continue
        
        # Estruturar os capítulos e versículos
        capitulos_estruturados = []
        capitulos_raw = livro_data.get("chapters", [])
        
        for idx_cap, cap_versiculos in enumerate(capitulos_raw):
            numero_cap = idx_cap + 1
            versiculos_estruturados = []
            
            for idx_vers, texto_vers in enumerate(cap_versiculos):
                versiculos_estruturados.append({
                    "numero": idx_vers + 1,
                    "texto": texto_vers
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
        
        total_vers = sum(len(c["versiculos"]) for c in capitulos_estruturados)
        print(f"✓ {livro_info['nome']}: {len(capitulos_estruturados)} capítulos, {total_vers} versículos")
    
    # Salvar JSON principal
    with open("biblia_almeida_completa.json", "w", encoding="utf-8") as f:
        json.dump(biblia_estruturada, f, ensure_ascii=False, indent=2)
    print(f"\n✅ Bíblia completa salva em biblia_almeida_completa.json ({len(biblia_estruturada['livros'])} livros)")
    
    # Criar lista de livros com informações básicas
    livros_resumo = []
    for idx, livro in enumerate(biblia_estruturada["livros"]):
        total_versiculos = sum(len(cap["versiculos"]) for cap in livro["capitulos"])
        livros_resumo.append({
            "nome": livro["nome"],
            "testamento": livro["testamento"],
            "ordem": idx + 1,
            "n_capitulos": len(livro["capitulos"]),
            "n_versiculos": total_versiculos
        })
    
    with open("livros_info.json", "w", encoding="utf-8") as f:
        json.dump({"livros": livros_resumo}, f, ensure_ascii=False, indent=2)
    print(f"✅ Lista de livros salva em livros_info.json\n")
    
    # Estatísticas finais
    total_caps = sum(l["n_capitulos"] for l in livros_resumo)
    total_vers = sum(l["n_versiculos"] for l in livros_resumo)
    print(f"📊 Estatísticas finais:")
    print(f"  • {len(livros_resumo)} livros")
    print(f"  • {total_caps} capítulos")
    print(f"  • {total_vers} versículos")
    print(f"\n✅ Processo concluído com sucesso!")
    
except Exception as e:
    print(f"✗ Erro: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

