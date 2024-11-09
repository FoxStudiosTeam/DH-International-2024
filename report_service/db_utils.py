import sqlite3


def migrate(cursor: sqlite3.Cursor):
    cursor.execute(
        "create table if not exists reports(uid varchar(48) not null constraint reports_pk primary key, title varchar(48), create_date datetime);")
    cursor.execute(
        "create table if not exists report_data (uid varchar(48)  not null constraint report_data_pk primary key, data_upload datetime, file_path   varchar(1000), class_num   integer, confidence  float, report_uid  varchar(256) not null constraint report_data_reports_uid_fk references reports, file_name varchar(500), bbox varchar(200));")

def init_cursor(conn) -> sqlite3.Cursor:
    return conn.cursor()
