import subprocess
def insert_records_to_mysql():
    with open("data.sql", "r") as sql_queries:
        queries = ['mysql',  '--user=root',  '--password=Password@123',  '--database=mutual_fund',
                   '-e',  '\"{}commit;\"']
        count = 0
        for query in sql_queries:
            try:
                queries[-1] = queries[-1].format(query[:-1])
                command = ' '.join(queries)
                subprocess.call(command, shell=True)
                queries[-1] = '\"{}commit;\"'
                print(command)
            except Exception as e:
                print(e)
            count += 1
        print(count, "finish")
        
insert_records_to_mysql()
