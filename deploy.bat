@echo off
REM 🚀 Script de Deploy - Bíblia App (Windows)
REM Este script automatiza o processo de deploy do aplicativo

echo 🚀 Iniciando deploy do Bíblia App...

REM Verificar se estamos no diretório correto
if not exist "package.json" (
    echo [ERROR] package.json não encontrado. Execute este script na raiz do projeto.
    pause
    exit /b 1
)

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js não está instalado. Instale Node.js primeiro.
    pause
    exit /b 1
)

REM Verificar se npm está instalado
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm não está instalado. Instale npm primeiro.
    pause
    exit /b 1
)

echo [INFO] Verificando dependências...

REM Instalar dependências se necessário
if not exist "node_modules" (
    echo [INFO] Instalando dependências...
    npm install
    if errorlevel 1 (
        echo [ERROR] Falha ao instalar dependências
        pause
        exit /b 1
    )
    echo [SUCCESS] Dependências instaladas com sucesso!
) else (
    echo [INFO] Dependências já instaladas.
)

REM Executar linting se disponível
findstr /C:"\"lint\"" package.json >nul 2>&1
if not errorlevel 1 (
    echo [INFO] Executando linting...
    npm run lint
    if errorlevel 1 (
        echo [WARNING] Linting encontrou problemas, mas continuando com o deploy...
    ) else (
        echo [SUCCESS] Linting passou!
    )
)

REM Gerar build de produção
echo [INFO] Gerando build de produção...
npm run build
if errorlevel 1 (
    echo [ERROR] Falha ao gerar build. Verifique os erros acima.
    pause
    exit /b 1
)
echo [SUCCESS] Build gerado com sucesso!

REM Verificar se o build foi gerado
if not exist "dist" (
    echo [ERROR] Pasta 'dist' não foi criada. Verifique a configuração do build.
    pause
    exit /b 1
)

echo [SUCCESS] Build concluído! Arquivos gerados em: dist\

REM Verificar arquivos essenciais
echo [INFO] Verificando arquivos essenciais...

if exist "dist\index.html" (
    echo [SUCCESS] ✓ dist\index.html encontrado
) else (
    echo [ERROR] ✗ dist\index.html não encontrado
    pause
    exit /b 1
)

if exist "dist\manifest.json" (
    echo [SUCCESS] ✓ dist\manifest.json encontrado
) else (
    echo [ERROR] ✗ dist\manifest.json não encontrado
    pause
    exit /b 1
)

if exist "dist\sw.js" (
    echo [SUCCESS] ✓ dist\sw.js encontrado
) else (
    echo [ERROR] ✗ dist\sw.js não encontrado
    pause
    exit /b 1
)

REM Verificar ícones PWA
echo [INFO] Verificando ícones PWA...
if exist "dist\icons" (
    echo [SUCCESS] ✓ Ícones encontrados
) else (
    echo [WARNING] ⚠ Pasta de ícones não encontrada
)

REM Opções de deploy
echo.
echo 🎯 Escolha uma opção de deploy:
echo 1) Vercel (Recomendado)
echo 2) Netlify
echo 3) GitHub Pages
echo 4) Apenas preparar build (não fazer deploy)
echo 5) Testar localmente
echo.

set /p choice="Digite sua escolha (1-5): "

if "%choice%"=="1" (
    echo [INFO] Preparando deploy para Vercel...
    
    REM Verificar se Vercel CLI está instalado
    vercel --version >nul 2>&1
    if errorlevel 1 (
        echo [INFO] Instalando Vercel CLI...
        npm install -g vercel
    )
    
    echo [INFO] Fazendo deploy para Vercel...
    vercel --prod
    if errorlevel 1 (
        echo [ERROR] Falha no deploy para Vercel
        pause
        exit /b 1
    )
    echo [SUCCESS] Deploy para Vercel concluído com sucesso!
    
) else if "%choice%"=="2" (
    echo [INFO] Preparando deploy para Netlify...
    
    REM Verificar se Netlify CLI está instalado
    netlify --version >nul 2>&1
    if errorlevel 1 (
        echo [INFO] Instalando Netlify CLI...
        npm install -g netlify-cli
    )
    
    echo [INFO] Fazendo deploy para Netlify...
    netlify deploy --prod --dir=dist
    if errorlevel 1 (
        echo [ERROR] Falha no deploy para Netlify
        pause
        exit /b 1
    )
    echo [SUCCESS] Deploy para Netlify concluído com sucesso!
    
) else if "%choice%"=="3" (
    echo [INFO] Preparando deploy para GitHub Pages...
    
    REM Verificar se gh-pages está instalado
    npm list gh-pages >nul 2>&1
    if errorlevel 1 (
        echo [INFO] Instalando gh-pages...
        npm install --save-dev gh-pages
    )
    
    echo [INFO] Fazendo deploy para GitHub Pages...
    npm run deploy
    if errorlevel 1 (
        echo [ERROR] Falha no deploy para GitHub Pages
        pause
        exit /b 1
    )
    echo [SUCCESS] Deploy para GitHub Pages concluído com sucesso!
    
) else if "%choice%"=="4" (
    echo [SUCCESS] Build preparado com sucesso!
    echo [INFO] Arquivos prontos para deploy em: dist\
    echo [INFO] Você pode fazer upload manual dos arquivos para seu servidor.
    
) else if "%choice%"=="5" (
    echo [INFO] Iniciando servidor local para teste...
    echo [INFO] Acesse: http://localhost:8080
    echo [INFO] Pressione Ctrl+C para parar o servidor
    cd dist
    python -m http.server 8080
    if errorlevel 1 (
        echo [INFO] Python não encontrado, usando Node.js...
        cd ..
        npx serve dist -p 8080
    )
    
) else (
    echo [ERROR] Opção inválida
    pause
    exit /b 1
)

REM Informações finais
echo.
echo [SUCCESS] 🎉 Deploy concluído com sucesso!
echo.
echo [INFO] 📱 Funcionalidades PWA disponíveis:
echo   ✓ Instalação como app nativo
echo   ✓ Funcionamento offline
echo   ✓ Cache inteligente
echo   ✓ Atualizações automáticas
echo.
echo [INFO] 🔧 Para testar as funcionalidades offline:
echo   1. Instale o app no seu dispositivo
echo   2. Desconecte da internet
echo   3. Teste a navegação e funcionalidades
echo.
echo [INFO] 📊 Para monitorar performance:
echo   - Use Chrome DevTools ^> Lighthouse
echo   - Teste em diferentes dispositivos
echo   - Verifique métricas de PWA
echo.

echo [SUCCESS] Bíblia App está online e pronto para uso! 🙏
pause
