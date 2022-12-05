/root/.nvm/versions/node/v17.0.0/bin/npm install
/root/.nvm/versions/node/v17.0.0/bin/npm run build
/usr/bin/pkill node
/root/.nvm/versions/node/v17.0.0/bin/node index.js > /home/kennyharrer/nodelog
if [ $? == 1 ]
then
	/usr/sbin/sendmail john@bartucz.com < /home/kennyharrer/nodeindexerror.txt
fi
