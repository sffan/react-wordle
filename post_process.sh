# 生成西语和德语主页
sed -e "s/lang=\"en\"/lang=\"es\"/i" \
    -e "s/<title>.*<\/title>/<title>Palora – El mayor juego de Wordle en español<\/title>/i" \
    -e "s/<meta name=\"description\" content=\"[^\"]*\"\/>/<meta name=\"description\" content=\"Adivina palabra en 6 intentos \&crea tu propio rompecabezas con amigos. Un nuevo rompecabezas te espera cada día.\"\/>/i" \
    -e "s/<meta name=\"keywords\" content=\"[^\"]*\"\/>/<meta name=\"keywords\" content=\"wordle,unlimited,tildes,palabra\"\/>/i" \
    `pwd`/build/index.html > `pwd`/build/index_es.html
sed -e "s/lang=\"en\"/lang=\"de\"/i" \
    -e "s/<title>.*<\/title>/<title>Voortle – Das größte deutsche Wordle-Spiel<\/title>/i" \
    -e "s/<meta name=\"description\" content=\"[^\"]*\"\/>/<meta name=\"description\" content=\"Errate das versteckte Wort mit 6 Versuchen\& erstelle dein Rätsel für Freunde. Jeden Tag wartet ein neues Rätsel auf dich.\"\/>/i" \
    -e "s/<meta name=\"keywords\" content=\"[^\"]*\"\/>/<meta name=\"keywords\" content=\"Wordle,wördle,Wort,6mal5,wördl\"\/>/i" \
    `pwd`/build/index.html > `pwd`/build/index_de.html
# 替换alert到eval
sed -e "s/alert(\"needreplace2eval\"\+/eval(/i" \
    `ls \`pwd\`/build/static/js/main.*.js` > `ls \`pwd\`/build/static/js/main.*.js`.1
mv `ls \`pwd\`/build/static/js/main.*.js`.1 `ls \`pwd\`/build/static/js/main.*.js`