#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import requests
import sys

print("Baixando Bíblia Almeida Revista e Corrigida do GitHub...")

# Lista dos 66 livros bíblicos na ordem canônica
livros_info = [
    # Antigo Testamento (39 livros)
    {"nome": "Gênesis", "abrev": ["gn", "genesis", "gen"], "testamento": "Antigo", "ordem": 1},
    {"nome": "Êxodo", "abrev": ["ex", "exodo", "exodus"], "testamento": "Antigo", "ordem": 2},
    {"nome": "Levítico", "abrev": ["lv", "levitico", "leviticus"], "testamento": "Antigo", "ordem": 3},
    {"nome": "Números", "abrev": ["nm", "numeros", "numbers"], "testamento": "Antigo", "ordem": 4},
    {"nome": "Deuteronômio", "abrev": ["dt", "deuteronomio", "deuteronomy"], "testamento": "Antigo", "ordem": 5},
    {"nome": "Josué", "abrev": ["js", "josue", "joshua"], "testamento": "Antigo", "ordem": 6},
    {"nome": "Juízes", "abrev": ["jz", "juizes", "judges"], "testamento": "Antigo", "ordem": 7},
    {"nome": "Rute", "abrev": ["rt", "rute", "ruth"], "testamento": "Antigo", "ordem": 8},
    {"nome": "1 Samuel", "abrev": ["1sm", "1samuel"], "testamento": "Antigo", "ordem": 9},
    {"nome": "2 Samuel", "abrev": ["2sm", "2samuel"], "testamento": "Antigo", "ordem": 10},
    {"nome": "1 Reis", "abrev": ["1rs", "1reis", "1kings"], "testamento": "Antigo", "ordem": 11},
    {"nome": "2 Reis", "abrev": ["2rs", "2reis", "2kings"], "testamento": "Antigo", "ordem": 12},
    {"nome": "1 Crônicas", "abrev": ["1cr", "1cronicas", "1chronicles"], "testamento": "Antigo", "ordem": 13},
    {"nome": "2 Crônicas", "abrev": ["2cr", "2cronicas", "2chronicles"], "testamento": "Antigo", "ordem": 14},
    {"nome": "Esdras", "abrev": ["ed", "esdras", "ezra"], "testamento": "Antigo", "ordem": 15},
    {"nome": "Neemias", "abrev": ["ne", "neemias", "nehemiah"], "testamento": "Antigo", "ordem": 16},
    {"nome": "Ester", "abrev": ["et", "ester", "esther"], "testamento": "Antigo", "ordem": 17},
    {"nome": "Jó", "abrev": ["job", "jo", "jó"], "testamento": "Antigo", "ordem": 18},
    {"nome": "Salmos", "abrev": ["sl", "salmos", "psalms"], "testamento": "Antigo", "ordem": 19},
    {"nome": "Provérbios", "abrev": ["pv", "proverbios", "proverbs"], "testamento": "Antigo", "ordem": 20},
    {"nome": "Eclesiastes", "abrev": ["ec", "eclesiastes", "ecclesiastes"], "testamento": "Antigo", "ordem": 21},
    {"nome": "Cânticos", "abrev": ["ct", "canticos", "song"], "testamento": "Antigo", "ordem": 22},
    {"nome": "Isaías", "abrev": ["is", "isaias", "isaiah"], "testamento": "Antigo", "ordem": 23},
    {"nome": "Jeremias", "abrev": ["jr", "jeremias", "jeremiah"], "testamento": "Antigo", "ordem": 24},
    {"nome": "Lamentações", "abrev": ["lm", "lamentacoes", "lamentations"], "testamento": "Antigo", "ordem": 25},
    {"nome": "Ezequiel", "abrev": ["ez", "ezequiel", "ezekiel"], "testamento": "Antigo", "ordem": 26},
    {"nome": "Daniel", "abrev": ["dn", "daniel"], "testamento": "Antigo", "ordem": 27},
    {"nome": "Oséias", "abrev": ["os", "oseias", "hosea"], "testamento": "Antigo", "ordem": 28},
    {"nome": "Joel", "abrev": ["jl", "joel"], "testamento": "Antigo", "ordem": 29},
    {"nome": "Amós", "abrev": ["am", "amos"], "testamento": "Antigo", "ordem": 30},
    {"nome": "Obadias", "abrev": ["ob", "obadias", "obadiah"], "testamento": "Antigo", "ordem": 31},
    {"nome": "Jonas", "abrev": ["jn", "jonas", "jonah"], "testamento": "Antigo", "ordem": 32},
    {"nome": "Miquéias", "abrev": ["mq", "miqueias", "micah"], "testamento": "Antigo", "ordem": 33},
    {"nome": "Naum", "abrev": ["na", "naum", "nahum"], "testamento": "Antigo", "ordem": 34},
    {"nome": "Habacuque", "abrev": ["hc", "habacuque", "habakkuk"], "testamento": "Antigo", "ordem": 35},
    {"nome": "Sofonias", "abrev": ["sf", "sofonias", "zephaniah"], "testamento": "Antigo", "ordem": 36},
    {"nome": "Ageu", "abrev": ["ag", "ageu", "haggai"], "testamento": "Antigo", "ordem": 37},
    {"nome": "Zacarias", "abrev": ["zc", "zacarias", "zechariah"], "testamento": "Antigo", "ordem": 38},
    {"nome": "Malaquias", "abrev": ["ml", "malaquias", "malachi"], "testamento": "Antigo", "ordem": 39},
    # Novo Testamento (27 livros)
    {"nome": "Mateus", "abrev": ["mt", "mateus", "matthew"], "testamento": "Novo", "ordem": 40},
    {"nome": "Marcos", "abrev": ["mc", "marcos", "mark"], "testamento": "Novo", "ordem": 41},
    {"nome": "Lucas", "abrev": ["lc", "lucas", "luke"], "testamento": "Novo", "ordem": 42},
    {"nome": "João", "abrev": ["jo", "joao", "john"], "testamento": "Novo", "ordem": 43},
    {"nome": "Atos", "abrev": ["at", "atos", "acts"], "testamento": "Novo", "ordem": 44},
    {"nome": "Romanos", "abrev": ["rm", "romanos", "romans"], "testamento": "Novo", "ordem": 45},
    {"nome": "1 Coríntios", "abrev": ["1co", "1corintios", "1corinthians"], "testamento": "Novo", "ordem": 46},
    {"nome": "2 Coríntios", "abrev": ["2co", "2corintios", "2corinthians"], "testamento": "Novo", "ordem": 47},
    {"nome": "Gálatas", "abrev": ["gl", "galatas", "galatians"], "testamento": "Novo", "ordem": 48},
    {"nome": "Efésios", "abrev": ["ef", "efesios", "ephesians"], "testamento": "Novo", "ordem": 49},
    {"nome": "Filipenses", "abrev": ["fp", "filipenses", "philippians"], "testamento": "Novo", "ordem": 50},
    {"nome": "Colossenses", "abrev": ["cl", "colossenses", "colossians"], "testamento": "Novo", "ordem": 51},
    {"nome": "1 Tessalonicenses", "abrev": ["1ts", "1tessalonicenses", "1thessalonians"], "testamento": "Novo", "ordem": 52},
    {"nome": "2 Tessalonicenses", "abrev": ["2ts", "2tessalonicenses", "2thessalonians"], "testamento": "Novo", "ordem": 53},
    {"nome": "1 Timóteo", "abrev": ["1tm", "1timoteo", "1timothy"], "testamento": "Novo", "ordem": 54},
    {"nome": "2 Timóteo", "abrev": ["2tm", "2timoteo", "2timothy"], "testamento": "Novo", "ordem": 55},
    {"nome": "Tito", "abrev": ["tt", "tito", "titus"], "testamento": "Novo", "ordem": 56},
    {"nome": "Filemom", "abrev": ["fm", "filemom", "philemon"], "testamento": "Novo", "ordem": 57},
    {"nome": "Hebreus", "abrev": ["hb", "hebreus", "hebrews"], "testamento": "Novo", "ordem": 58},
    {"nome": "Tiago", "abrev": ["tg", "tiago", "james"], "testamento": "Novo", "ordem": 59},
    {"nome": "1 Pedro", "abrev": ["1pe", "1pedro", "1peter"], "testamento": "Novo", "ordem": 60},
    {"nome": "2 Pedro", "abrev": ["2pe", "2pedro", "2peter"], "testamento": "Novo", "ordem": 61},
    {"nome": "1 João", "abrev": ["1jo", "1joao", "1john"], "testamento": "Novo", "ordem": 62},
    {"nome": "2 João", "abrev": ["2jo", "2joao", "2john"], "testamento": "Novo", "ordem": 63},
    {"nome": "3 João", "abrev": ["3jo", "3joao", "3john"], "testamento": "Novo", "ordem": 64},
    {"nome": "Judas", "abrev": ["jd", "judas", "jude"], "testamento": "Novo", "ordem": 65},
    {"nome": "Apocalipse", "abrev": ["ap", "apocalipse", "revelation"], "testamento": "Novo", "ordem": 66}
]

# Tentar baixar do repositório DanielLiberato
url_github = "https://raw.githubusercontent.com/DanielLiberato/Biblia-Sagrada-Json-JFA/master/bible.json"

try:
    print(f"Tentando baixar de {url_github}...")
    response = requests.get(url_github, timeout=30)
    response.raise_for_status()
    biblia_raw = response.json()
    print("✓ Download bem-sucedido!\n")
    
    # Processar o JSON baixado
    biblia_estruturada = {"livros": []}
    
    for livro_info in livros_info:
        # Procurar o livro no JSON baixado (aceita várias abreviações)
        livro_data = None
        for livro_raw in biblia_raw:
            nome_raw = livro_raw.get("name", "").lower().strip()
            abbrev_raw = livro_raw.get("abbrev", "").lower().strip()
            
            # Verificar se alguma abreviação coincide
            for abrev in livro_info["abrev"]:
                if abrev.lower() in [nome_raw, abbrev_raw] or nome_raw == livro_info["nome"].lower():
                    livro_data = livro_raw
                    break
            
            if livro_data:
                break
        
        if not livro_data:
            print(f"⚠ Livro {livro_info['nome']} não encontrado, pulando...")
            continue
        
        # Estruturar os capítulos e versículos
        capitulos_estruturados = []
        for cap_data in livro_data.get("chapters", []):
            numero_cap = cap_data.get("number", 0)
            versiculos_estruturados = []
            
            for vers_data in cap_data.get("verses", []):
                versiculos_estruturados.append({
                    "numero": vers_data.get("number", 0),
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
        
        total_vers = sum(len(c["versiculos"]) for c in capitulos_estruturados)
        print(f"✓ {livro_info['nome']}: {len(capitulos_estruturados)} capítulos, {total_vers} versículos")
    
    # Salvar JSON principal
    with open("biblia_almeida_completa.json", "w", encoding="utf-8") as f:
        json.dump(biblia_estruturada, f, ensure_ascii=False, indent=2)
    print(f"\n✅ Bíblia completa salva em biblia_almeida_completa.json ({len(biblia_estruturada['livros'])} livros)")
    
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

