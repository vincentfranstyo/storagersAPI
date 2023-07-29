#!/bin/bash

until nc -z -v -w30 mysql 3310
do
  echo "Waiting for database connection..."
  # wait for 5 seconds before check again
  sleep 5
done

echo "Database is up and running, you can proceed now!"
