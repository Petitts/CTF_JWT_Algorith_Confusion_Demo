# Wybieramy stabilną wersję Node.js
FROM node:18-slim

# Tworzymy katalog roboczy wewnątrz kontenera
WORKDIR /usr/src/app

# Kopiujemy pliki definicji paczek
COPY package*.json ./

# Instalujemy zależności (w tym naszą specyficzną wersję jsonwebtoken)
RUN npm install

# Kopiujemy resztę plików aplikacji (app.js, klucze, folder public)
COPY . .

# Aplikacja działa na porcie 3000
EXPOSE 3000

# Komenda startowa
CMD [ "node", "app.js" ]
