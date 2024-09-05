#!/bin/bash

export $(grep -v '^#' .env.${1} | xargs)

HOST=$FTP_HOST
PORT=$FTP_PORT
USER=$FTP_USER
PASSWORD=$FTP_PASSWORD
REMOTE_DIR=$FTP_REMOTE_DIR

LOCAL_DIR='dist'

lftp -f "
open ftp://$USER:$PASSWORD@$HOST:$PORT
mirror --reverse --delete --verbose $LOCAL_DIR $REMOTE_DIR
bye
"
echo "Deployment completed successfully."

