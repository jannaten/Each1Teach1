#!/bin/sh

echo '#### MONGO INIT START ####'

mongo -- admin <<EOF
db.createUser({
  user: '$MONGO_INITDB_USERNAME',
  pwd: '$MONGO_INITDB_PASSWORD',
  roles: [{
    role: 'readWriteAnyDatabase',
    db: 'admin'
  }]
});
EOF

echo '#### MONGO INITIALIZED ####'