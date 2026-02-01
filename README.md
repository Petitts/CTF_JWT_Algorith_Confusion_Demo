# CTF_JWT_Algorith_Confusion_Demo

User credentials: user:password

Default port: 3000

Goal: reach admin panel

Key pair gen:

> openssl genrsa -out keys/private.pem 2048<br>openssl rsa -in keys/private.pem -pubout -out keys/public.pem

Launch: 

>docker-compose up --build

Suplementary materials: 

- https://medium.com/@chanpreetkaur2005/jwt-algorithm-confusion-attack-71278e2dce0e
- https://pentest.co.uk/insights/json-web-token-algorithm-confusion-attack/
- https://pentesterlab.com/blog/jwt-algorithm-confusion-code-review-lessons
