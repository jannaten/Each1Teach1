#!/bin/sh

DB_CONTAINER=koulutushaku_db_1
BACKUP_DIR=./backups
ROTATES="2"

#Rotates
mkdir -p $BACKUP_DIR
mkdir -p $BACKUP_DIR/$ROTATES
rm -f $BACKUP_DIR/$ROTATES/*
rmdir $BACKUP_DIR/$ROTATES/

for ((r=$ROTATES;r > 0; r--)) {
	mkdir -p $BACKUP_DIR/$(($r-1))
	mv -f $BACKUP_DIR/$(($r-1)) $BACKUP_DIR/$r
}

DUMP_DIR=$BACKUP_DIR/0
mkdir -p $DUMP_DIR

if [ "$(docker inspect $DB_CONTAINER > /dev/null 2>&1; echo $?)" == "1" ]
then
	echo -e "\n$DB_CONTAINER -container not found.\n\n"
	exit
fi

#Backup
databases=$(docker exec -i $DB_CONTAINER sh -c 'exec mongo --authenticationDatabase admin -u "$MONGO_INITDB_USERNAME" -p "$MONGO_INITDB_PASSWORD" --quiet --eval "db.getMongo().getDBNames().forEach(function(db) {print(db)})" | grep -Ev "(admin|config|local)"')
for db in $databases
do
	echo "$db"
	docker exec -i $DB_CONTAINER sh -c 'exec mongodump --db '$db' --authenticationDatabase admin -u "$MONGO_INITDB_USERNAME" -p "$MONGO_INITDB_PASSWORD" --archive' > $DUMP_DIR/"$db"_$(date +%F).archive
done

exit

#Restore
#docker exec -i koulutushaku_db_1 sh -c 'exec mongorestore --db koulutushaku --drop --archive --authenticationDatabase admin -u "$MONGO_INITDB_USERNAME" -p "$MONGO_INITDB_PASSWORD"' < ./backups/0/koulutushaku_2021-10-11.archive
