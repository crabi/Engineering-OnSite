PG_USER=postgres
PGPASSWORD=postgres
PG_DATABASE=onsite

docker container stop onsite-db
docker container rm onsite-db

docker run \
    --name onsite-db \
    -e POSTGRES_USER=$PG_USER \
    -e POSTGRES_PASSWORD=$PGPASSWORD \
    -e POSTGRES_DB=$PG_DATABASE \
    -p 5432:5432 \
    -d \
    -v $(pwd)/schema:/docker-entrypoint-initdb.d/ \
    library/postgres
