set -e  # 🛑 გაჩერდება თუ რაიმე არასწორია

echo "📦 პროექტის ადარატატატტტტტვირთვა სერვერზე..."
scp -r ./server luk@45.66.11.41:/tmp/server-temp

echo "🔐 .env ფაილის ატვირთვა..."
scp ./server/.env luk@45.66.11.41:/tmp/server-temp/.env

echo "🔁 სერვერზე ფაილების გადატანა და გაშვება..."
ssh -tt luk@45.66.11.41 << 'ENDSSH'
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  nvm use 20

  pm2 kill   # ჩაკეტეს ძველი pm2 daemon
  
  rm -rf /var/www/server
  mv /tmp/server-temp /var/www/server
  cd /var/www/server
  npm install  
  pm2 start index.js --name backend --interpreter $(which node) --update-env
  pm2 save
ENDSSH

echo "✅ Deploy დასრულდა!"

