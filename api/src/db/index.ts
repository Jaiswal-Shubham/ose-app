import { Pool, QueryResult, QueryResultRow } from 'pg';
import config from '../config';

const pool = new Pool({
  connectionString: config.databaseUrl,
});

export default {
  query: <T extends QueryResultRow>(text: string, params?: any[]): Promise<QueryResult<T>> => 
    pool.query<T>(text, params),
};