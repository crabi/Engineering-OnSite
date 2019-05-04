# Source Postgres server config
HOST="35.193.154.252"
KEYS_DIR="../../../keys"
USERNAME="postgres"
PASSWORD=""
DATABASE="onsite"
SSLMODE="verify-ca"

# Dump schema
echo "Dumping schema"
PGSSLMODE=$SSLMODE \
PGSSLCERT="${KEYS_DIR}/client-cert.pem" \
PGSSLKEY="${KEYS_DIR}/client-key.pem" \
PGSSLROOTCERT="${KEYS_DIR}/server-ca.pem" \
PGPASSWORD=$PASSWORD \
pg_dump \
    --schema-only \
    --username=$USERNAME \
    --host=$HOST \
    --dbname=$DATABASE \
    --role=postgres \
    --file=./schema/tables.sql

# Dump static data
echo "Dumping static data"
PGSSLMODE=$SSLMODE \
PGSSLCERT="${KEYS_DIR}/client-cert.pem" \
PGSSLKEY="${KEYS_DIR}/client-key.pem" \
PGSSLROOTCERT="${KEYS_DIR}/server-ca.pem" \
PGPASSWORD=$PASSWORD \
pg_dump \
    --data-only \
    --username=$USERNAME \
    --host=$HOST \
    --dbname=$DATABASE \
     --role=postgres \
    --file=./schema/xdata.sql
