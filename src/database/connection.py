import psycopg2
import os
from dotenv import load_dotenv

# Cargar variables desde config/.env
load_dotenv(dotenv_path='config/.env')

def get_db_connection():
    try:
        conn = psycopg2.connect(
            host="localhost",
            database=os.getenv("POSTGRES_DB"),
            user=os.getenv("POSTGRES_USER"),
            password=os.getenv("POSTGRES_PASSWORD")
        )
        return conn
    except Exception as e:
        print(f"Error conectando a la base de datos: {e}")
        return None
