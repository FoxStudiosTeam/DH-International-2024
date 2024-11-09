import sqlite3


def migrate(cursor : sqlite3.Cursor):
    res = cursor.execute("create table if not exists reports(uid varchar(48) not null constraint reports_pk primary key, title varchar(48), create_date datetime);")
